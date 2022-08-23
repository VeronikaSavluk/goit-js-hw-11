import Notiflix from 'notiflix';
import throttle from 'lodash.throttle';

import { refs } from "./constants";
import { requestAPI } from '../index';
import { renderPhotoGallery } from "./template";

export function onWindowScrollreload(e) {
    if (!refs.photoGallery.classList.toggle("is-block") && window.scrollY + window.innerHeight >=
        refs.photoGallery.scrollHeight) {
      requestAPI.fetchArticle().then(({ hits }) => {
        if (hits.length < refs.PER_PAGE) {
          Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
          refs.photoGallery.classList.toggle("is-block");
        };
        renderPhotoGallery(hits);
      });
    };
    };
window.addEventListener("scroll", throttle(onWindowScrollreload, 500));