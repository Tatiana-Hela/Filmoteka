import FetchApiMovies from './api';
import { Spinner } from 'spin.js';
import { spinner } from './spinner';
import { refs } from './Properties/refs';
// import { fetchMovieById } from './watched-library';
import {
  target,
  createMoviesCard,
  createMarkupWhenLocalStorageEmpty,
  clearMoviesCard,
} from './watched-library';
import { loadFromLocalStorage, QUEUED_FILM } from './local-storage';

const fetchMovieById = new FetchApiMovies();

refs.queueBtn.addEventListener('click', onQueueLibrary);

let movieIdObj = [];
let movieId;

export async function onQueueLibrary() {
  movieIdObj = [];
  // console.log('click');
  refs.watchedBtn.classList.remove('btn-active');
  refs.queueBtn.classList.add('btn-active');

  try {
    spinner.spin(target);

    const moviesIdArray = loadFromLocalStorage(QUEUED_FILM);

    for (let i = 0; i < moviesIdArray.length; i++) {
      movieId = moviesIdArray[i];
      const byMovie = await fetchMovieById.fetchIdMovies(movieId);

      movieIdObj.push(byMovie);
      // console.log(movieIdObj);
    }
    if (!moviesIdArray || !Object.keys(moviesIdArray).length) {
      refs.containerNothing.innerHTML = '';
      clearMoviesCard();
      const markupNothing = createMarkupWhenLocalStorageEmpty();
      refs.containerNothing.insertAdjacentHTML('beforeend', markupNothing);
    } else {
      clearMoviesCard();
      const markup = createMoviesCard(movieIdObj);
      refs.galleryLibrary.insertAdjacentHTML('beforeend', markup);
    }
  } catch (error) {
    console.log(error.message);
  } finally {
    spinner.stop();
  }
}
