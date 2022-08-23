export const refs = {
    API_KEY: '29243561-87a2e79440d45d601d88db8bd',
    PER_PAGE: 40,
    parameters: {
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
    },
    photoGallery: document.querySelector(".gallery"),
    formEl: document.querySelector("#search-form"),
    reloadBtn: document.querySelector(".load-more"),
}

export const BASE_URL = `https://pixabay.com/api/?key=${refs.API_KEY}`;
export const encodeURIComponent = `image_type=${refs.parameters.image_type}&orientation=${refs.parameters.orientation}&safesearch=${refs.parameters.safesearch}`;