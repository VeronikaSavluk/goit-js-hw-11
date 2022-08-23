import Notiflix from 'notiflix';

import { refs } from "./js/constants";
import { RequestAPI } from './js/fetchcreate';
import { renderPhotoGallery } from './js/template';
import { reloadBtn } from './js/reloadbtn';// for load more button
// import { onWindowScroll } from './js/windowscroll';

export const requestAPI = new RequestAPI();

refs.reloadBtn.style.display = "none";

refs.formEl.addEventListener("submit", onSearchBtnSubmit);

function onSearchBtnSubmit(e) {
  e.preventDefault();
  refs.photoGallery.innerHTML = "";

  requestAPI.queryURL = e.target.elements.searchQuery.value.trim().split(" ").join("+");
  requestAPI.resetPage();
  requestAPI.fetchArticle().then(({ hits, totalHits }) => {
    // ==========for reloadBtn===============
    // if (totalHits > refs.PER_PAGE) {
    //   refs.reloadBtn.style.display = "block";
    // };
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

