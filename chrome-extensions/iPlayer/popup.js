var ProgrammeGenerator = {

	GetLatestEpisodes: function (brandId) {
		var iPlayerFeed = 'http://www.bbc.co.uk/iplayer/ion/container/brand/brandId/with_episodes/1/recipe/wii-listview/';
		var url = iPlayerFeed.replace('brandId', brandId);
		var req = new XMLHttpRequest();
		req.open("GET", url, false);
		req.setRequestHeader('Accept', 'application/xml');
		req.send(null);
		return req.responseXML;
	},

	createProgrammeTabContent: function (brandId, item) {
		var tabContent = document.getElementById('tabs');
		var response = this.GetLatestEpisodes(brandId);
		var tabPane = this._createTabPane(response, item);
		var button = document.createElement('button');
		button.setAttribute('class', 'btn btn-danger');
		button.setAttribute('id', 'unSubscribe_' + item);
		var unSubscribeText = document.createTextNode('X unSubscribe');
		button.appendChild(unSubscribeText);
		tabPane.appendChild(button);

		tabContent.appendChild(tabPane);
	},

	_createTabPane: function (responseXml, item) {
		var episode = responseXml.querySelectorAll('episode');
		var div = document.createElement('div');
		div.id = item;
		for (var i = 0; i < episode.length; i++) {
			var p = document.createElement('p');
			var a = this._createLink(episode[i]);
			p.appendChild(a);
			div.appendChild(p)
		}
		return div;
	},

	_createLink: function (episode) {
		var url = episode.querySelector('id').textContent;
		var title = episode.querySelector('contextually_unique_title').textContent;
		var a = document.createElement('a');
		var linkText = document.createTextNode(title);
		a.appendChild(linkText);
		a.title = title;
		a.href = "http://www.bbc.co.uk/iplayer/episode/" + url;
		a.target = "_blank"
		return a;
	},

	showSubscription: function () {
		for (var item in localStorage) {
			if (item.substring(0, 'iplayer_'.length) === 'iplayer_') {
				var brandId = localStorage.getItem(item);
				this.createProgrammeTab(item);
				this.createProgrammeTabContent(brandId, item);
			}
		}

	},

	createProgrammeTab: function (item) {
		var subscriptionList = document.getElementById('subscriptionList');
		var li = document.createElement('li');
		li.setAttribute("id", 'li_'+item);
		var a = document.createElement('a');
		a.href = "#" + item;
		var itemText = item;
		var itemText = itemText.replace("iplayer_", "");
		itemText = itemText.replace(/([a-z])([A-Z])/g, '$1 $2');
		var text = document.createTextNode(itemText);
		a.appendChild(text);
		li.appendChild(a);

		subscriptionList.appendChild(li);

	}
};

document.addEventListener('DOMContentLoaded', function () {
	$(function() {
		$( "#tabs" ).tabs();
	});
	ProgrammeGenerator.showSubscription();
	setActiveSubscription();

});

