LoadTest = TestCase('LoadTest');

LoadTest.prototype.setUp = function () {
	this._sandbox = sinon.sandbox.create();
};

LoadTest.prototype.tearDown = function () {
	this._sandbox.restore();
};

LoadTest.prototype.testJsFunctionShouldCreateScriptElement = function () {
	expectAsserts(1);

	var document = this._sandbox.stub(window.document);
	load.js();
	assertTrue(document.createElement.withArgs("script").called);
};

LoadTest.prototype.testJsFunctionShouldSetScriptToExpectedSrc = function () {
	expectAsserts(1);

	var document = this._sandbox.stub(window.document);
	var expectedSrc = "expectedSrc";
	var getUrlStub = this._sandbox.stub(load,'getUrl');
	getUrlStub.returns(expectedSrc);
	var script ={src:""};
	document.createElement.withArgs("script").returns(script);
	load.js(expectedSrc);
	assertEquals(script.src , expectedSrc);
};

LoadTest.prototype.testJsFunctionShouldAppendScriptToDomElement = function () {
	expectAsserts(1);

	var createElementStub = this._sandbox.stub(window.document,'createElement');
	var appendChildStub = this._sandbox.stub(window.document.head,'appendChild');
	var script ={src:""};
	createElementStub.withArgs("script").returns(script);
	load.js();
	assertTrue(appendChildStub.withArgs(script).called);
};

LoadTest.prototype.testCssFunctionShouldCreateLinkElement = function () {
	expectAsserts(1);

	var document = this._sandbox.stub(window.document);
	load.css();
	assertTrue(document.createElement.withArgs("link").called);
};

LoadTest.prototype.testCssFunctionShouldSetCssToExpectedRel = function () {
	expectAsserts(1);

	var document = this._sandbox.stub(window.document);
	var expectedRel = "stylesheet";
	var css ={rel:""};
	document.createElement.withArgs("link").returns(css);
	load.css(expectedRel);
	assertEquals(css.rel , expectedRel);
};

LoadTest.prototype.testCssFunctionShouldSetHrefToExpectedSrc = function () {
	expectAsserts(1);

	var document = this._sandbox.stub(window.document);
	var expectedSrc = "expectedSrc";
	var getUrlStub = this._sandbox.stub(load,'getUrl');
	getUrlStub.returns(expectedSrc);
	var Css ={href:""};
	document.createElement.withArgs("link").returns(Css);
	load.css(expectedSrc);
	assertEquals(Css.href , expectedSrc);
};

LoadTest.prototype.testCssFunctionShouldAppendLinkToDomElement = function () {
	expectAsserts(1);

	var createElementStub = this._sandbox.stub(window.document,'createElement');
	var appendChildStub = this._sandbox.stub(window.document.head,'appendChild');
	var Css ={href:""};
	createElementStub.withArgs("link").returns(Css);
	load.css();
	assertTrue(appendChildStub.withArgs(Css).called);
};