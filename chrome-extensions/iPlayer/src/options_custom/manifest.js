// SAMPLE
this.manifest = {
	"name": "My Extension",
	"icon": "icon.png",
	"settings": [
		{
			"tab": "Subscription",
			"group": 'Check update',
			"name": "iplayer_check_update",
			"type": "slider",
			"label": "check iPlayer for new episodes every:",
			"max": 24,
			"min": 1,
			"step": 1,
			"display": true,
			"displayModifier": function (value) {
				var suffix = (value == 1) ? ' hour' : ' hours';
				return value + suffix;
			}
		},
		{
			"tab": "Popular programmes",
			"group": 'subscribe now',
			"name": "popular programmes",
			"type": "button",
			"label": "comming soon !" ,
			"text" : "subscribe"
		}
	]
};
subscription = {
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
	_showBrands: function () {
		var brands = this._getBrands();
		for (var i =0; i<brands.length ;i++) {
			var subscription = {
				"tab": "Subscription",
				"group": 'subscriptions',
				"type": "button"
			};
			subscription.name = 'subscription_'+brands[i].id;
			subscription.text = 'unsubscribe';
			subscription.label = brands[i].detail.title;
			manifest.settings.push(subscription);
		}
	}
};

subscription._showBrands();

