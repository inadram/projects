function checkForValidUrl (tabId, changeInfo, tab) {
	if (tab.url.indexOf('http://www.bbc.co.uk/iplayer/') > -1) {
		var episodeId = tab.url.replace(/.*episode\/([^\/]*)\/.*/, "$1")
		var url = "http://www.bbc.co.uk/iplayer/ion/episodedetail/episode/" + episodeId;
		requestFeed(url);
	}

};

function requestFeed (url) {
	var req = new XMLHttpRequest();
	req.open("GET", url, true);
	req.setRequestHeader("Accept", "application/xml");
	req.onload = getProgrammeDetails.bind(this);
	req.send(null);
};

function getProgrammeDetails (e) {

	var brandId = e.target.responseXML.querySelector('brand_id').textContent;
	if(brandId ===''){
		brandId = e.target.responseXML.querySelector('series_id').textContent;
	}
	var brandTitle = e.target.responseXML.querySelector('brand_title').textContent;
	if(brandTitle ===''){
		brandTitle = e.target.responseXML.querySelector('series_title').textContent;
	}
	localStorage.setItem("currentBrandId", brandId);
	localStorage.setItem("currentBrandTitle", brandTitle);

};
// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);

chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		if (request.message == "subscribeToCurrentProgramme") {
			localStorage.setItem("iplayer_" + localStorage.getItem('currentBrandTitle').replace(/\W/g, ''), localStorage.getItem('currentBrandId'));
			sendResponse({status: "success"});
		}
		else {
			sendResponse({status: "unSuccess"});
		}
	});


