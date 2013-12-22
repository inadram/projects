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

			createDiv: function (id, className) {
				var div = document.createElement('div');
				div.setAttribute('class', className);
				div.setAttribute('id', id);
				return div;
			},

			createImg: function (src) {
				var img = document.createElement('img');
				img.src = src;
				return img;
			},

			createA: function (text, url) {
				var a = document.createElement('a');
				var linkText = document.createTextNode(text);
				a.appendChild(linkText);
				a.title = text;
				a.href = url;
				a.target = '_blank';
				return a;
			},

			createTable: function (width) {
				var table= document.createElement('table');
				if(width>0){
					table.setAttribute('width',width);
				}
				return table;
			},

			createTr: function (rowIndex) {
				var tr = document.createElement('tr');
				(rowIndex % 2 == 0) ? tr.setAttribute('class', 'even') : tr.setAttribute('class', 'odd');
				return tr;
			},

			createTd: function (rowspan,width) {
				var td = document.createElement('td');
				if (rowspan > 0) {
					td.setAttribute('rowspan', rowspan);
				}
				if(width>0){
					td.setAttribute('width',width);
				}
				return td;
			}

		});
	});
