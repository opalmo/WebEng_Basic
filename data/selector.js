// global vars
var selectedElement = null;
var originalBgColor = null;
var pluginEnabled = false;

// Port/Message Handling
self.on('message', function onMessage(enabled) {
	pluginEnabled = enabled;
	if (!pluginEnabled) {
		resetSelectedElement();
	}
});

self.port.on("hotkeyPressed", function(message) {
	console.log("hotkey pressed");
	if (selectedElement != null) {
		$(selectedElement).html("Placeholder");
	} else {
		console.log("No P-Tag Selected");
	}
})

// Mouse Events
$('*').mouseenter(function() {

	if (!pluginEnabled)
		return;

	resetSelectedElement();
		
	console.log("MouseEnter on = " + $(this).first().prop("tagName") + " Tag");
			
	if ($(this).first().prop("tagName").toUpperCase() == "P") {
		selectedElement = $(this).first();
	} else {
		console.log("use closest p tag");
		selectedElement = $(this).closest("p");
	}

	if (selectedElement == null)
		return;

	originalBgColor = $(selectedElement).css('background-color');
	$(selectedElement).css('background-color', 'yellow');
});

$('*').mouseout(function() {
	resetSelectedElement();
});

// helper functions
function resetSelectedElement() {
	if (selectedElement) {
		console.log("reset selected element");
		$(selectedElement).css('background-color', originalBgColor);
		selectedElement = null;
	}
}