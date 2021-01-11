import { CustomComponent } from '../../../../Utils/CustomComponent';

import template from './template.html';

export class ProfessorExamsPage extends CustomComponent {
  constructor() {
    super(template);
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

customElements.define('ewp-professor-exams-page', ProfessorExamsPage);
