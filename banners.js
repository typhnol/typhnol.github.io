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