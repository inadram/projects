function unSubscribeClickHandler (e) {
	setTimeout(unSubscribe, 1000, e.target.id);
}

function subscribeToCurrentProgramme () {
	localStorage.setItem("iplayer_" + localStorage.getItem('currentBrandTitle').replace(/\W/g, ''), localStorage.getItem('currentBrandId'));
}

function unSubscribe (item) {
	item = item.replace('unSubscribe_', '');
	localStorage.removeItem(item);
	document.getElementById('li_'+item).remove();
	document.getElementById(item).remove();
	setActiveSubscription();
}

function setActiveSubscription(){
	var firstTab = document.getElementsByTagName('li')[0];
	firstTab.setAttribute("class", "active");
}

document.addEventListener('DOMContentLoaded', function () {
	for (var item in localStorage) {
		if (item.substring(0, 'iplayer_'.length) === 'iplayer_') {
			document.getElementById('unSubscribe_' + item).addEventListener('click', unSubscribeClickHandler);
			;
		}
	}


});
