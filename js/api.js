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

// 메인페이지 api 통신, 영화 데이터 가져오기
async function fetchMainpage(url, options) {
  try {
    const res = await fetch(url, options);
    const data = await res.json();
    return data.results;
  } catch(error) {
    console.error("메인페이지 데이터를 가져오는중 오류 발생:", error);
    return [];
  }
}

// 모달을 위한 Api 통신
async function fetchMovieDetailsData(movie_id) {
  const urlEn = `https://api.themoviedb.org/3/movie/${movie_id}?language=en-US`;
  try {
    const res = await fetch(urlEn, options);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("영화 상세 데이터를 가져오는 중 오류 발생:", error);
    return null;
  }
}

export { main_Url, options, fetchMainpage, fetchMovieDetailsData };
