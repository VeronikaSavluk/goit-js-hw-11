import { photoGallery } from "./template";

export function onWindowsScroll() {
  let { height: cardHeight } = photoGallery.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
  });
};
window.addEventListener("scroll", onWindowsScroll);