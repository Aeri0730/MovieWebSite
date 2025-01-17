import { main_Url, options, fetchMainpage, fetchMovieDetailsData } from "./api.js";
import { make_Modal } from "./movieModal.js";

const container = document.querySelector(".container");
const moviesContainer = document.getElementById("movies");
const popCorn = document.querySelector("#popCorn");
const siteName = document.querySelector("#siteName");
const searchBar = document.querySelector("#searchBar");
let movieAllData = [];

// 초기 데이터 로드
(async function loadMovies() {
  movieAllData = await fetchMainpage(main_Url, options);
  renderMovies(movieAllData);
})();

// 영화 데이터 렌더링
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

// 클릭 시 모달 표시
moviesContainer.addEventListener("click", async function (e) {
  const movieElement = e.target.closest(".movie");
  container.classList.add("no-hover");

  if (movieElement) {
    const movieId = movieElement.getAttribute("movie-id");
    const modal_Data = await fetchMovieDetailsData(movieId);
    if (modal_Data) make_Modal(modal_Data);
  } else {
    console.log("movie-id is null or undefined");
  }

  setTimeout(() => {
    container.classList.remove("no-hover");
  }, 5000);
});

// 로고 클릭 시 메인 페이지로 이동
function reloadMain(btn) {
  btn.addEventListener("click", function () {
    window.location.href = "/";
  });
}

reloadMain(popCorn);
reloadMain(siteName);

// 검색 기능
searchBar.addEventListener("keyup", function (e) {
  const keyword = searchBar.value.trim().toLowerCase();

  if (keyword.length > 0) {
    const filteredMovies = movieAllData.filter((movie) =>
      movie.title.trim().toLowerCase().includes(keyword)
    );
    renderMovies(filteredMovies);
  } else {
    renderMovies(movieAllData);
  }
});