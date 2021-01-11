require('dotenv').config();

import './Views/App';
import './Views/Components/Header';

import './Views/Pages/Home';
import './Views/Pages/professor/Exams';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js');
  });
}
