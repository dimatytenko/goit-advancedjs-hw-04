import axios from 'axios';

const API_KEY = '24005703-1514437038890a8f3813970a7';
const BASE_URL = 'https://pixabay.com/api';

export default class PixabayApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 40;
    this.totalHits = 0;
  }
  async fetchPhotos() {
    const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&safesearch=true&q=${this.searchQuery}&page=${this.page}&per_page=${this.perPage}&key=${API_KEY}`;

    try {
      const { data } = await axios.get(url);
      this.totalHits = data.totalHits;
      this.incrementPage();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }

  getPage() {
    return this.page;
  }

  getEndPage() {
    return Math.ceil(this.totalHits / this.perPage) < this.page;
  }
}
