import Notiflix from "notiflix";
import { requestAPI } from "../index";
import { PER_PAGE } from "./fetchcreate";
import { renderPhotoGallery } from "./template";
import { onWindowsScroll } from "./windowscroll";

export const reloadBtn = document.querySelector(".load-more");
reloadBtn.style.display = "none";
reloadBtn.addEventListener("click", onreloadPageBtn);
export function onreloadPageBtn(e) {
  requestAPI.fetchArticle().then(({ hits }) => {
      if (hits.length < PER_PAGE) {
      Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
      reloadBtn.style.display = "none";
    };
    renderPhotoGallery(hits);
    onWindowsScroll();
  }).catch(error => console.log(error));
}
