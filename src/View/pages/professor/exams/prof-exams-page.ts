import {html, customElement, query} from 'lit-element';
import {CustomElement} from '../../../../custom-element';
import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column.js';
import {format} from 'date-fns';
/**
 * EWP Home Page
 *
 */
@customElement('ewp-prof-exams-page')
export class EwpProfExamsPage extends CustomElement {
  dataProvider = (): any[] => {
    return [
      {
        course: 'Mathima 1',
        semester: 'Spring',
        examName: 'Mathima 1',
        startDate: new Date(),
      },
      {
        course: 'Mathima 2',
        semester: 'Spring',
        examName: 'Mathima 2',
        startDate: new Date(),
      },
      {
        course: 'Mathima 3',
        semester: 'Spring',
        examName: 'Mathima 3',
        startDate: new Date(),
      },
    ];
  };

  renderDateColumn(root: any, _: any, rowData: {item: any}) {
    root.textContent = format(new Date(rowData?.item?.startDate), 'dd/MM/yyyy');
  }

  render() {
    return html`<div class=${this.tw`container p-4`}>
      <!-- <intl-message label="Hello there"></intl-message> -->
      <div class="${this.tw`flex flex-col`}">
        <div class="${this.tw`flex-1 flex self-end`}">
          <button
            class="${this
              .tw`bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}"
          >
            <fa-icon
              class="fas fa-plus"
              size="0.8em"
              path-prefix="../node_modules"
            ></fa-icon>
            Create Exam
          </button>
        </div>
        <div class="${this.tw`flex-1`}">
          <vaadin-grid
            theme="row-dividers"
            column-reordering-allowed
            multi-sort
            items="${JSON.stringify(this.dataProvider())}"
          >
            <vaadin-grid-sort-column width="9em" header="Course">
              <template>[[item.course]]</template>
            </vaadin-grid-sort-column>
            <vaadin-grid-sort-column width="9em" header="Exam Name">
              <template>[[item.examName]]</template>
            </vaadin-grid-sort-column>
            <vaadin-grid-sort-column width="9em" header="Semester">
              <template>[[item.semester]]</template>
            </vaadin-grid-sort-column>
            <vaadin-grid-sort-column
              width="9em"
              header="Start Date"
              renderer=${(root: any, _: any, rowData: {item: any}) => {
                root.textContent = format(
                  new Date(rowData?.item?.startDate),
                  'dd/MM/yyyy'
                );
              }}
            >
            </vaadin-grid-sort-column>
          </vaadin-grid>
        </div>
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ewp-prof-exams-page': EwpProfExamsPage;
  }
}
