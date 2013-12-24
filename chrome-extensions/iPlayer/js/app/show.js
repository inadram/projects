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
				chrome.browserAction.setBadgeText({text: '' });
			},

			_getBrands: function () {
				var brands = [];
				for (var brandId in localStorage) {
					if (brandId.search(/store.settings/) < 0) {
						var brandDetail = JSON.parse(localStorage.getItem(brandId));
						brands.push({id: brandId, detail: {title: brandDetail.title, episodes: brandDetail.episodes}});
					}
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
				var li = this._element.createLi('tabHeader_' + brand.id, brand.detail.title);
				tabsHeader.appendChild(li);
			},

			_createTabContent: function (brand) {
				var tabContainer = document.getElementById('tabscontent');
				var episodes = brand.detail.episodes;
				var content = this._createContent(brand.id, episodes);
				tabContainer.appendChild(content);
			},

			_createContent: function (id, episodes) {
				var div = this._element.createDiv('tabpage_' + id, 'tabpage');
				var tableEpisode = this._element.createTable(690);

				for (var i = 0; i < episodes.length; i++) {
					var trImage = this._element.createTr(i);
					var tdImage = this._element.createTd(2, 96);

					var src = this._getEpisodeImageSrc(episodes[i].id, 89, 50);
					var img = this._element.createImg(src);
					tdImage.appendChild(img);
					trImage.appendChild(tdImage);

					var tdBrand = this._element.createTd(null, 574);
					var brandTitle = this._getBrandTitle(episodes[i].title);
					var aBrand = this._element.createA(brandTitle, episodes[i].url);
					tdBrand.appendChild(aBrand);
					trImage.appendChild(tdBrand);

					tableEpisode.appendChild(trImage);

					var trEpisode = this._element.createTr(i);
					var tdEpisode = this._element.createTd(null, 574);
					var episodeTitle = this._getEpisodeTitle(episodes[i].title);
					var aEpisode = this._element.createA(episodeTitle, episodes[i].url);
					tdEpisode.appendChild(aEpisode);
					trEpisode.appendChild(tdEpisode);

					tableEpisode.appendChild(trEpisode);
				}
				div.appendChild(tableEpisode);

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
			}

		});

	});
