import {html, customElement} from 'lit-element';
import {CustomElement} from '../../../../custom-element';

/**
 * EWP Home Page
 *
 */
@customElement('ewp-prof-exams-page')
export class EwpProfExamsPage extends CustomElement {
  render() {
    return html`<div class=${this
      .tw`container p-4`}><intl-message label="Hello there"></intl-message>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ewp-prof-exams-page': EwpProfExamsPage;
  }
}
