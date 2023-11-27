import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import PixabayApiService from './js/apiService';
import getRefs from './js/getRefs';

const { cardContainer, searchForm } = getRefs();
import { createGalleryMarkup, getGalleryItemMurkup } from './js/functions';

const pixabayApiService = new PixabayApiService();

searchForm.addEventListener('submit', onSearch);

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function onSearch(event) {
  event.preventDefault();

  const searchQuery = event.target.elements.searchQuery.value;
  pixabayApiService.query = searchQuery;

  if (pixabayApiService.query === '') {
    return;
  }
  pixabayApiService.resetPage();
  clearCardContainer();
  fetchPhotos();
}

async function fetchPhotos() {
  try {
    if (pixabayApiService.getEndPage() && pixabayApiService.getPage() > 1) {
      iziToast.show({
        message: 'Sorry, there are no more images matching your search.',
        color: 'red',
        position: 'topRight',
      });

      return;
    }
    const data = await pixabayApiService.fetchPhotos();
    if (data.hits.length === 0) {
      iziToast.show({
        message:
          'Sorry, there are no images matching your search query. Please try again.',
        color: 'red',
        position: 'topRight',
      });

      return;
    } else {
      const page = pixabayApiService.getPage();
      if (page > 2) {
        iziToast.show({
          message: `Hooray! We found ${data.totalHits} images.`,
          color: 'green',
          position: 'topRight',
        });
      }
      appendPhotosMarkup(data.hits);
      lightbox.refresh();
    }
  } catch (error) {
    console.log(error);
  }
}

function appendPhotosMarkup(photos) {
  cardContainer.insertAdjacentHTML(
    'beforeend',
    createGalleryMarkup(photos, getGalleryItemMurkup)
  );
}

function clearCardContainer() {
  cardContainer.innerHTML = '';
}

// ===================================//

const options = {
  rootMargin: '150px',
};

const callback = entries => {
  entries.forEach(entry => {
    if (pixabayApiService.query !== '' && entry.isIntersecting) {
      fetchPhotos();
    }
  });
};

let observer = new IntersectionObserver(callback, options);

const sentinel = document.getElementById('sentinel');
observer.observe(sentinel);
