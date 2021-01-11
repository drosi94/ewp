import { CustomComponent } from '../../../Utils';

import template from './template.html';

const tagName = 'ewp-header';

export class Header extends CustomComponent {
  isLoggedIn = !!localStorage.getItem('auth');
  loginItem = undefined;
  logoutItem = undefined;

  constructor() {
    super(template);
  }

  connectedCallback() {
    super.connectedCallback();
    this.loginItem = document.querySelector('#login-item');
    this.logoutItem = document.querySelector('#logout-item');

    this._updateAuthProtectedItems();

    this.loginItem.addEventListener('click', () => {
      localStorage.setItem('auth', 'true');
      this.isLoggedIn = true;
      this._updateAuthProtectedItems();
    });

    this.logoutItem.addEventListener('click', () => {
      localStorage.removeItem('auth');
      this.isLoggedIn = false;
      this._updateAuthProtectedItems();
    });
  }

  _updateAuthProtectedItems() {
    const authProtectedItems = document.querySelectorAll('[data-auth]');
    this.loginItem.classList.remove(this.isLoggedIn ? 'block' : 'hidden');
    this.loginItem.classList.add(this.isLoggedIn ? 'hidden' : 'block');
    this.logoutItem.classList.remove(this.isLoggedIn ? 'hidden' : 'block');
    this.logoutItem.classList.add(this.isLoggedIn ? 'block' : 'hidden');
    authProtectedItems.forEach((item) => {
      item.classList.remove(this.isLoggedIn ? 'hidden' : 'block');
      item.classList.add(this.isLoggedIn ? 'block' : 'hidden');
    });
  }
}

customElements.define(tagName, Header);
