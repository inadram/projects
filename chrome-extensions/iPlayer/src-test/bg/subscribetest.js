SubscribeTest = TestCase('SubscribeTest');

SubscribeTest.prototype.setUp = function () {
	this._sandbox = sinon.sandbox.create();
};

SubscribeTest.prototype.tearDown = function () {
	this._sandbox.restore();
	brandId = null;
	brandTitle = null;
	localStorage = null;
};

SubscribeTest.prototype.testHandleSubscribeRequestReturnExpectedCallBacksOnInvalidRequest = function () {
	expectAsserts(1);
	brandId ='';
	brandTitle = '';
	var someCallBack = sinon.spy();
	subscribe.handleSubscribe('','',someCallBack);
	assertTrue(someCallBack.withArgs({status:'invalidRequest'}).calledOnce);
};

SubscribeTest.prototype.testHandleSubscribeRequestReturnsValidResponseOnValidRequest = function(){
	expectAsserts(1);
	brandId = 'some BrandId';
	brandTitle = 'some Title';
	var callBackSpy = sinon.spy();
	subscribe.handleSubscribe('','',callBackSpy);
	assertTrue(callBackSpy.withArgs({status:'validRequest'}).calledOnce);
};

SubscribeTest.prototype.testHandleSubscribeRequestReturnsSubscribedResponseOnSubscribeRequest = function(){
	expectAsserts(1);
	brandId = 'some BrandId';
	brandTitle = 'some Title';
	var request = {message: 'subscribe'};
	var callBackSpy = sinon.spy();
	subscribe.handleSubscribe(request,'',callBackSpy);
	assertTrue(callBackSpy.withArgs({status:'subscribed'}).calledOnce);
};

SubscribeTest.prototype.testHandleSubscribeRequestReturnsSubscribedResponseOnAlreadySubscribeRequests = function(){
	expectAsserts(1);
	brandId = 'some BrandId';
	brandTitle = 'some Title';
	var request = {message: 'isSubscribed'};
	var callBackSpy = sinon.spy();

	var isSubscribeStub = this._sandbox.stub(lib,'isSubscribed');
	isSubscribeStub.returns(true);
	subscribe.handleSubscribe(request,'',callBackSpy);
	assertTrue(callBackSpy.withArgs({status:'subscribed'}).calledOnce);
};

