import Notiflix from "notiflix";
import { requestAPI } from "../index";
import { refs } from "./constants";
import { renderPhotoGallery } from "./template";
import { onWindowScroll } from "./windowscroll";

refs.reloadBtn.style.display = "none";
refs.reloadBtn.addEventListener("click", onreloadPageBtn);
export function onreloadPageBtn(e) {
  requestAPI.fetchArticle().then(({ hits }) => {
    console.log(hits);
      if (hits.length < refs.PER_PAGE) {
      Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
      refs.reloadBtn.style.display = "none";
    };
    renderPhotoGallery(hits);
    onWindowsScroll();
  }).catch(error => console.log(error));
}
