// Required SDK features
var widgets = require('sdk/widget');
var data = require('sdk/self').data;
var pageMod = require('sdk/page-mod');
var { Hotkey } = require("sdk/hotkeys");

// global vars
var activeWorkers = []; // list of activeWorkers
var pluginEnabled = false;

// register Hotkey Strg+1
var showHotKey = Hotkey({
	combo: "accel-1",
	onPress: function() {
		console.log("Strg+1 pressed");
		activeWorkers.forEach(
			function (selector) {
				console.log("worker found");
				selector.port.emit("hotkeyPressed", "");
				console.log("emmitted");
			}
		);
	}
});

// Register Widget in Toolbar
exports.main = function() {

	var widget = widgets.Widget({
		id: 'toggle-switch',
		label: 'My Plugin',
		contentURL: data.url('widget/plugin-off.png'),
		contentScriptWhen: 'ready',
		contentScriptFile: data.url('widget/widget.js')
	});

	widget.port.on('left-click', function() {
		console.log('left click on widget');
		if (toggleActivation())
			widget.contentURL = data.url('widget/plugin-on.png');
		else
			widget.contentURL = data.url('widget/plugin-off.png');
	});
	
}

// Register PageMod Worker
var selector = pageMod.PageMod({
  include: ['*'],
  contentScriptWhen: 'ready',
  contentScriptFile: [data.url('jquery-1.11.1.js'),
                      data.url('selector.js')],
  onAttach: function(worker) {
    worker.postMessage(pluginEnabled);
    worker.port.on('show', function(data) {
		activeWorkers.push(worker);
    });
    worker.port.on('detach', function () {
		detachWorker(this, activeWorkers);
    });
    worker.on('pageshow', function() { 
		activeWorkers.push(worker);
	});
    worker.on('pagehide', function() { 
		detachWorker(this, activeWorkers);
	});
  }
});

// helper functions
function detachWorker(worker, workerArray) {
	var index = workerArray.indexOf(worker);
	if(index != -1) {
		workerArray.splice(index, 1);
	}
}

function activateactiveWorkers() {
	activeWorkers.forEach(
		function (selector) {
			selector.postMessage(pluginEnabled);
		}
	);
}

function toggleActivation() {
	pluginEnabled = !pluginEnabled;
	activateactiveWorkers();
	return pluginEnabled;
}
