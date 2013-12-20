var brandId;
var brandTitle;
var episodesDetails;

var lib = {
	isSubscribed: function (value, object) {
		var status = false;
		for (var prop in object) {
			if (object.hasOwnProperty(prop)) {
				if (JSON.parse(object[ prop ]).title === value)
					status = true;
			}
		}
		return status;
	}
};

var background = {

	_isValidUrl: function (url) {
		return  (url.indexOf('http://www.bbc.co.uk/iplayer/episode') > -1);
	},


	requestFeed: function (tabId, changeInfo, tab) {
		if (background._isValidUrl(tab.url)) {
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
		requestedXML.open("GET", url, false);
		requestedXML.setRequestHeader("Accept", "application/xml");
		requestedXML.send();
	},

	_setBrandDetails: function (xml) {
		brandId = background._getElementText(xml, 'brand_id', 'series_id');
		brandTitle = background._getElementText(xml, 'brand_title', 'series_title');
		episodesDetails = background._getEpisodes(brandId);
	},

	_getEpisodes: function (brandId) {
		var iPlayerFeed = 'http://www.bbc.co.uk/iplayer/ion/container/brand/' + brandId + '/with_episodes/1/recipe/wii-listview/';
		var req = new XMLHttpRequest();
		req.open("GET", iPlayerFeed, false);
		req.setRequestHeader('Accept', 'application/xml');
		req.send();
		var episodes = req.responseXML.querySelectorAll('episode');
		var episodesDetails = [];
		for (var i = 0; i < episodes.length; i++) {
			var id = episodes[i].querySelector('id').textContent;
			var url = "http://www.bbc.co.uk/iplayer/episode/" + id;
			var title = episodes[i].querySelector('contextually_unique_title').textContent;
			episodesDetails.push({id: id, title: title, url: url});
		}
		return episodesDetails;
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
		return request.message == "isSubscribedToCurrentProgramme" && lib.isSubscribed(brandTitle, localStorage);
	},

	_isValidRequest: function (request) {
		return request.message == "subscribeToCurrentProgramme";
	},

	_onSuccess: function (sendResponse) {
		localStorage.setItem(brandId, JSON.stringify({title:brandTitle,episodes:episodesDetails}));
		sendResponse({status: "success"});
	},

	_onFailure: function (sendResponse) {
		sendResponse({status: "unSuccess"});
	}
};

notification = {
	show: function(brandTitle,episodes) {
		var status = notification.create(brandTitle,episodes);
		status.onclick = notification.click.bind(status,episodes);
		status.show();
	},
	click: function(episodes){
		window.open(episodes[0].url);
		this.close();
	},
	create:function(brandTitle,episodes){
		return window.webkitNotifications.createNotification('http://www.bbc.co.uk/iplayer/images/episode/'+episodes[0].id+'_196_110.jpg',brandTitle,episodes[0].title);
	}
};

update = {

	episodes: function(){
		for (var brandId in localStorage) {
			var brandDetail = JSON.parse(localStorage.getItem(brandId));
			var episodes = background._getEpisodes(brandId);
			if(update._isUpdated(brandDetail, episodes)) {
				localStorage.removeItem(brandId);
				localStorage.setItem(brandId, JSON.stringify({title:brandDetail.title,episodes:episodes}));
				notification.show(brandDetail.title,episodes);

				chrome.browserAction.getBadgeText({},function(number) {
					var numberOfUpdatedProgrammes= parseInt(number)|| 0;
					chrome.browserAction.setBadgeText({text: String(numberOfUpdatedProgrammes+1) });
				});

			}

		}
	},

	_isUpdated: function (brandDetail, episodes) {
		return JSON.stringify(brandDetail.episodes) === JSON.stringify(episodes);
	}
};

chrome.tabs.onUpdated.addListener(background.requestFeed);

chrome.runtime.onMessage.addListener(subscribe.handleSubscribe);

setInterval(update.episodes, 5000);