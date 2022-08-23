import { refs, BASE_URL, encodeURIComponent } from './constants';
import getPromise from './getpromise';

export class RequestAPI {
constructor() {
    this.searchQueryURL = "";
    this.page = 1;
}

fetchArticle() {
    let URL = `${BASE_URL}&q=${this.searchQueryURL}&${encodeURIComponent}&per_page=${refs.PER_PAGE}&page=${this.page}`;
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