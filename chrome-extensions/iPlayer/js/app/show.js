define('app/show',
	[
		'lib/class',
		'lib/element'

	],
	function (Class, Element) {

		return Class.extend({

			init: function () {
				try {
					this._element = new Element();
					this._createDivLinks();
					this._createTab();
					chrome.browserAction.setBadgeText({text: '' });
				}
				catch (err) {
				}
			},


			_createDivLinks: function () {
				try {
					var self = this;
					var settingDiv = this._element.createDivLink('settings', self.getOptionPage());
					var popularDiv = this._element.createDivLink('popular', 'http://www.bbc.co.uk/iplayer/tv/mostpopular');
					var tabContainer = document.getElementById('tabContainer');
					tabContainer.appendChild(settingDiv);
					tabContainer.appendChild(popularDiv);
				}
				catch (err) {
				}
			},
			_createTab: function () {
				var brands = this._getBrands();
				(brands.length > 0) ? this._createBrandTabs(brands) : this._createUpsellTab();
			},

			_createUpsellTab: function () {
				try {
					var upsellDiv = this._element.createDiv('upsell', 'upsell');
					var upsellLink = this._element.createA('find your favourite programme on iplayer and click on subscribe button which is under player menu!', 'http://www.bbc.co.uk/iplayer/');
					upsellDiv.appendChild(upsellLink);
					var tabContainer = document.getElementById('tabContainer');
					tabContainer.appendChild(upsellDiv);
				} catch (err) {
				}
			},

			_getBrands: function () {
				var brands = [];
				var storage = this.getLocalStorage();
				for (var brandId in storage) {
					if (storage.hasOwnProperty(brandId) && brandId.search(/store.settings/) < 0) {
						var brandDetail = JSON.parse(storage.getItem(brandId));
						brands.push({id: brandId, detail: {title: brandDetail.title, episodes: brandDetail.episodes}});
					}
				}
				return brands;
			},


			_createBrandTabs: function (brands) {
				var self = this;
				try {
					brands.forEach(function (id) {
						self._createTabHeader(id);
						self._createTabContent(id);
					});
				}
				catch (err) {
				}
			},
			_createTabHeader: function (brand) {
				try {
					var tabsHeader = document.getElementById('tabsHeader');
					var li = this._element.createLi('tabHeader_' + brand.id, brand.detail.title);
					tabsHeader.appendChild(li);
				}
				catch (err) {
				}
			},

			_createTabContent: function (brand) {
				try {
					var tabContainer = document.getElementById('tabscontent');
					var episodes = brand.detail.episodes;
					var content = this._createContent(brand.id, episodes);
					tabContainer.appendChild(content);
				}
				catch (err) {
				}
			},

			_createContent: function (id, episodes) {
				var div = null;
				try {
					div = this._element.createDiv('tabpage_' + id, 'tabpage');
					var tableEpisode = this._element.createTable(690);
					var self = this;
					episodes.forEach(function (episode, index) {
						var trImage = self._element.createTr(index);
						var tdImage = self._element.createTd(2, 96);

						var src = self._getEpisodeImageSrc(episode.id, 89, 50);
						var img = self._element.createImg(src);
						tdImage.appendChild(img);
						trImage.appendChild(tdImage);

						var tdBrand = self._element.createTd(null, 574);
						var brandTitle = self._getBrandTitle(episode.title);
						var aBrand = self._element.createA(brandTitle, episode.url);
						tdBrand.appendChild(aBrand);
						trImage.appendChild(tdBrand);

						tableEpisode.appendChild(trImage);

						var trEpisode = self._element.createTr(index);
						var tdEpisode = self._element.createTd(null, 574);
						var episodeTitle = self._getEpisodeTitle(episode.title);
						var aEpisode = self._element.createA(episodeTitle, episode.url);
						tdEpisode.appendChild(aEpisode);
						trEpisode.appendChild(tdEpisode);

						tableEpisode.appendChild(trEpisode);
					});
					div.appendChild(tableEpisode);
				}
				catch (err) {
				}

				return div;
			},

			_getEpisodeImageSrc: function (episodeId, width, height) {
				return 'http://www.bbc.co.uk/iplayer/images/episode/' + episodeId + '_' + width + '_' + height + '.jpg';
			},

			_getEpisodeTitle: function (fullTitle) {
				return (fullTitle.indexOf(':') > 0) ? fullTitle.split(':').pop() : fullTitle;
			},

			_getBrandTitle: function (fullTitle) {
				return (fullTitle.indexOf(':') > 0) ? fullTitle.split(':')[0] : fullTitle;
			},

			getOptionPage: function () {
				return chrome.extension.getURL("/src/options_custom/index.html");
			},

			getLocalStorage: function () {
				return localStorage;
			}
		});

	});
