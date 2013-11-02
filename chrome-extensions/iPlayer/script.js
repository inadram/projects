var tools = document.getElementsByClassName("tools")[0];
var li = document.createElement("li");
var button = document.createElement("button");
button.setAttribute("id", "subscribeButton");
var text = document.createTextNode("subscribe");
button.appendChild(text);
li.appendChild(button);
tools.appendChild(li);


document.getElementById("subscribeButton").addEventListener("click", function() {
	window.postMessage({ type: "iplayer", text: "subscribed" }, "*");
}, false);




