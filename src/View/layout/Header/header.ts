import {html, customElement, property} from 'lit-element';
import i18next from '../../../i18n';

import {CustomElement} from '../../../custom-element';

/**
 * EWP Header element
 *
 */
@customElement('ewp-header')
export class EwpHeader extends CustomElement {
  @property({type: Boolean})
  isLoggedIn = !!localStorage.getItem('auth');

  _handleLogin() {
    // window.location.href =
    //   'https://sso.hua.gr/login?locale=el&service=https://localhost:8000/login';
    this.isLoggedIn = true;
    localStorage.setItem('auth', 'true');
    history.replaceState(undefined, '', 'prof/exams');
  }

  _handleLogout() {
    this.isLoggedIn = false;
    localStorage.removeItem('auth');
    history.replaceState(undefined, '', 'home');
  }

  _handleLocaleChange(locale: string) {
    i18next.changeLanguage(locale);
    localStorage.setItem('locale', locale);
    this.requestUpdate();
  }

  render() {
    return html`<header class=${this.tw`flex flex-wrap`}>
      <div class=${this.tw`w-full`}>
        <nav
          class=${this
            .tw`relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-blue-500`}
        >
          <div
            class=${this
              .tw`container px-4 mx-auto flex flex-wrap items-center justify-between`}
          >
            <div
              class=${this
                .tw`w-full relative flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start`}
            >
              <a
                class=${this
                  .tw`text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-white`}
                href="/"
              >
                <fa-icon
                  class="fas fa-university"
                  path-prefix="../node_modules"
                ></fa-icon>
                Exams Web Platform
              </a>
              <button
                class=${this
                  .tw`cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none`}
                type="button"
              >
                <span
                  class=${this.tw`block relative w-6 h-px rounded-sm bg-white`}
                ></span>
                <span
                  class=${this
                    .tw`block relative w-6 h-px rounded-sm bg-white mt-1`}
                ></span>
                <span
                  class=${this
                    .tw`block relative w-6 h-px rounded-sm bg-white mt-1`}
                ></span>
              </button>
            </div>
            <div
              class=${this.tw`flex lg:flex-grow items-center`}
              id="example-navbar-info"
            >
              <ul class=${this.tw`flex flex-col lg:flex-row list-none ml-auto`}>
                ${this.isLoggedIn
                  ? html` <li class=${this.tw`nav-item`}>
                        <a
                          class=${this
                            .tw`px-3 py-1 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75`}
                          href="/prof/exams"
                        >
                          <intl-message label="Exams"></intl-message>
                        </a>
                      </li>
                      <li class=${this.tw`nav-item`}>
                        <button
                          @click="${this._handleLogout}"
                          class=${this
                            .tw`text-white background-transparent flex font-bold items-center leading-snug uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 hover:opacity-75`}
                        >
                          <intl-message label="Logout"></intl-message>
                        </button>
                      </li>`
                  : null}
                ${!this.isLoggedIn
                  ? html`
                      <li class=${this.tw`nav-item`}>
                        <button
                          @click="${this._handleLogin}"
                          class=${this
                            .tw`text-white background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:opacity-75`}
                        >
                          <intl-message label="Login"></intl-message>
                        </button>
                      </li>
                    `
                  : null}
              </ul>
              <ul class=${this.tw`flex flex-col lg:flex-row list-none ml-20`}>
                ${i18next.language === 'en'
                  ? html`<li class=${this.tw`nav-item`}>
                      <button
                        @click=${() => this._handleLocaleChange('el')}
                        class=${this
                          .tw`text-white background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:opacity-75`}
                      >
                        Ελληνικα
                      </button>
                    </li>`
                  : null}
                ${i18next.language === 'el'
                  ? html`<li class=${this.tw`nav-item`}>
                      <button
                        @click=${() => this._handleLocaleChange('en')}
                        class=${this
                          .tw`text-white background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:opacity-75`}
                      >
                        English
                      </button>
                    </li>`
                  : null}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ewp-header': EwpHeader;
  }
}
