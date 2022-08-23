import Notiflix from 'notiflix';
import throttle from 'lodash.throttle';

import { refs } from "./constants";
import { requestAPI } from '../index';
import { renderPhotoGallery } from "./template";

export function onWindowScrollreload(e) {
    if (!refs.photoGallery.classList.toggle("is-block") && window.scrollY + window.innerHeight >=
        refs.photoGallery.scrollHeight) {
      requestAPI.fetchArticle().then(({ hits }) => {
        if (hits.length > 0) {
          renderPhotoGallery(hits);
          if (hits.length < refs.PER_PAGE) {
            refs.photoGallery.classList.toggle("is-block");
            Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
          };
        }
      });
    };
    };
window.addEventListener("scroll", throttle(onWindowScrollreload, 1000));