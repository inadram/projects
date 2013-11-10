var brandId;
var brandTitle;

var lib = {
	isSubscribe: function (value, object) {
		var status=false;
		for (var prop in object) {
			if (object.hasOwnProperty(prop)) {
				if (object[ prop ] === value)
					status= true;
			}
		}
		return status;
	}
};

var background = {

	_isValid: function(url){
		return background._isValidUrl(url)
	},

	_isValidUrl: function (url) {
		return  (url.indexOf('http://www.bbc.co.uk/iplayer/episode') > -1);
	},


	requestFeed: function (tabId, changeInfo, tab) {
		if (background._isValid(tab.url)) {
			var url = background._getIONFeedUrl(tab);
			background._loadProgrammeFeed(url);
		}
	},

	_getIONFeedUrl: function (tab) {
		var episodeId = tab.url.replace(/.*episode\/([^\/]*)\/.*/, "$1");
		return "http://www.bbc.co.uk/iplayer/ion/episodedetail/episode/" + episodeId;
	},

	_loadProgrammeFeed: function (url) {
		var requestedXML = new XMLHttpRequest();
		requestedXML.addEventListener("loadend", background._setBrandDetails, false);
		requestedXML.open("GET", url, true);
		requestedXML.setRequestHeader("Accept", "application/xml");
		requestedXML.send(null);
	},

	_setBrandDetails: function (xml) {
		brandId = background._getElementText(xml, 'brand_id', 'series_id');
		brandTitle = background._getElementText(xml, 'brand_title', 'series_title');
	},

	_getElementText: function (XML, id, backupId) {
		var responseXML = XML.target.responseXML;
		return  responseXML.querySelector(id).textContent || responseXML.querySelector(backupId).textContent;
	}
};

subscribe = {

	handleSubscribe: function (request, sender, sendResponse) {
		(subscribe._isValid(request)) ? subscribe._onSuccess(sendResponse) : subscribe._onFailure(sendResponse);
	},

	_isValid: function (request) {
		return  this._isValidRequest(request) || this._isAlreadySubscribed(request);
	},

	_isAlreadySubscribed: function (request) {
		return request.message == "isSubscribedToCurrentProgramme" && lib.isSubscribe(brandTitle, localStorage);
	},

	_isValidRequest: function (request) {
		return request.message == "subscribeToCurrentProgramme";
	},

	_onSuccess: function (sendResponse) {
		localStorage.setItem(brandId, brandTitle);
		sendResponse({status: "success"});
	},

	_onFailure: function (sendResponse) {
		sendResponse({status: "unSuccess"});
	}
};

chrome.tabs.onUpdated.addListener(background.requestFeed);

chrome.runtime.onMessage.addListener(subscribe.handleSubscribe);