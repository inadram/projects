var s = document.createElement('script');
s.src = chrome.extension.getURL("script.js");
s.onload = function () {
	this.parentNode.removeChild(this);
};
(document.head || document.documentElement).appendChild(s);

var port = chrome.runtime.connect();

window.addEventListener("message", function (event) {
	// We only accept messages from ourselves
	if (event.source != window)
		return;

	if (event.data.type && (event.data.type == "iplayer")) {
		chrome.runtime.sendMessage({message: "subscribeToCurrentProgramme"}, function () {
		});
		port.postMessage(event.data.text);
	}
}, false);




