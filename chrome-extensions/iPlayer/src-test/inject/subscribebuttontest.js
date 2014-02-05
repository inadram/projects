SubscribeButtonTest = TestCase('SubscribeButtonTest');

SubscribeButtonTest.prototype.setUp = function () {
	this._sandbox = sinon.sandbox.create();
};

SubscribeButtonTest.prototype.tearDown = function () {
	this._sandbox.restore();
};

SubscribeButtonTest.prototype.testHandleSubscriptionSendMessageIfItIsValid = function () {
	expectAsserts(1);
	var sendMessageSpy = this._sandbox.spy(subscribeButton, 'sendMessage');
	var event = {data: {type: 'iplayer', text: 'subscribe'}, source: window};

	subscribeButton.sendSubscriptionRequest(event);
	assertTrue(sendMessageSpy.withArgs('subscribe').called);
};


SubscribeButtonTest.prototype.testIfTheEventDoesNotHaveTypeThenItsNotValid = function () {
	expectAsserts(1);
	var sendMessageSpy = this._sandbox.spy(subscribeButton, 'sendMessage');
	var event = {data: {text: 'subscribe'}, source: window};

	subscribeButton.sendSubscriptionRequest(event);
	assertTrue(sendMessageSpy.notCalled);
};

SubscribeButtonTest.prototype.testIfTheEventSourceIsNotWindowThenItsNotValid = function () {
	expectAsserts(1);
	var sendMessageSpy = this._sandbox.spy(subscribeButton, 'sendMessage');
	var event = {data: {type: 'iplayer',text: 'subscribe'}};

	subscribeButton.sendSubscriptionRequest(event);
	assertTrue(sendMessageSpy.notCalled);
};

SubscribeButtonTest.prototype.testIfTheEventDataTextIsNotSubscribeOrIsSubscribeThenItsNotValid = function () {
	expectAsserts(1);
	var sendMessageSpy = this._sandbox.spy(subscribeButton, 'sendMessage');
	var event = {data: {type: 'iplayer', text: 'NA'}, source: window};

	subscribeButton.sendSubscriptionRequest(event);
	assertTrue(sendMessageSpy.notCalled);
};