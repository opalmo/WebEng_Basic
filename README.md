WebEng_Basic
============

Dieses Beispiel kann als Grundgerüst für die Implementierung der Praktikums-Aufgabe verwendet werden. Das Plugin wird über ein entsprechendes Toggle-Widget in der Toolbar aktiviert. Nach der Aktivierung werden Textbereiche, welche sich in einem p-Tag befinden, bei einer Mausberührung farblich hervorgehoben.  Mit der Tastenkombination Strg+1 wird der selektierte Textbereich durch einen beliebigen Text ersetzt.

Beschreibung
============
* Die main.js dient als Einstiegspunkt für das Plugin. Sie bindet die entsprechenden SDK Features sdk/widget, sdk/self, sdk/page-mod und sdk/hotkeys ein. Kern des Codes ist die Registrierung der Page-Mod Workers. Alle derzeit aktiven Worker werden in dem activeWorker Array verwaltet. Bei Drücken des Hotkeys werden die Worker über die Port-Message-Kommunikation benachrichtigt.

* Die selector.js enthält den eigentlichen Worker. Unter Verwendung von jQuery registriert sich der Worker auf mouseenter und mouseout Events. Erkennt der mouseenter-Event-Handler einen p-Tag, wird dieser farblich hervorgehoben und die Referenz auf das DOM-Objekt in der Variable selectedElement vorgehalten. Wird nun eine entsprechende hotkeyPressed Message an den Message-Port gesendet, wird der Inhalt dieses Elements durch „Placeholder“ ersetzt.

* Die widget.js enthält den Click-Event-Handler für das Toggle-Widget. Der Handler verwendet dabei die Port-Message-Kommunikation um die main.js über ein Click-Event zu benachrichtigen.

Hinweis
============
Das Projekt kann nach der Aktivierung (_\bin\activate_) mit _cfx run_ gestartet werden.
