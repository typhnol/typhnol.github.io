// click sfx doesnt work im too lazy to fix it

var link1 = document.getElementById("homelink");
var link2 = document.getElementById("aboutlink");
var link3 = document.getElementById("artlink");
var link4 = document.getElementById("bloglink");
var link5 = document.getElementById("omolink");
var link6 = document.getElementById("archivelink");

var menu = new Audio("https://file.garden/Zlk30agh4hF11eOU/generic%20menu%20selection.wav");
var menuClick = new Audio("https://file.garden/Zlk30agh4hF11eOU/select.wav");
menu.volume = 0.4;
menuClick.volume = 0.4;

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
link4.addEventListener("mouseover", menuSelectSfx);
link4.addEventListener("click", menuClickSfx);

if (link5) {
	link5.addEventListener("mouseover", menuSelectSfx);
	link5.addEventListener("click", menuClickSfx);
} else {
	
}
if (link6) {
	link6.addEventListener("mouseover", menuSelectSfx);
	link6.addEventListener("click", menuClickSfx);
} else {
	
}