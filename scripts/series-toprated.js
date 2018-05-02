//Burger menu.
const burger = document.querySelector(".burger");
const slide = document.querySelector(".slide");
burger.addEventListener("click", ()=>{
	burger.classList.toggle("active");
	//Slide menu.
	slide.classList.toggle("slideIn");
});
//Click on DROPDOWN - MOVIES on small screen to display/hide the list.
const smallMovies = document.getElementById("smallScreenMovies");
smallMovies.addEventListener("click", ()=>{
	const moviesDropdown = document.getElementById("moviesDropdown");
	moviesDropdown.classList.toggle("drop");
});
//Click on DROPDOWN - SERIES on small screen to display/hide the list.
const smallSeries = document.getElementById("smallScreenSeries");
smallSeries.addEventListener("click", ()=>{
	const seriesDropdown = document.getElementById("seriesDropdown");
	seriesDropdown.classList.toggle("drop");
});
//When window is loaded, it runs the function getSeries(), which lists the top rated tv shows by
//grabing the API from themoviedb.com.
window.onload = function (){
	axios.get("https://api.themoviedb.org/3/tv/top_rated?api_key=fa155f635119344d33fcb84fb807649b&language=en-US&page=1")
		.then ((response)=>{
			//Fetches the data - > results from the API.
			console.log(response);
			let series = response.data.results;
			let output = "";
			//Appends to the output the info for each fetched result.
			$.each(series, (index, show)=>{
				output += `
				<div class="card">
						<img src="http://image.tmdb.org/t/p/w300/${show.poster_path}" onerror="this.onerror=null;this.src='../images/image2.png';">
						<h3>${show.name}</h3>
						<p>Rating: <strong>${show.vote_average}</strong></p>
						<p>First air date: <strong>${show.first_air_date}</strong></p>
						<a onclick="showSelected('${show.id}')" class="btn" href="#"> Show Details </a>
					</div>
				`;
			})
			//Creates a variable that targets the "movies" element in the HTML
			//that will be used to output the data results to.
			let seriesInfo = document.getElementById("movies");
			seriesInfo.innerHTML = output;
			//Show pages after load
			let pages = document.querySelector(".pages");
			pages.style.display = "flex";
		})
		//If theres an error, it logs it in the console.
		.catch ((err)=>{
			console.log(err);
		});
}
//showSelected function (stores ID into session storage so it can be accessed by the shows-page and list
//info about the show).
function showSelected(id){
	sessionStorage.setItem("showId", id);
	location.replace("../shows-page.html");
	return false;
}
//Creates a variable for the page number to make it dynamic.
var pageNum = 1;
//Targets the pages button with "prev" id, and goes backwards one page.
const prev = document.getElementById("prev");
prev.addEventListener("click", ()=>{
	//Decrements the page number by 1.
	pageNum--;
	//Scrolls to top of the window after the button is clicked.
	window.scrollTo(0,0);
	search(pageNum);
})
//Targets the pages button with "next" id, and goes forwards one page.
const next = document.getElementById("next");
next.addEventListener("click", ()=>{
	//Increments the page number by 1.
	pageNum++;
	//Scrolls to top of the window after the button is clicked.
	window.scrollTo(0,0);
	search(pageNum);
})
//Showcases the tv shows after the user changed the page by clicking previous/next button.
function search(pageNum){
	axios.get("https://api.themoviedb.org/3/tv/top_rated?api_key=fa155f635119344d33fcb84fb807649b&language=en-US&page="+pageNum)
		.then((response)=>{
			let series = response.data.results;
			let output = "";

			$.each(series, (index, show)=>{
				output += `<div class="card">
						<img src="http://image.tmdb.org/t/p/w300/${show.poster_path}" onerror="this.onerror=null;this.src='../images/image2.png';">
						<h3>${show.name}</h3>
						<p>Rating: <strong>${show.vote_average}</strong></p>
						<p>First air date: <strong>${show.first_air_date}</strong></p>
						<a onclick="showSelected('${show.id}')" class="btn" href="#"> Show Details </a>
					</div>
				`;
			})
			let seriesInfo = document.getElementById("movies");
			seriesInfo.innerHTML = output;
			//Get the pages buttons after content is loaded
			let pages = document.querySelector(".pages");
			pages.style.display = "flex";
		})
		.catch ((err)=>{
			console.log(err);
		})
}