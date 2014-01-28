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