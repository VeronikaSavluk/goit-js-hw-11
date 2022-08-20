import axios from 'axios';

const API_KEY = '29243561-87a2e79440d45d601d88db8bd';
const BASE_URL = `https://pixabay.com/api/?key=${API_KEY}`;
export const PER_PAGE = 40;
const parameters = {
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
    };
const encodeURIComponent = `image_type=${parameters.image_type}&orientation=${parameters.orientation}&safesearch=${parameters.safesearch}`;
async function getPromise(URL) {
  try {
    const response = await axios.get(URL);
    return response;
  } catch (error) {
    console.error(error);
  }
}
export class RequestAPI {
constructor() {
    this.searchQueryURL = "";
    this.page = 1;
}

fetchArticle() {
    const URL = `${BASE_URL}&q=${this.searchQueryURL}&${encodeURIComponent}&per_page=${PER_PAGE}&page=${this.page}`;
    return getPromise(URL).then(response => {
        this.page += 1;
        return response.data;
    });
    }

resetPage() {
    this.page = 1;
}
get queryURL() {
    return this.searchQueryURL;
}
set queryURL(newQueryURL) {
    this.searchQueryURL = newQueryURL;
}
};