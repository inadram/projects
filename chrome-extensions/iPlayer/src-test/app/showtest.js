require(
	[
		'lib/class',
		'lib/element',
		'app/show'
	],
	function (Class, Element, Show) {
		TestCase('ShowTest', {

			setUp: function () {
			  this._sandbox = sinon.sandbox.create();
			},
			tearDown: function () {
				this._sandbox.restore();
			},
			'test on load show an upsellList div with a link to iplayer should be created and added to tabContainer when localstorage is empty': function(){
				expectAsserts(2);
				var elementStub= this._sandbox.stub(Element.prototype);
				this._sandbox.stub(Show.prototype,'getLocalStorage').returns([]);
				var show = new Show();
				assertTrue(elementStub.createDiv.withArgs('upsell', 'upsell').calledOnce);
				assertTrue(elementStub.createA.calledOnce);
			},

			'test on load show div settings and popular divs should be created': function(){
				expectAsserts(2);
				var elementStub= this._sandbox.stub(Element.prototype);
				this._sandbox.stub(Show.prototype,'getLocalStorage').returns([]);
				this._sandbox.stub(Show.prototype,'getOptionPage');
				var show = new Show();
				assertTrue(elementStub.createDivLink.withArgs('settings').called);
				assertTrue(elementStub.createDivLink.withArgs('popular').called);
			},

			'test if local storage has brands then on load show should create tab header and tab content': function(){
				expectAsserts(2);
				var documentStub= this._sandbox.stub(window.document);
				var getLocalStorageStub = this._sandbox.stub(Show.prototype,'getLocalStorage');
				var storage = ['brandA', 'brandB'];
				var brandDetails = {title:"brand title",episodes:"episode name"};
				storage.getItem = function(){ return JSON.stringify(brandDetails)};
				getLocalStorageStub.returns(storage);
				this._sandbox.stub(Show.prototype,'getOptionPage');
				var show = new Show();
				assertTrue(documentStub.getElementById.withArgs('tabsHeader').called);
				assertTrue(documentStub.getElementById.withArgs('tabscontent').called);
			},

			'test if local storage has brands then on load show should has tab header element with expected Id and title': function(){
				expectAsserts(2);
				var elementStub= this._sandbox.stub(Element.prototype);
				var documentStub= this._sandbox.stub(window.document);
				var getLocalStorageStub = this._sandbox.stub(Show.prototype,'getLocalStorage');
				var storage = ['brandA', 'brandB'];
				var brandDetails = {title:"brand title",episodes:"episode name"};
				storage.getItem = function(){ return JSON.stringify(brandDetails)};
				getLocalStorageStub.returns(storage);
				this._sandbox.stub(Show.prototype,'getOptionPage');
				var show = new Show();
				assertTrue(elementStub.createLi.withArgs('tabHeader_0', "brand title").called);
				assertTrue(elementStub.createLi.withArgs('tabHeader_1', "brand title").called);
			},

			'test if local storage has brands then on load show should has tab content element with expected Id and title': function(){
				expectAsserts(2);
				var elementStub= this._sandbox.stub(Element.prototype);
				var documentStub= this._sandbox.stub(window.document);
				var getLocalStorageStub = this._sandbox.stub(Show.prototype,'getLocalStorage');
				var storage = ['brandA', 'brandB'];
				var brandDetails = {title:"brand title",episodes:"episode name"};
				storage.getItem = function(){ return JSON.stringify(brandDetails)};
				getLocalStorageStub.returns(storage);
				this._sandbox.stub(Show.prototype,'getOptionPage');
				var show = new Show();
				assertTrue(elementStub.createDiv.withArgs('tabpage_0', "tabpage").called);
				assertTrue(elementStub.createDiv.withArgs('tabpage_1', "tabpage").called);
			},

			'test if local storage has one brands then on load show should create two tr and three td': function(){
				expectAsserts(2);
				var elementStub= this._sandbox.stub(Element.prototype);
				var tableElement ={};
				tableElement.appendChild = function(){};
				elementStub.createTr.returns(tableElement);
				elementStub.createTd.returns(tableElement);
				elementStub.createTable.returns(tableElement);
				var documentStub= this._sandbox.stub(window.document);
				var getLocalStorageStub = this._sandbox.stub(Show.prototype,'getLocalStorage');
				var storage = ['brandA'];
				var brandDetails = {title:"brand title",episodes:[{id:'episodeId_1',title:'episodeTitle_1',url:'episodeUrl_1'}]};
				storage.getItem = function(){ return JSON.stringify(brandDetails)};
				getLocalStorageStub.returns(storage);
				this._sandbox.stub(Show.prototype,'getOptionPage');
				var show = new Show();
				assertTrue(elementStub.createTr.withArgs(0).calledTwice);
				assertTrue(elementStub.createTd.calledThrice);
			},

			'test if local storage has one brands then on load show should create image with expected img': function(){
				expectAsserts(1);
				var episodeId = 'episodeId_1';
				var expectedWidth = '89';
				var expectedHeight = '50';

				var elementStub= this._sandbox.stub(Element.prototype);
				var tableElement ={};
				tableElement.appendChild = function(){};
				elementStub.createTr.returns(tableElement);
				elementStub.createTd.returns(tableElement);
				elementStub.createTable.returns(tableElement);
				var documentStub= this._sandbox.stub(window.document);
				var getLocalStorageStub = this._sandbox.stub(Show.prototype,'getLocalStorage');
				var storage = ['brandA'];
				var brandDetails = {title:"brand title",episodes:[{id:episodeId,title:'episodeTitle_1',url:'episodeUrl_1'}]};
				storage.getItem = function(){ return JSON.stringify(brandDetails)};
				getLocalStorageStub.returns(storage);
				this._sandbox.stub(Show.prototype,'getOptionPage');
				var show = new Show();

				assertTrue(elementStub.createImg.withArgs('http://www.bbc.co.uk/iplayer/images/episode/' + episodeId + '_' + expectedWidth + '_' + expectedHeight + '.jpg').called);
			},

			'test if local storage has one brands then on load show should create link to episode': function(){
				expectAsserts(1);
				var elementStub= this._sandbox.stub(Element.prototype);
				var tableElement ={};
				tableElement.appendChild = function(){};
				elementStub.createTr.returns(tableElement);
				elementStub.createTd.returns(tableElement);
				elementStub.createTable.returns(tableElement);
				var documentStub= this._sandbox.stub(window.document);
				var getLocalStorageStub = this._sandbox.stub(Show.prototype,'getLocalStorage');
				var storage = ['brandA'];
				var episodeTitle = 'episodeTitle_1';
				var episodeUrl = 'episodeUrl_1';
				var brandDetails = {title:"brand title",episodes:[{id:'episodeId_1',title: episodeTitle,url: episodeUrl}]};
				storage.getItem = function(){ return JSON.stringify(brandDetails)};
				getLocalStorageStub.returns(storage);
				this._sandbox.stub(Show.prototype,'getOptionPage');
				var show = new Show();
				assertTrue(elementStub.createA.withArgs(episodeTitle,episodeUrl).called);
			}
		});
	}
);