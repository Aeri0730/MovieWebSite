const modal = document.querySelector(".modal");
const popElement = document.createElement("div");

// 모달 만드는 함수
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

export { make_Modal };
