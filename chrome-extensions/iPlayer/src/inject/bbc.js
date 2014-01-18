var element = {

	createSubscribe: function () {
		try{
		var tools = this._loadToolsDiv();
		var li = this._createSubscribeLi('subscribe', 'subscribeLi');
		this._createSubscribeSpan(li, 'subscribeText');
		tools.appendChild(li);
		}
		catch (err){}
	},

	_loadToolsDiv: function () {
		return document.getElementsByClassName("tools")[0];
	},

	_createSubscribeLi: function (className, id) {
		var li;
		try {
			li = document.getElementsByClassName("link-to-this")[0].cloneNode(true);
			li.setAttribute('class', className);
			li.setAttribute('class', 'display-none');
			li.setAttribute('id', id);
		}
		catch(err) {}

		return li;
	},

	_createSubscribeSpan: function (element, id) {
		var span;
		try {
		span = element.getElementsByTagName('span')[0];
		span.setAttribute('id', id);
		}
		catch(err) {}
		return span;
	},

	updateSubscribeText: function (text) {
		try{
		this._getSubscribeSpanTextElement().textContent = text;
		}
		catch (err){}
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
		try{
		document.getElementById("subscribeLi").addEventListener("click", this._onSubscribeClick, false);
		}
		catch (err){}
	},

	_onSubscribeClick: function () {
		window.postMessage({ type: "iplayer", text: "subscribe" }, "*");
	},

	_isSubscribed: function () {
		window.postMessage({ type: "iplayer", text: "isSubscribed" }, "*");
	}

};

bbc.subscribe();



