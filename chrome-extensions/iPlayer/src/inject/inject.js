var load = {

	js: function (src) {
		try {
			var script = document.createElement('script');
			script.src = load.getUrl(src);
			script.onload = function () {
				this.parentNode.removeChild(this);
			};
			(document.head || document.documentElement).appendChild(script);
		}
		catch (err) {
		}
	},

	css: function (href) {
		try {
			var css = document.createElement('link');
			css.rel = "stylesheet";
			css.href = load.getUrl(href);
			(document.head || document.documentElement).appendChild(css);
		} catch (err) {
		}
	},

	getUrl: function (path) {
		var url = '';
		try {
			url = chrome.extension.getURL(path);
		}
		catch (err) {
		}
		return url
	}
};

var subscribeButton = {

	sendSubscriptionRequest: function (event) {
		if (subscribeButton._isValid(event)) {
			subscribeButton._sendRequest(event);
		}
	},

	_isValid: function (event) {
		return (event.data.type && (event.data.type == "iplayer") && event.source == window && (event.data.text == 'subscribe' || event.data.text == 'isSubscribed'));
	},

	_sendRequest: function (event) {
		subscribeButton.sendMessage(event.data.text);
	},

	sendMessage: function (message) {
		chrome.runtime.sendMessage({message: message}, this._handleResponse);
	},

	_handleResponse: function (evt) {
		try{
		if (evt.status !== 'invalidRequest') {
			document.getElementById('subscribeLi').classList.remove('display-none');
		}
		if (evt.status == 'subscribed') {
			document.getElementById('subscribeLi').setAttribute('class', 'subscribed');
			document.getElementById('subscribeText').textContent = 'subscribed';
			document.getElementById('subscribeText').disabled = true;
		}
		}
		catch(err){}
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
		window.addEventListener("message", subscribeButton.sendSubscriptionRequest, false);
	},

	isReady: function () {
		return (document.readyState === "complete");
	}
};
var readyStateCheckInterval = setInterval(inject.dom, 1000);




