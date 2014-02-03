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

	getUrl: function(path){
		var url ='';
		try{
			url = chrome.extension.getURL(path);
		}
		catch (err){}
		return url
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
			chrome.runtime.sendMessage({message: "subscribe"}, this._response);
		}
	},

	_isSubscribed: function (event) {
		if (event.data.text == 'isSubscribed') {
			chrome.runtime.sendMessage({message: "isSubscribed"}, this._response);
		}
	},

	_response: function (evt) {
		subscription._handleInvalidRequest(evt);
		subscription._handleAlreadySubscribedRequest(evt);
	},

	_handleInvalidRequest: function (evt) {
		if (evt.status !== 'invalidRequest') {
			document.getElementById('subscribeLi').classList.remove('display-none');
		}
	},

	_handleAlreadySubscribedRequest: function (evt) {
		if (evt.status == 'subscribed') {
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




