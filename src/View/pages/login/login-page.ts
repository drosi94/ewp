import {html, customElement} from 'lit-element';
import {CustomElement} from '../../../custom-element';

/**
 * EWP Home Page
 *
 */
@customElement('ewp-login-page')
export class EwpLoginPage extends CustomElement {
  async connectedCallback() {
    super.connectedCallback();
    const urlParams = new URLSearchParams(window.location.search);
    const ticket = urlParams.get('ticket');

    try {
      const response = await fetch('https://localhost:8080/api/validate', {
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          service: 'https://localhost:8000/login',
          ticket: ticket,
        }),
      });
    } catch (err) {
      console.log('not authenticated');
    }
  }

  render() {
    return html``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ewp-login-page': EwpLoginPage;
  }
}
