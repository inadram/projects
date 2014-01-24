NotificationTest = TestCase('NotificationTest');

NotificationTest.prototype.setUp = function () {
	this._sandbox = sinon.sandbox.create();
};

NotificationTest.prototype.tearDown = function () {
	this._sandbox.restore();
};

NotificationTest.prototype.testOnClickShouldOpenExpectedURLAndCloseCurrentWindow = function () {
	expectAsserts(1);
	var openWindowSpy = this._sandbox.spy(window,'open');
	var closeStub = this._sandbox.stub(window,'close');
	var episodes = [{url:'URL1'},{url:'URL2'}];
	notification.click(episodes);
	assertTrue(openWindowSpy.withArgs(episodes[0].url).calledOnce);
};

NotificationTest.prototype.testCreateNotificationWithExpectedArguments = function () {
	expectAsserts(1);
	var createNotificationStub = this._sandbox.stub(window.webkitNotifications,'createNotification');
	var episodes = [{url:'URL1', title: 'title 1'},{url:'URL2', title:'title 2'}];
	var brandTitle = 'a brand title';
	notification.create(brandTitle,episodes);
	assertTrue(createNotificationStub.withArgs('http://www.bbc.co.uk/iplayer/images/episode/' + episodes[0].id + '_196_110.jpg', brandTitle, episodes[0].title).calledOnce);
};

NotificationTest.prototype.testShowShouldCreateNotificationWithExpectedArguments = function () {
	expectAsserts(1);
	var createNotificationStub = this._sandbox.stub(notification,'create');
	var status ={};
	status.onclick = '';
	status.show = function(){};
	createNotificationStub.returns(status);
	var episodes = [{url:'URL1', title: 'title 1'},{url:'URL2', title:'title 2'}];
	var brandTitle = 'a brand title';
	notification.show(brandTitle,episodes);
	assertTrue(createNotificationStub.withArgs(brandTitle,episodes).calledOnce);
};

NotificationTest.prototype.testShowShouldBindOnClickEventWithExpectedArguments = function () {
	expectAsserts(1);
	var createNotificationStub = this._sandbox.stub(notification,'create');
	var status ={};
	status.onclick = '';
	status.show = function(){};
	createNotificationStub.returns(status);
	var episodes = [{url:'URL1', title: 'title 1'},{url:'URL2', title:'title 2'}];
	var brandTitle = 'a brand title';
	var ClickBindStub = this._sandbox.stub(notification.click,'bind');
	notification.show(brandTitle,episodes);
	assertTrue(ClickBindStub.withArgs(status,episodes).calledOnce);
};

