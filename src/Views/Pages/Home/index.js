import { CustomComponent } from '../../../Utils/CustomComponent';

import template from './template.html';

export class HomePage extends CustomComponent {
  isLoggedIn = !!localStorage.getItem('auth');
  constructor() {
    super(template);
  }

  static get properties() {
    return {
      location: Object,
    };
  }

  connectedCallback() {
    super.connectedCallback();
    if (isLoggedIn) {
      this.location.pathname = '/prof/exams';
    }
  }
}

customElements.define('ewp-home-page', HomePage);
