import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';

const formEl = document.querySelector('#search-form');
const btnEl = document.querySelector('.load-more');
const btnTop = document.querySelector('.btn-top');
const galleryEl = document.querySelector('.gallery');
let page;
let query;

const galerySimple = new SimpleLightbox('.photo-card', {
  captionsData: 'alt',
  overlayOpacity: 0.8,
  showCounter: false,
  widthRatio: 0.6,
  captionDelay: 250,
});

formEl.addEventListener('submit', onSearch);
btnEl.addEventListener('click', onSerchLoadMore);

function onSearch(event) {
  event.preventDefault();
  page = 1;
  query = event.target.elements.searchQuery.value;
  galleryEl.innerHTML = '';
  if (!query) {
    btnEl.classList.add('is-hidden');
    btnTop.classList.add('is-hidden');
    return Notify.failure(
      'Sorry, your query is empty, please, make your choice'
    );
  }

  axios
    .get(
      `https://pixabay.com/api/?key=29860277-84021bf85cd78542af410165f&q=${query}&page=1&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`
    )
    .then(response => {
      console.log(response.data);
      return response.data;
    })
    .then(({ hits, totalHits }) => {
      if (hits.length === 0) {
        formEl.reset();
        return Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      formEl.reset();
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

      if (totalHits > 40) {
        btnEl.classList.remove('is-hidden');
        btnTop.classList.remove('is-hidden');
      }
    })
    .catch(error => console.log(error));
}

function onSerchLoadMore(event) {
  page += 1;
  axios
    .get(
      `https://pixabay.com/api/?key=29860277-84021bf85cd78542af410165f&q=${query}&page=${page}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`
    )
    .then(response => {
      console.log(response.data);
      return response.data;
    })
    .then(({ hits, totalHits }) => {
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

      galleryEl.insertAdjacentHTML('beforeend', cardMarkup);
      galerySimple.refresh();

      if (Math.ceil(totalHits / 40)) {
        btnEl.classList.remove('is-hidden');
        btnTop.classList.remove('is-hidden');
      }
    })
    .catch(error => console.log(error));
}
