import './js/watched-library';
import './js/queue-library';
import './js/movie-modal-library';
import './js/about-team-modal';
import './js/switch-theme';
import { Spinner } from 'spin.js';
import { spinner } from './js/spinner';
import { btnUp } from './js/button-up';
import { onWatchedLibrary, target } from './js/watched-library';

/// button-up
btnUp.addEventListener();
onWatchedLibrary();
///spinner
spinner.spin(target);
window.addEventListener('load', function (e) {
  spinner.stop();
});
