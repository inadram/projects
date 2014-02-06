require(
	[
		'lib/class',
		'lib/element',
		'app/show'
	],
	function (Class, Element, Show) {
		TestCase('ShowTest', {

			setUp: function () {
			  console.log('hi');
			},
			tearDown: function () {

			},
			'test it': function(){
				console.log('hi');
			}
		});
	}
);