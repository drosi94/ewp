import {html, customElement} from 'lit-element';
import {CustomElement} from '../../../custom-element';

/**
 * EWP Home Page
 *
 */
@customElement('ewp-home-page')
export class EwpHomePage extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
    if (localStorage.getItem('auth')) {
      history.replaceState(undefined, '', 'prof/exams')
    }
  }

  render() {
    return html`<div class=${this.tw`container p-4`}>
      <span>Please authenticate to continue</span>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ewp-home-page': EwpHomePage;
  }
}
