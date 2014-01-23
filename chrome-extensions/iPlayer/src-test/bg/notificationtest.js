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

