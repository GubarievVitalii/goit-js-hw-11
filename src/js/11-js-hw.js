import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';
import axios from 'axios';

const formEl = document.querySelector('#search-form');
// const inputEl = document.querySelector('input');
const btnEl = document.querySelector('button');
const gallery = document.querySelector('.gallery');

formEl.addEventListener('submit', onSearch);

function onSearch(event) {
  event.preventDefault();
  const inputEl = event.target.elements.searchQuery.value;

  axios
    .get(
      `https://pixabay.com/api/?key=29860277-84021bf85cd78542af410165f&q=${inputEl}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`
    )
    .then(function (response) {
      gallery.innerHTML = (
        <div class="photo-card">
          <img src="" alt="" loading="lazy" />
          <div class="info">
            <p class="info-item">
              <b>Likes</b>
            </p>
            <p class="info-item">
              <b>Views</b>
            </p>
            <p class="info-item">
              <b>Comments</b>
            </p>
            <p class="info-item">
              <b>Downloads</b>
            </p>
          </div>
        </div>
      );

      // обробка успішного запиту
      console.log(response);
    })
    .catch(function (error) {
      Notiflix.Notify.failure(error);
      // обробка помилки
      console.log(error);
    })
    .then(function () {
      // виконується завжди
    });

  //   fetch(
  //     `https://pixabay.com/api/?key=29860277-84021bf85cd78542af410165f&q=${inputEl}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`
  //   ).then(response => {
  //     console.log(response.json());
  //   });
}
// console.log(onSearch);

// const { height: cardHeight } = document
//   .querySelector('.gallery')
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: 'smooth',
// });
