import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';
import axios from 'axios';

const formEl = document.querySelector('#search-form');
// const inputEl = document.querySelector('input');
const btnEl = document.querySelector('button');
const galleryEl = document.querySelector('.gallery');

formEl.addEventListener('submit', onSearch);

function onSearch(event) {
  event.preventDefault();
  const inputEl = event.target.elements.searchQuery.value;

  axios
    .get(
      `https://pixabay.com/api/?key=29860277-84021bf85cd78542af410165f&q=${inputEl}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`
    )
    .then(response => response.data)
    .then(data => {
      console.log(data);
      const cardMarkup = data.hits
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
            <a href="${largeImageURL}">
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
    })
    .catch(error => console.log(error));
}

const galerySimple = new SimpleLightbox('.photo-card', {
  captionDelay: 250,
});
// galerySimple.refresh();
