var load = {

	js: function (src) {
		var script = document.createElement('script');
		script.src = chrome.extension.getURL(src);
		script.onload = function () {
			this.parentNode.removeChild(this);
		};
		(document.head || document.documentElement).appendChild(script);
	},

	css: function (href) {
		var css = document.createElement('link');
		css.rel = "stylesheet";
		css.href = chrome.extension.getURL(href);
		(document.head || document.documentElement).appendChild(css);
	}
};

var subscription = {

	handleSubscribe: function (event) {
		if (subscription._isValid(event)) {
			subscription._subscribe(event);
			subscription._isSubscribed(event);
		}
	},

	_isValid: function (event) {
		return (event.data.type && (event.data.type == "iplayer") && event.source == window);
	},

	_subscribe: function (event) {
		if (event.data.text == 'subscribe') {
			chrome.runtime.sendMessage({message: "subscribeToCurrentProgramme"}, this._response);
		}
	},

	_isSubscribed: function (event) {
		if (event.data.text == 'isSubscribed') {
			chrome.runtime.sendMessage({message: "isSubscribedToCurrentProgramme"}, this._response);
		}
	},

	_response: function (evt) {
		if (evt.status == 'success') {
			document.getElementById('subscribeLi').setAttribute('class', 'subscribed');
			document.getElementById('subscribeText').textContent = 'subscribed';
		}
	}
};

var inject = {

	dom: function () {
		if (inject.isReady()) {
			clearInterval(readyStateCheckInterval);
			inject._files();
			inject._attacheListeners();
		}
	},

	_files: function () {
		load.js("src/inject/bbc.js");
		load.css("src/inject/bbc.css");
	},

	_attacheListeners: function () {
		window.addEventListener("message", subscription.handleSubscribe, false);
	},

	isReady: function () {
		return (document.readyState === "complete");
	}
};
var readyStateCheckInterval = setInterval(inject.dom, 1000);




