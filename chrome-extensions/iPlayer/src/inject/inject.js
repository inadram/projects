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
			subscription._subscribe();
		}
	},

	_isValid: function (event) {
		return (event.data.type && (event.data.type == "iplayer") && event.source == window);
	},

	_subscribe: function () {
		chrome.runtime.sendMessage({message: "subscribeToCurrentProgramme"}, this._response);
	},

	_response: function (evt) {
		document.getElementById('subscribeLi').setAttribute('class', 'subscribed');
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

var readyStateCheckInterval = setInterval(inject.dom, 10);




