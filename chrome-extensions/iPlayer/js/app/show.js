define('app/show',
	[
		'lib/class',
		'lib/element'

	],
	function (Class, Element) {

		return Class.extend({

			init: function () {
				this._element = new Element();
				var brands = this._getBrands();
				this._createTabs(brands);
			},

			_getBrands: function () {
				var brands = [];
				for (var brandId in localStorage) {
						brands.push({id:brandId , title: localStorage.getItem(brandId)});
				}
				return brands;
			},

			_createTabs: function (brands) {
				for (var id in brands) {
					this._createTabHeader(brands[id]);
					this._createTabContent(brands[id]);
				}
			},

			_createTabHeader: function (brand) {
				var tabsHeader = document.getElementById('tabsHeader');
				var li = this._element.createLi('tabHeader_' + brand.id, brand.title);
				tabsHeader.appendChild(li);
			},

			_getEpisodes: function (brand) {
				var iPlayerFeed = 'http://www.bbc.co.uk/iplayer/ion/container/brand/' + brand.id + '/with_episodes/1/recipe/wii-listview/';
				var req = new XMLHttpRequest();
				req.open("GET", iPlayerFeed, false);
				req.setRequestHeader('Accept', 'application/xml');
				req.send(null);
				var episodes = req.responseXML.querySelectorAll('episode');
				var episodesDetails = [];
				for (var i = 0; i < episodes.length; i++) {
					var id = episodes[i].querySelector('id').textContent;
					var url = "http://www.bbc.co.uk/iplayer/episode/" + id;
					var title = episodes[i].querySelector('contextually_unique_title').textContent;
					episodesDetails.push({id: id, title: title, url: url});
				}
				return episodesDetails;
			},

			_createTabContent: function (brand) {
				var tabContainer = document.getElementById('tabscontent');
				var episodes = this._getEpisodes(brand);
				var content = this._createContent(brand.id, episodes);
				tabContainer.appendChild(content);
			},

			_createContent: function (id, episodes) {
				var div = this._element.createDiv('tabpage_' + id);
				for (var i = 0; i < episodes.length; i++) {
					var p = this._element.createP();
					var a = this._element.createA(episodes[i].title, episodes[i].url);
					p.appendChild(a);
					div.appendChild(p)
				}
				return div;
			}

		});

	})
;
