// click sfx doesnt work im too lazy to fix it

var link1 = document.getElementById("homelink");
var link2 = document.getElementById("aboutlink");
var link3 = document.getElementById("artlink");
var link4 = document.getElementById("omolink");

console.log(link1);

var menu = new Audio("https://file.garden/Zlk30agh4hF11eOU/generic%20menu%20selection.wav");
var menuClick = new Audio("https://file.garden/Zlk30agh4hF11eOU/select.mp3");

function menuSelectSfx(){
	menu.play();
}

function menuClickSfx(){
	menuClick.play();
}

link1.addEventListener("mouseover", menuSelectSfx);
link1.addEventListener("click", menuClickSfx);
link2.addEventListener("mouseover", menuSelectSfx);
link2.addEventListener("click", menuClickSfx);
link3.addEventListener("mouseover", menuSelectSfx);
link3.addEventListener("click", menuClickSfx);

if (link4) {
	link4.addEventListener("mouseover", menuSelectSfx);
	link4.addEventListener("click", menuClickSfx);
} else {
	
}