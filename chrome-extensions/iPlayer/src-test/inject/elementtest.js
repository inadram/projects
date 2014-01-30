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
	expectAsserts(1);

	var documentStub = this._sandbox.stub(window.document);
	var fakeDiv = {};
	var fakeLi ={};
	fakeLi.setAttribute = function(){};
	this._setAttributeSpy= this._sandbox.spy(fakeLi,'setAttribute');
	var self = this;
	fakeDiv.cloneNode = function(){
		return fakeLi;
	};
	documentStub.getElementsByClassName.returns([fakeDiv]);
	element.createSubscribe();
	assertTrue(this._setAttributeSpy.called);
};