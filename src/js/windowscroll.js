import Notiflix from 'notiflix';

import { refs } from "./constants";
import { requestAPI, fetchArticle } from '../index';
// import { RequestAPI, fetchArticle } from './fetchcreate';
import { renderPhotoGallery } from "./template";

export function onWindowScroll(e) {
  let { height: cardHeight } = refs.photoGallery.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
  });
//  ======== only without reloadbutton==========
  console.log(data.hits.length);
    if(window.scrollY + window.innerHeight >=
      refs.photoGallery.scrollHeight
      // && data - scroll
    ) {
    requestAPI.fetchArticle().then(({ hits }) => {
      if (hits.length < refs.PER_PAGE) {
        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
        refs.photoGallery.classList.add("scroll--stop");
      };
      renderPhotoGallery(hits);
    });
  };
};
window.addEventListener("scroll", onWindowScroll);