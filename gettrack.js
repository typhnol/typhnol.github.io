fetchData();

async function fetchData(){
	try{
		const response = await fetch("http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=typhnol&api_key=72e55a57a4fe9a4aab96027bbb021884&limit=1&format=json");
		
		const data = await response.json();
		const name = data.recenttracks.track[0].name;
		const url = data.recenttracks.track[0].url;
		const album = data.recenttracks.track[0].image[2]["#text"];
		const artist = data.recenttracks.track[0].artist["#text"];
		
		var songname = document.getElementById("songname");
		var songurl = document.getElementById("songurl");
		var albumcover = document.getElementById("albumcover");
		var artistE = document.getElementById("artist");
		var statusP = document.getElementById("playing");
		
		songname.innerText = name;
		songurl.href = url;
		albumcover.src = album;
		artistE.innerText = artist;
		
		if (data.recenttracks.track[0]["@attr"] && typeof data.recenttracks.track[0]["@attr"].nowplaying !== "undefined"){
			statusP.innerText = "currently playing";
			statusP.style.color = "#b3ffc7";
		} else {
			statusP.innerText = "Played some time ago";
			statusP.style.color = "grey";
		}
		
		console.log(data);
	}
	catch{
		console.error("whoops");
	}
}