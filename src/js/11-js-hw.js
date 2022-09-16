import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';

const formEl = document.querySelector('#search-form');
// const inputEl = document.querySelector('input');
const btnEl = document.querySelector('button');
const galleryEl = document.querySelector('.gallery');

const galerySimple = new SimpleLightbox('.photo-card', {
  captionsData: 'alt',
  overlayOpacity: 0.8,
  showCounter: false,
  widthRatio: 0.6,
  captionDelay: 250,
});

formEl.addEventListener('submit', onSearch);

function onSearch(event) {
  event.preventDefault();
  const inputEl = event.target.elements.searchQuery.value;
  if (!inputEl) {
    return Notify.failure(
      'Sorry, your query is empty, please, make your choice'
    );
  }
  axios
    .get(
      `https://pixabay.com/api/?key=29860277-84021bf85cd78542af410165f&q=${inputEl}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`
    )
    .then(response => response.data)
    .then(({ hits }) => {
      if (hits.length === 0) {
        formEl.reset();
        return Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      const cardMarkup = hits
        .map(
          ({
            webformatURL,
            largeImageURL,
            tags,
            likes,
            views,
            comments,
            downloads,
          }) => {
            formEl.reset();
            return `<div class="photo-card">
            <a class="photo-card__link" href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
            <div class="info">
              <p class="info-item">
                <b>Likes</b> ${likes}
              </p>
              <p class="info-item">
                <b>Views</b> ${views}
              </p>
              <p class="info-item">
                <b>Comments</b> ${comments}
              </p>
              <p class="info-item">
                <b>Downloads</b> ${downloads}
              </p>
            </div>
            
          </div>`;
          }
        )
        .join('');
      galleryEl.insertAdjacentHTML('afterbegin', cardMarkup);
      galerySimple.refresh();
    })
    .catch(error => console.log(error));
}
