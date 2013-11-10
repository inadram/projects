define('app/subscription',
	[
		'lib/class'
	],
	function (Class) {
		return Class.extend({


			subscribeToCurrentProgramme: function () {
				localStorage.setItem("iplayer_" + localStorage.getItem('currentBrandTitle').replace(/\W/g, ''), localStorage.getItem('currentBrandId'));
			}
		});
	});
