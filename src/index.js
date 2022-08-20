import Notiflix from 'notiflix';

import { RequestAPI, PER_PAGE } from './js/fetchcreate';
import { photoGallery, renderPhotoGallery } from './js/template';
import { reloadBtn } from './js/reloadbtn';
import { onWindowsScroll } from './js/windowscroll';

export const requestAPI = new RequestAPI();
const formEl = document.querySelector("#search-form");

formEl.addEventListener("submit", onSearchBtnSubmit);

function onSearchBtnSubmit(e) {
  e.preventDefault();
  photoGallery.innerHTML = "";

  requestAPI.queryURL = e.target.elements.searchQuery.value.trim().split(" ").join("+");
  requestAPI.resetPage();
  requestAPI.fetchArticle().then(({ totalHits, hits }) => {
    if (totalHits > PER_PAGE) {
      reloadBtn.style.display = "block";
    };
    if (hits.length >= 1 && requestAPI.queryURL !== "") {
      Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
      renderPhotoGallery(hits);
      }
    else {
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      }
  }).catch(error => console.log(error));
}


// // const searchBtn = document.querySelector("#search-form button");
// // console.log(searchBtn);
// // searchBtn.textContent = "";
// // const svgEl = `<svg class="search-svg" width="16px" height="16px">
// // <use style="all:inherit" href="images/icons.svg#search-1"></use></svg>`;
// // searchBtn.insertAdjacentHTML("beforeend", `${svgEl}`);

