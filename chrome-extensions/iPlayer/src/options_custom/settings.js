window.addEvent("domready", function () {
	// Option 1: Use the manifest:

	function getBrandIds () {
		var brandIds = [];
		for (var brandId in localStorage) {
			if (brandId.search(/store.settings/) < 0) {
				var brandDetail = JSON.parse(localStorage.getItem(brandId));
				brandIds.push(brandId);
			}
		}
		return brandIds;
	}

	var brandIds = getBrandIds();
	new FancySettings.initWithManifest(function (settings) {
		var manifestElements = settings.manifest;

		for (var key in  manifestElements) {
			if (manifestElements[key].params.name != undefined && manifestElements[key].params.name.search(/subscription_/) >= 0) {
				var unsubscribeButton = manifestElements[key];
				unsubscribeButton.addEvent("action", function () {
					localStorage.removeItem(this.params.name.split('subscription_')[1]);
					var elements = document.getElementsByClassName('setting bundle button');
					for(var elementKey in elements){
						if(elements[elementKey].textContent == this.params.label){
							document.getElementsByClassName('setting bundle button')[elementKey].remove();
						}
					}

				});
			}
		}

	});


	// Option 2: Do everything manually:
	/*
	 var settings = new FancySettings("My Extension", "icon.png");

	 var username = settings.create({
	 "tab": i18n.get("information"),
	 "group": i18n.get("login"),
	 "name": "username",
	 "type": "text",
	 "label": i18n.get("username"),
	 "text": i18n.get("x-characters")
	 });

	 var password = settings.create({
	 "tab": i18n.get("information"),
	 "group": i18n.get("login"),
	 "name": "password",
	 "type": "text",
	 "label": i18n.get("password"),
	 "text": i18n.get("x-characters-pw"),
	 "masked": true
	 });

	 var myDescription = settings.create({
	 "tab": i18n.get("information"),
	 "group": i18n.get("login"),
	 "name": "myDescription",
	 "type": "description",
	 "text": i18n.get("description")
	 });

	 var myButton = settings.create({
	 "tab": "Information",
	 "group": "Logout",
	 "name": "myButton",
	 "type": "button",
	 "label": "Disconnect:",
	 "text": "Logout"
	 });

	 // ...

	 myButton.addEvent("action", function () {
	 alert("You clicked me!");
	 });

	 settings.align([
	 username,
	 password
	 ]);
	 */
});
