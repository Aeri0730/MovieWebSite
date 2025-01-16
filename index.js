const main_Url =
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiM2JmOTVjZmE0YmMxMGZmNWYwMDI3NzFjYTY4NThlNCIsIm5iZiI6MTczNjMxMzAwNy41ODA5OTk5LCJzdWIiOiI2NzdlMDhhZmYyYzYyMTgwN2RiYjAxYzUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.dvBg426rjow7m2i86GiXkVgS4HWsrmVZYe9vUdUIGdM",
  },
};
const container = document.querySelector(".container");
const moviesContainer = document.getElementById("movies");
const modal = document.querySelector(".modal");
const popElement = document.createElement("div");
const popCorn = document.querySelector("#popCorn");
const siteName = document.querySelector("#siteName");
let movieAllData = [];

fetch(main_Url, options)
  .then((res) => res.json())
  .then((data) => {
    renderMovies(data.results);
    movieAllData = data.results;
  })
  .catch((err) => console.error(err));

function renderMovies(movies) {
  moviesContainer.innerHTML = "";
  movies.forEach((movie) => {
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");
    movieElement.setAttribute("movie-id", movie.id);
    movieElement.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
      <div class="movie-details">
        <h2 class="movie-title">${movie.title}</h2>
        <p class="movie-rating">⭐ ${movie.vote_average}</p>
      </div>
    `;

    moviesContainer.appendChild(movieElement);
  });
}

moviesContainer.addEventListener("click", async function (e) {
  const movieElement = await e.target.closest(".movie"); // .movie를 div로 설정해서 크게 애 먹었다.
  container.classList.add("no-hover");
  if (await movieElement) {
    const movieId = await movieElement.getAttribute("movie-id");
    console.log(movieId);
    const modal_Data = await fetchMovieDetailsData(movieId);
    make_Modal(modal_Data);
  } else {
    console.log("movie-id is null or undefined");
  }
  setTimeout(() => {
    container.classList.remove("no-hover"); // 다시 활성화
  }, 5000);
});

async function fetchMovieDetailsData(movie_id) {
  const urlEn = `https://api.themoviedb.org/3/movie/${movie_id}?language=en-US`;
  const res = await fetch(urlEn, options);
  const data = await res.json();
  console.log(data);
  return data;
}

const make_Modal = (data) => {
  modal.innerHTML = "";
  popElement.classList.add("modal_popup");

  const genreList = data.genres;
  const genre = genreList.map((gdata) => gdata.name).join(",");

  popElement.innerHTML = `
  <div class="popup-content">
    <div class ="popup-img">
      <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="${data.title}">
    </div>
    <div class="popup-details"> 
      <h2 class="popup-title">${data.title} <span class="rating":>⭐ ${data.vote_average}</span> </h2>
      <ul class="mov_info1">
        <li><span class="roboto">${data.release_date}</span>  |</li>
        <li><span class="time"><span class="icon_clock_black"></span><span class="roboto">${data.runtime}</span>min |</span></li>
        <li><span class="grade_txt gr_15">  ${genre}</span> </li>
      </ul>
      <p class="popup-overview">${data.overview}</p>
      <button type="button" class ="close_btn">Close</button>
    </div>
  </div>
`;
  modal.appendChild(popElement);

  modal.style.display = "block";
  popElement.style.display = "block";
  const closeBtn = document.querySelector(".close_btn");
  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
    popElement.style.display = "none";
    modal.innerHTML = "";
  });
};
function reloadMain(btn) {
  btn.addEventListener("click", function () {
    window.location.href = "/";
  });
}

reloadMain(popCorn);
reloadMain(siteName);

const searchBar = document.querySelector("#searchBar");

searchBar.addEventListener("keyup", async function (e) {
  const keyword = await searchBar.value.trim().toLowerCase();

  if (keyword.length > 0 && e.key) {
    const filteredMovie = movieAllData.filter(function (movie) {
      return movie.title.trim().toLowerCase().includes(keyword);
    });
    renderMovies(filteredMovie);
  }
});
