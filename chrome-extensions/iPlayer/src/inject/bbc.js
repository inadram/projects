var element = {

	createSubscribe: function () {
		var tools = this._loadToolsDiv();
		var li = this._createSubscribeLi('subscribe', 'subscribeLi');
		this._createSubscribeSpan(li, 'subscribeText');
		tools.appendChild(li);
	},

	_loadToolsDiv: function () {
		return document.getElementsByClassName("tools")[0];
	},

	_createSubscribeLi: function (className, id) {
		var li = document.getElementsByClassName("link-to-this")[0].cloneNode(true);
		li.setAttribute('class', className);
		li.setAttribute('class', 'display-none');
		li.setAttribute('id', id);
		return li;
	},

	_createSubscribeSpan: function (element, id) {
		var span = element.getElementsByTagName('span')[0];
		span.setAttribute('id', id);
		return span;
	},

	updateSubscribeText: function (text) {
		this._getSubscribeSpanTextElement().textContent = text;
	},

	_getSubscribeSpanTextElement: function () {
		return document.getElementById('subscribeText');
	}
};

var bbc = {
	subscribe: function () {
		element.createSubscribe();
		element.updateSubscribeText('subscribe');
		this._attacheListener();
		this._isSubscribed();
	},

	_attacheListener: function () {
		document.getElementById("subscribeLi").addEventListener("click", this._onSubscribeClick, false);
	},

	_onSubscribeClick: function () {
		window.postMessage({ type: "iplayer", text: "subscribe" }, "*");
	},

	_isSubscribed: function(){
		window.postMessage({ type: "iplayer", text: "isSubscribed" }, "*");
	}

};

bbc.subscribe();



