const link1 = document.getElementById("homelink");
const link2 = document.getElementById("aboutlink");
const link3 = document.getElementById("artlink");
const link4 = document.getElementById("bloglink");
const link5 = document.getElementById("omolink");
const link6 = document.getElementById("archivelink");
const link7 = document.getElementById("funlink");

function menuSelectSfx(){
	var menu = new Audio("https://file.garden/Zlk30agh4hF11eOU/generic%20menu%20selection.wav");
	menu.volume = 0.4;
	menu.play();
}

function menuClickSfx(){
	var menuClick = new Audio("https://file.garden/Zlk30agh4hF11eOU/select.wav");
	menuClick.volume = 0.4;
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

link7.addEventListener("mouseover", menuSelectSfx);
link7.addEventListener("click", menuClickSfx);

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