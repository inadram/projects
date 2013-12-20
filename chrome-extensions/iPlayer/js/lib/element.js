define('lib/element',
	[
		'lib/class'

	],
	function (Class) {

		return Class.extend({

			createLi: function (id, text) {
				var li = document.createElement('li');
				li.setAttribute("id", id);
				li.appendChild(document.createTextNode(text));
				return li;
			},

			createDiv: function (id) {
				var div = document.createElement('div');
				div.setAttribute('class', 'tabpage');
				div.setAttribute('id', id);
				return div;
			},

			createP: function () {
				return document.createElement('p');
			},

			createA: function (text, url) {
				var a = document.createElement('a');
				var linkText = document.createTextNode(text);
				a.appendChild(linkText);
				a.title = text;
				a.href = url;
				a.target='_blank';
				return a;
			}

		});
	});
