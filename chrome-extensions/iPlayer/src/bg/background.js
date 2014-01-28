var brandId;
var brandTitle;
var episodesDetails;

var lib = {
	isSubscribed: function (value, object) {
		var status = false;
		for (var prop in object) {
			if (object.hasOwnProperty(prop)) {
				if (JSON.parse(object[prop ]).title === value)
					status = true;
			}
		}
		return status;
	}
};

var request = {
	_isValidUrl: function (url) {
		return  (url.indexOf('http://www.bbc.co.uk/iplayer/episode') > -1);
	},


	feed: function (tabId, changeInfo, tab) {
		if (request._isValidUrl(tab.url)) {
			var IONProgrammeFeed = request._getProgrammeIONFeed(tab);
			var IONProgrammeXMLFeed = request._getRequestedFeedResponse(IONProgrammeFeed);
			brandDetail.set(IONProgrammeXMLFeed);
		}
	},

	_getProgrammeIONFeed: function (tab) {
		var episodeId = tab.url.replace(/.*episode\/([^\/]*)\/.*/, "$1");
		return "http://www.bbc.co.uk/iplayer/ion/episodedetail/episode/" + episodeId;
	},

	_getiPlayerEpisodesFeed: function (brandId) {
		return  'http://www.bbc.co.uk/iplayer/ion/container/brand/' + brandId + '/with_episodes/1/recipe/wii-listview/';
	},

	_getRequestedFeedResponse: function (url) {
		var requestedXML = new XMLHttpRequest();
		requestedXML.open("GET", url, false);
		requestedXML.setRequestHeader("Accept", "application/xml");
		requestedXML.send();
		return requestedXML.responseXML;
	}
};

var brandDetail = {
	set: function (XMLFeed) {
		brandId = brandDetail._getElementText(XMLFeed, 'brand_id', 'series_id');
		brandTitle = brandDetail._getElementText(XMLFeed, 'brand_title', 'series_title');
		episodesDetails = brandDetail._getEpisodesDetails(brandId);
	},

	_getEpisodesDetails: function (brandId) {
		var iPlayerEpisodesFeed = request._getiPlayerEpisodesFeed(brandId);
		var iPlayerEpisodesXMLFeed = request._getRequestedFeedResponse(iPlayerEpisodesFeed);
		var episodes = brandDetail._getAllElements(iPlayerEpisodesXMLFeed, 'episode');

		var episodesDetails = [];
		for (var i = 0; i < episodes.length; i++) {
			var id = brandDetail._getElementText(episodes[i], 'id');
			var url = "http://www.bbc.co.uk/iplayer/episode/" + id;
			var title = brandDetail._getElementText(episodes[i], 'contextually_unique_title');
			episodesDetails.push({id: id, title: title, url: url});
		}
		return episodesDetails;
	},

	_getElementText: function (XML, id, backupId) {
		var elementText;
		try {
			elementText = XML.querySelector(id).textContent || XML.querySelector(backupId).textContent;
		}
		catch (err) {
		}
		return elementText;
	},

	_getAllElements: function (XML, id) {
		var episodes = [];
		try {
			episodes = XML.querySelectorAll(id);
		} catch (err) {
		}
		return episodes;
	}
};

subscribe = {

	handleSubscribe: function (request, sender, sendResponse) {
		var status = 'invalidRequest';
		if (subscribe._isValidRequest()) {
			status = 'validRequest';
			status = subscribe._handleSubscribeRequest(request, status);
			status = subscribe._handleAlreadySubscribedRequest(request, status);
		}
		sendResponse({status: status});
	},

	_handleAlreadySubscribedRequest: function (request, status) {
		if (request.message === 'isSubscribed' && this._isAlreadySubscribed()) {
			status = 'subscribed';
		}
		return status;
	},

	_handleSubscribeRequest: function (request, status) {
		if (request.message === 'subscribe') {
			localStorage.setItem(brandId, JSON.stringify({title: brandTitle, episodes: episodesDetails}));
			status = 'subscribed';
		}
		return status;
	},

	_isAlreadySubscribed: function () {
		return lib.isSubscribed(brandTitle, localStorage);
	},

	_isValidRequest: function () {
		return brandId !== '' && brandTitle !== '';
	}
};

notification = {
	show: function (brandTitle, episodes) {
		var status = notification.create(brandTitle, episodes);
		status.onclick = notification.click.bind(status, episodes);
		status.show();
	},
	click: function (episodes) {
		window.open(episodes[0].url);
		notification.close();
	},
	create: function (brandTitle, episodes) {
		return window.webkitNotifications.createNotification('http://www.bbc.co.uk/iplayer/images/episode/' + episodes[0].id + '_196_110.jpg', brandTitle, episodes[0].title);
	}
};

update = {

	episodes: function () {
		for (var brandId in localStorage) {
			if (brandId.search(/store.settings/) < 0) {
				var brandDetails = JSON.parse(localStorage.getItem(brandId));
				var episodes = brandDetail._getEpisodesDetails(brandId);
				if (update._isUpdated(brandDetails, episodes)) {
					update._setUpdatedEpisodes(brandId, brandDetails, episodes);
					notification.show(brandDetails.title, episodes);
					update._setBadge();
				}
			}
		}
	},

	_setUpdatedEpisodes: function (brandId, brandDetail, episodes) {
		localStorage.removeItem(brandId);
		localStorage.setItem(brandId, JSON.stringify({title: brandDetail.title, episodes: episodes}));
	},

	_setBadge: function () {
		chrome.browserAction.getBadgeText({}, function (number) {
			var numberOfUpdatedProgrammes = parseInt(number) || 0;
			chrome.browserAction.setBadgeText({text: String(numberOfUpdatedProgrammes + 1) });
		});
	},

	_isUpdated: function (brandDetail, episodes) {
//		return JSON.stringify(brandDetail.episodes) !== JSON.stringify(episodes);
		return JSON.stringify(brandDetail.episodes) === JSON.stringify(episodes);
	}
};

try {
	chrome.tabs.onUpdated.addListener(request.feed);
	chrome.runtime.onMessage.addListener(subscribe.handleSubscribe);
	var checkUpdateInterval = localStorage.getItem('store.settings.iplayer_check_update') || 1;
	setInterval(update.episodes, checkUpdateInterval * 3600 * 1000);
//setInterval(update.episodes, checkUpdateInterval*1000);
}
catch (err) {
}


