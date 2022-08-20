import simpleLightbox from "simplelightbox";

import "simplelightbox/dist/simple-lightbox.min.css";

export const photoGallery = document.querySelector(".gallery");
export let gallery = new SimpleLightbox(".gallery a");
export function renderPhotoGallery(hits) {
    const newGallery = hits.map(hit => `<div class="photo-card">
  <a href="${hit.largeImageURL}"><img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes ${hit.likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${hit.views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${hit.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${hit.downloads}</b>
    </p>
  </div>
</div>`).join(" ");
  photoGallery.insertAdjacentHTML("beforeend", `${newGallery}`);
  gallery.refresh();
};