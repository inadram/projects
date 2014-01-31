ElementTest = TestCase('ElementTest');

ElementTest.prototype.setUp = function () {
	this._sandbox = sinon.sandbox.create();
};

ElementTest.prototype.tearDown = function () {
	this._sandbox.restore();
};

ElementTest.prototype.testCreateSubscribeDivShouldLoadDivTool = function () {
	expectAsserts(1);

	var document = this._sandbox.stub(window.document);
	element.createSubscribe();
	assertTrue(document.getElementsByClassName.withArgs("tools").called);
};

ElementTest.prototype.testCreateSubscribeDivShouldCreateLi = function () {
	expectAsserts(1);

	var document = this._sandbox.stub(window.document);
	element.createSubscribe();
	assertTrue(document.getElementsByClassName.withArgs("link-to-this").called);
};

ElementTest.prototype.testCreateSubscribeDivShouldCreateLiWithExpectedIdAndClass = function () {
	expectAsserts(3);

	var documentStub = this._sandbox.stub(window.document);
	var fakeDiv = {};
	var fakeLi ={};
	fakeLi.setAttribute = function(){};
	this._setAttributeSpy= this._sandbox.spy(fakeLi,'setAttribute');
	var self = this;
	fakeDiv.cloneNode = function(){
		return fakeLi;
	};
	documentStub.getElementsByClassName.withArgs('link-to-this').returns([fakeDiv]);
	element.createSubscribe();
	assertTrue(this._setAttributeSpy.withArgs('class','subscribe').called);
	assertTrue(this._setAttributeSpy.withArgs('class','display-none').called);
	assertTrue(this._setAttributeSpy.withArgs('id','subscribeLi').called);
};

ElementTest.prototype.testCreateSubscribeDivShouldCreateSubscribeSpanWithExpectedId = function () {
	expectAsserts(1);

	var documentStub = this._sandbox.stub(window.document);
	var fakeDiv = {};
	var fakeLi ={};
	fakeLi.getElementsByTagName= function(){};
	var fakeLiStub = this._sandbox.stub(fakeLi);
	fakeDiv.cloneNode = function(){
		return fakeLiStub;
	};
	documentStub.getElementsByClassName.withArgs('link-to-this').returns([fakeDiv]);



	var fakeSpan = {};
	fakeSpan.setAttribute = function(){};
	var fakeSpanSetAttributeSpy = this._sandbox.spy(fakeSpan,'setAttribute');
	fakeLiStub.getElementsByTagName.withArgs('span').returns([fakeSpan]);
	element.createSubscribe();
	assertTrue(fakeSpanSetAttributeSpy.withArgs('id','subscribeText').called);
};