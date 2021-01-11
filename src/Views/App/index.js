import { Router } from '@vaadin/router';

import { CustomComponent } from '../../Utils/CustomComponent';

import template from './template.html';

export class App extends CustomComponent {
  constructor() {
    super(template);
  }

  connectedCallback() {
    super.connectedCallback();
    const outlet = document.querySelector('#outlet');
    const router = new Router(outlet);
    router.setRoutes([
      { path: '/', component: 'ewp-home-page' },
      { path: '/prof/exams', component: 'ewp-professor-exams-page' },
    ]);
  }
}

customElements.define('ewp-app', App);
