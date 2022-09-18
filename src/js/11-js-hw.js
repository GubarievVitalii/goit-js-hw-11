import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import requestAxios from './axios';
import createCardMarkup from './createCardMarkup';

const formEl = document.querySelector('#search-form');
const btnEl = document.querySelector('.load-more');
const btnTop = document.querySelector('.btn-top');
const galleryEl = document.querySelector('.gallery');
const perPage = 40;
let page;
let query;

const galerySimple = new SimpleLightbox('.photo-card__link', {
  captionsData: 'alt',
  overlayOpacity: 0.8,
  showCounter: false,
  widthRatio: 0.6,
  captionDelay: 250,
});

formEl.addEventListener('submit', onSearch);
btnEl.addEventListener('click', onSerchLoadMore);

async function onSearch(event) {
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

  try {
    const data = await requestAxios(query, page, perPage);
    const { hits, totalHits } = data;
    if (hits.length === 0) {
      formEl.reset();
      return Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    formEl.reset();

    const cardMarkup = createCardMarkup(hits);

    galleryEl.insertAdjacentHTML('afterbegin', cardMarkup);
    galerySimple.refresh();

    if (totalHits > perPage) {
      btnEl.classList.remove('is-hidden');
      btnTop.classList.remove('is-hidden');
    }
  } catch (error) {
    console.log(error);
  }
}

async function onSerchLoadMore(event) {
  page += 1;
  try {
    const data = await requestAxios(query, page, perPage);
    const { hits, totalHits } = data;
    const cardMarkup = createCardMarkup(hits);

    galleryEl.insertAdjacentHTML('beforeend', cardMarkup);
    galerySimple.refresh();

    if (Math.ceil(totalHits / perPage) === page) {
      btnEl.classList.add('is-hidden');
      Notify.failure(
        `We're sorry, but you've reached the end of search results.`
      );
    }
  } catch (error) {
    console.log(error);
  }
}
