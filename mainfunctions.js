//TEXT SEPARATOR

const textElements = document.querySelectorAll('.animateText');

textElements.forEach(element => {
  const originalHTML = element.innerHTML;
  let newHTML = '';

  for (let i = 0; i < originalHTML.length; i++) {
    newHTML += `<span style="--i: ${i}">${originalHTML[i]}</span>`;
  }

  element.innerHTML = newHTML;
});

//COLLAPSIBLES

var playBanner = document.getElementById("playbanner");
var playBox = document.getElementById("playerframe");
var indicator = document.getElementById("playbannerlabel");
var isOpened = localStorage.getItem("lastToggle") === "true";
if (isOpened) {
    playBox.style.left = "0px";
    playBanner.style.left = "300px";
    indicator.innerHTML = "&lt;";
} else {
    playBox.style.left = "-300px";
    playBanner.style.left = "0px";
    indicator.innerHTML = "&gt;";
}

function toggleDisplay(){
    isOpened = !isOpened;
    if (isOpened) {
        playBox.style.left = "0px";
        playBanner.style.left = "300px";
        indicator.innerHTML = "&lt;";
    } else {
        playBox.style.left = "-300px";
        playBanner.style.left = "0px";
        indicator.innerHTML = "&gt;";
    }
        
    localStorage.setItem("lastToggle", isOpened.toString());
}
playBanner.addEventListener("click", toggleDisplay); 

const collapsetoggles = Array.from(document.querySelectorAll('.collapsetoggle'));
const collapsibles = Array.from(document.querySelectorAll('.collapsible'));

collapsibles.forEach((element, i) => {
    element.id = "collapsible" + i;
});

collapsetoggles.forEach((element, i) => {
    element.id = "toggler" + i;
    element.addEventListener("click", () => {
        collapseopen(i); 
    });
});

function collapseopen(index){
    var content = document.getElementById("collapsible"+index);
    var toggler = document.getElementById("toggler" + index);
    content.classList.toggle("collapsed");

    if (content.classList.contains("collapsed")) {
        toggler.innerHTML = "show";
    } else {
        toggler.innerHTML = "hide";
    }
}



// var chatBanner = document.getElementById("chatbanner");
// var chatBox = document.getElementById("chattable");
// var indicator = document.getElementById("bannerlabel");
// var isOpened = localStorage.getItem("lastToggle") === "true";
// if (isOpened) {
//     chatBox.style.bottom = "0px";
//     chatBanner.style.bottom = "400px";
//     indicator.innerHTML = "Close";
// } else {
//     chatBox.style.bottom = "-400px";
//     chatBanner.style.bottom = "0px";
//     indicator.innerHTML = "Open";
// }

// function toggleDisplay(){
//     isOpened = !isOpened;
//     if (isOpened) {
//         chatBox.style.bottom = "0px";
//         chatBanner.style.bottom = "400px";
//         indicator.innerHTML = "Close";
//     } else {
//         chatBox.style.bottom = "-400px";
//         chatBanner.style.bottom = "0px";
//         indicator.innerHTML = "Open";
//     }
        
//     localStorage.setItem("lastToggle", isOpened.toString());
// }
// chatBanner.addEventListener("click", toggleDisplay); 

//LINK SOUND EFFECTS

document.addEventListener("mouseover", (e) => {
    const link = e.target.closest(".navlink");
    if (link) {
        const hoverSound = new Audio("https://file.garden/Zlk30agh4hF11eOU/generic%20menu%20selection.wav");
		hoverSound.volume = 0.4;
		hoverSound.play();
    }
});

document.addEventListener("click", (e) => {
    const link = e.target.closest(".navlink");
    if (link) {
        const clickSound = new Audio("https://file.garden/Zlk30agh4hF11eOU/select.wav");
		clickSound.volume = 0.4;
		clickSound.play();
    }
});

//GO TO TOP BUTTON

const topBtn = document.createElement("button");
topBtn.id = "topBtn";
topBtn.title = "Go to Top";
topBtn.innerHTML = "top"

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
} 

topBtn.addEventListener("click", topFunction);
document.body.appendChild(topBtn);

//SPARKLES!!!

var colour="#FFFFFF";
var sparkles=50;

/****************************
*  Tinkerbell Magic Sparkle *
* (c) 2005 mf2fm web-design *
*  http://www.mf2fm.com/rv  *
****************************/

var x=ox=400;
var y=oy=300;
var swide=800;
var shigh=600;
var sleft=sdown=0;
var tiny=new Array();
var star=new Array();
var starv=new Array();
var starx=new Array();
var stary=new Array();
var tinyx=new Array();
var tinyy=new Array();
var tinyv=new Array();

window.onload=function() { if (document.getElementById) {
var i, rats, rlef, rdow;
for (var i=0; i<sparkles; i++) {
    var rats=createDiv(3, 3);
    rats.style.visibility="hidden";
    document.body.appendChild(tiny[i]=rats);
    starv[i]=0;
    tinyv[i]=0;
    var rats=createDiv(5, 5);
    rats.style.backgroundColor="transparent";
    rats.style.visibility="hidden";
    var rlef=createDiv(1, 5);
    var rdow=createDiv(5, 1);
    rats.appendChild(rlef);
    rats.appendChild(rdow);
    rlef.style.top="2px";
    rlef.style.left="0px";
    rdow.style.top="0px";
    rdow.style.left="2px";
    document.body.appendChild(star[i]=rats);
}
set_width();
sparkle();
}}

function sparkle() {
var c;
if (x!=ox || y!=oy) {
    ox=x;
    oy=y;
    for (c=0; c<sparkles; c++) if (!starv[c]) {
    star[c].style.left=(starx[c]=x)+"px";
    star[c].style.top=(stary[c]=y)+"px";
    star[c].style.clip="rect(0px, 5px, 5px, 0px)";
    star[c].style.visibility="visible";
    starv[c]=50;
    break;
    }
}
for (c=0; c<sparkles; c++) {
    if (starv[c]) update_star(c);
    if (tinyv[c]) update_tiny(c);
}
setTimeout("sparkle()", 40);
}

function update_star(i) {
if (--starv[i]==25) star[i].style.clip="rect(1px, 4px, 4px, 1px)";
if (starv[i]) {
    stary[i]+=1+Math.random()*3;
    if (stary[i]<shigh+sdown) {
    star[i].style.top=stary[i]+"px";
    starx[i]+=(i%5-2)/5;
    star[i].style.left=starx[i]+"px";
    }
    else {
    star[i].style.visibility="hidden";
    starv[i]=0;
    return;
    }
}
else {
    tinyv[i]=50;
    tiny[i].style.top=(tinyy[i]=stary[i])+"px";
    tiny[i].style.left=(tinyx[i]=starx[i])+"px";
    tiny[i].style.width="2px";
    tiny[i].style.height="2px";
    star[i].style.visibility="hidden";
    tiny[i].style.visibility="visible"
}
}

function update_tiny(i) {
if (--tinyv[i]==25) {
    tiny[i].style.width="1px";
    tiny[i].style.height="1px";
}
if (tinyv[i]) {
    tinyy[i]+=1+Math.random()*3;
    if (tinyy[i]<shigh+sdown) {
    tiny[i].style.top=tinyy[i]+"px";
    tinyx[i]+=(i%5-2)/5;
    tiny[i].style.left=tinyx[i]+"px";
    }
    else {
    tiny[i].style.visibility="hidden";
    tinyv[i]=0;
    return;
    }
}
else tiny[i].style.visibility="hidden";
}

document.onmousemove=mouse;
function mouse(e) {
set_scroll();
y=(e)?e.pageY:event.y+sdown;
x=(e)?e.pageX:event.x+sleft;
}

function set_scroll() {
if (typeof(self.pageYOffset)=="number") {
    sdown=self.pageYOffset;
    sleft=self.pageXOffset;
}
else if (document.body.scrollTop || document.body.scrollLeft) {
    sdown=document.body.scrollTop;
    sleft=document.body.scrollLeft;
}
else if (document.documentElement && (document.documentElement.scrollTop || document.documentElement.scrollLeft)) {
    sleft=document.documentElement.scrollLeft;
    sdown=document.documentElement.scrollTop;
}
else {
    sdown=0;
    sleft=0;
}
}

window.onresize=set_width;
function set_width() {
if (typeof(self.innerWidth)=="number") {
    swide=self.innerWidth;
    shigh=self.innerHeight;
}
else if (document.documentElement && document.documentElement.clientWidth) {
    swide=document.documentElement.clientWidth;
    shigh=document.documentElement.clientHeight;
}
else if (document.body.clientWidth) {
    swide=document.body.clientWidth;
    shigh=document.body.clientHeight;
}
}

function createDiv(height, width) {
    var div=document.createElement("div");
    div.style.position="absolute";
    div.style.height=height+"px";
    div.style.width=width+"px";
    div.style.overflow="hidden";
    div.style.backgroundColor=colour;
    div.classList.add("sparkle");
    return (div);
}
// ]]>