import i18next from 'i18next';
import 'i18next-wc';

import {defaultEn} from './Locales/en/default';
import {defaultEl} from './Locales/el/default';

declare global {
  interface Window {
    i18next: any;
  }
}

window.i18next = i18next;

i18next.init({
  lng: localStorage.getItem('locale') || 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      default: defaultEn,
    },
    el: {
      default: defaultEl,
    },
  },
  defaultNS: 'default',
  fallbackNS: 'global',
});

export default i18next;
