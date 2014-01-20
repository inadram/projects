BackgroundTest = TestCase('BackgroundTest');

BackgroundTest.prototype.setUp = function () {
	this._sandbox = sinon.sandbox.create();
};

BackgroundTest.prototype.tearDown = function () {
	this._sandbox.restore();
};

BackgroundTest.prototype.testRequestFeedWithValidUrlShouldSendXMLHttpRequestToIONFeedWithExpectedUrl = function () {
	expectAsserts(1);
	var stubXMLHTTPRequest = this._sandbox.stub(XMLHttpRequest.prototype);
	var tab = {};
	tab.url = 'http://www.bbc.co.uk/iplayer/episode/EPISODE_ID/Some_Episode_Name/';
	var expectedUrl = 'http://www.bbc.co.uk/iplayer/ion/episodedetail/episode/EPISODE_ID';
	request.feed('tabId', 'changeInfo', tab);
	assertTrue(stubXMLHTTPRequest.open.withArgs(sinon.match.any, expectedUrl, sinon.match.any).called);
};

BackgroundTest.prototype.testRequestFeedWithValidUrlShouldSendXMLHttpRequestToEpisodeDetailFeedWithExpectedUrl = function () {
	expectAsserts(1);
	brandDetail.brandId = 'BRAND_ID';
	var stubXMLHTTPRequest = this._sandbox.stub(XMLHttpRequest.prototype);
	var tab = {};
	tab.url = 'http://www.bbc.co.uk/iplayer/episode/EPISODE_ID/Some_Episode_Name/';
	var expectedUrl = 'http://www.bbc.co.uk/iplayer/ion/container/brand/BRAND_ID/with_episodes/1/recipe/wii-listview/';
	request.feed('tabId', 'changeInfo', tab);
	assertTrue(stubXMLHTTPRequest.open.withArgs(sinon.match.any, expectedUrl, sinon.match.any).called);
};

