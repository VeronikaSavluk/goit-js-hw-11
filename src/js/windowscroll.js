import { refs } from "./constants";

export function onWindowScroll(e) {
    let { height: cardHeight } = refs.photoGallery.firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: "smooth",
    });
  };
window.addEventListener("scroll", onWindowScroll);