BbcTest = TestCase('BbcTest');

BbcTest.prototype.setUp = function () {
	this._sandbox = sinon.sandbox.create();
};

BbcTest.prototype.tearDown = function () {
	this._sandbox.restore();
};

BbcTest.prototype.testSubscribeMethodShouldCallCreateSubscribe = function () {
	expectAsserts(1);

	var createSubscribeSpy= this._sandbox.spy(element,'createSubscribe');
	bbc.subscribe();
	assertTrue(createSubscribeSpy.calledOnce);

};

BbcTest.prototype.testSubscribeMethodShouldCallUpdateSubscribeText = function () {
	expectAsserts(1);

	var createSubscribeSpy= this._sandbox.spy(element,'updateSubscribeText');
	bbc.subscribe();
	assertTrue(createSubscribeSpy.withArgs('subscribe').calledOnce);
};

BbcTest.prototype.testSubscribeMethodShouldAttacheClickEventToSubscribeLiElement = function () {
	expectAsserts(1);

	var getElementByIdStub= this._sandbox.stub(document,'getElementById');
	var subscribeLi = {};
	subscribeLi.addEventListener = function(){};
	var addEventListenerSpy = this._sandbox.spy(subscribeLi,'addEventListener');
	getElementByIdStub.withArgs('subscribeLi').returns(subscribeLi);
	bbc.subscribe();
	assertTrue(addEventListenerSpy.withArgs('click').calledOnce);
};

BbcTest.prototype.testOnClickEventOfSubscribeLiElementSubscribeMessagePost = function () {
	expectAsserts(1);

	var getElementByIdStub= this._sandbox.stub(document,'getElementById');
	var subscribeLi = {};
	subscribeLi.addEventListener = function(){};
	getElementByIdStub.withArgs('subscribeLi').returns(subscribeLi);
	bbc.subscribe();

};

BbcTest.prototype.testSubscribeMethodShouldPostIsSubscribedMessage = function () {
	expectAsserts(1);

	var postMessageSpy= this._sandbox.stub(window,'postMessage');
	bbc.subscribe();
	assertTrue(postMessageSpy.calledWith({ type: "iplayer", text: "isSubscribed" }));
};

