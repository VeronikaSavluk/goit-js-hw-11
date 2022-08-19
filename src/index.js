import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";

import "simplelightbox/dist/simple-lightbox.min.css";

import RequestAPI from './js/fetchcreate';
import { photoGallery, renderPhotoGallery } from './js/template';

const requestAPI = new RequestAPI();
const formEl = document.querySelector("#search-form");
const reloadBtn = document.querySelector(".load-more");
reloadBtn.style.display = "none";

formEl.addEventListener("submit", onSearchBtnSubmit);
reloadBtn.addEventListener("click", onreloadPageBtn);


function onSearchBtnSubmit(e) {
  e.preventDefault();
  photoGallery.innerHTML = "";

  requestAPI.queryURL = e.target.elements.searchQuery.value.trim().split(" ").join("+");
  requestAPI.resetPage();
  requestAPI.fetchArticle().then(data => {
    if (data.hits.length > 0 && requestAPI.queryURL !== "") {
      Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);

      renderPhotoGallery(data.hits);
      reloadBtn.style.display = "block";
      }
      else {
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      }
  });
}

function onreloadPageBtn(e) {
  requestAPI.fetchArticle().then(data => {
    renderPhotoGallery(data.hits);
    }).catch(error => {
      Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
      reloadBtn.style.display = "none";
    });

}

// // const searchBtn = document.querySelector("#search-form button");
// // console.log(searchBtn);
// // searchBtn.textContent = "";
// // const svgEl = `<svg class="search-svg" width="16px" height="16px">
// // <use style="all:inherit" href="images/icons.svg#search-1"></use></svg>`;
// // searchBtn.insertAdjacentHTML("beforeend", `${svgEl}`);

