import axios from 'axios';
import Notiflix from 'notiflix';
// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";

const API_KEY = '29243561-87a2e79440d45d601d88db8bd';
let page = 1;

const formEl = document.querySelector("#search-form");
const photoGallery = document.querySelector("div.gallery");
let reloadBtn = document.querySelector(".load-more");
reloadBtn.style.display = "none";

formEl.addEventListener("submit", onSearchBtnSubmit);
function onSearchBtnSubmit(e) {
photoGallery.innerHTML = "";
e.preventDefault();
const form = e.target;
const query = form.elements.searchQuery.value.trim();
const queryURL = query.split(" ").join("+");
const baseURL = `https://pixabay.com/api/?key=${API_KEY}&q=${queryURL}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`;

    axios.get(`${baseURL}&page=${page}`).then(res => {
    if (res.data.totalHits > 0) {
        renderPhotoGallery(res.data);
        reloadBtn.style.display = "block";
    }
else
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
});
    reloadBtn.addEventListener("click", onreloadPageBtn);
function onreloadPageBtn(e) {
    page += 1;

    console.log(`${baseURL}&page=${page}`);
    axios.get(`${baseURL}&page=${page}`).then(res => {
    if (res.data.hits.length > 0) {
        renderPhotoGallery(res.data);
    }
else
        reloadBtn.style.display = "none";
        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
});
}
// fetchCreate({}).then(q => {
    //     if (q.totalHits > 0) {
    //         renderPhotoGallery(q);
    //         reloadBtn.style.display = "block";
    //     } else {
    //         Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    //     }
    // })
        // .catch(error => {
        //     console.log(error);
    // });
}
// async function fetchCreate() {
//     const promise = await fetch(URL);
//     return await promise.json();
// }

async function renderPhotoGallery(data) {
    const photos = await data.hits;
    const newGallery = photos.map(photo => `<div class="photo-card">
  <img src="${photo.largeImageURL}" alt="${photo.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes ${photo.likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${photo.views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${photo.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${photo.downloads}</b>
    </p>
  </div>
</div>`).join(" ");
    photoGallery.insertAdjacentHTML("beforeend", `${newGallery}`);
}
// const searchBtn = document.querySelector("#search-form button");
// console.log(searchBtn);
// searchBtn.textContent = "";
// const svgEl = `<svg class="search-svg" width="16px" height="16px">
// <use style="all:inherit" href="images/icons.svg#search-1"></use></svg>`;
// searchBtn.insertAdjacentHTML("beforeend", `${svgEl}`);

