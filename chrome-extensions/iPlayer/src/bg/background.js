var background = {
	_isValidUrl: function (tabId, changeInfo, tab) {
		return  (tab.url.indexOf('http://www.bbc.co.uk/iplayer/') > -1);
	},


	requestFeed: function (tabId, changeInfo, tab) {
		if (background._isValidUrl(tabId, changeInfo, tab)) {
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
		background._brandId = background._getElementText(xml, 'brand_id', 'series_id');
		background._brandTitle = background._getElementText(xml, 'brand_title', 'series_title');
	},

	getBrandDetails: function () {
		return {id: background._brandId, title: background._brandTitle};
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
		return  request.message == "subscribeToCurrentProgramme";
	},

	_onSuccess: function (sendResponse) {
		var brandDetails = background.getBrandDetails();
		localStorage.setItem(brandDetails.id, brandDetails.title);
		sendResponse({status: "success"});
	},

	_onFailure: function (sendResponse) {
		sendResponse({status: "unSuccess"});
	}
};

chrome.tabs.onUpdated.addListener(background.requestFeed);

chrome.runtime.onMessage.addListener(subscribe.handleSubscribe);