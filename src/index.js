import Notiflix from 'notiflix';

import { refs } from "./js/constants";
import { RequestAPI } from './js/fetchcreate';
import { renderPhotoGallery } from './js/template';
// import { reloadBtn } from './js/reloadbtn';// for load more button
import { onWindowScroll } from './js/windowscroll';
import { onWindowScrollreload } from './js/windowscrollreload';// for load scroll
export const requestAPI = new RequestAPI();

refs.reloadBtn.style.display = "none";

refs.formEl.addEventListener("submit", onSearchBtnSubmit);

function onSearchBtnSubmit(e) {
  e.preventDefault();
  refs.photoGallery.innerHTML = "";
  if (refs.photoGallery.classList.contains("is-block")) {
    refs.photoGallery.classList.remove("is-block");
  };
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
    };
  }).catch(error => console.log(error));
};