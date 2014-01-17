BackgroundTest = TestCase('BackgroundTest');

BackgroundTest.prototype.setUp = function(){
	this._sandbox = sinon.sandbox.create();
};

BackgroundTest.prototype.tearDown = function(){
	this._sandbox.restore();
};

BackgroundTest.prototype.test = function(){
	var isValidUrl = background._isValidUrl('test');
	assertTrue(!isValidUrl);
};

