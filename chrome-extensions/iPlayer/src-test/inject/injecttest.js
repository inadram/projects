InjectTest = TestCase('InjectTest');

InjectTest.prototype.setUp = function () {
	this._sandbox = sinon.sandbox.create();
};

InjectTest.prototype.tearDown = function () {
	this._sandbox.restore();
};

InjectTest.prototype.testDomShouldLoadFilesIfItIsInReadyStatus = function () {
	expectAsserts(2);

	this._sandbox.stub(inject,'isReady').returns(true);
	var loadJsSpy = this._sandbox.spy(load,'js');
	var loadCssSpy = this._sandbox.spy(load,'css');

	inject.dom();
	assertTrue(loadJsSpy.called);
	assertTrue(loadCssSpy.called);
};

InjectTest.prototype.testDomShouldNotLoadFilesIfItIsNotInReadyStatus = function () {
	expectAsserts(2);

	this._sandbox.stub(inject,'isReady').returns(false);
	var loadJsSpy = this._sandbox.spy(load,'js');
	var loadCssSpy = this._sandbox.spy(load,'css');

	inject.dom();
	assertTrue(loadJsSpy.notCalled);
	assertTrue(loadCssSpy.notCalled);
};

InjectTest.prototype.testDomShouldAttacheTheMessageEventToWindowIfDomIsInReadyStatus = function () {
	expectAsserts(1);

	var addEventListenerSpy = this._sandbox.spy(window,'addEventListener');
	this._sandbox.stub(inject,'isReady').returns(true);

	inject.dom();
	assertTrue(addEventListenerSpy.withArgs("message", subscription.handleSubscribeRequest, false).called);
};