import '@appnest/web-router';
import 'fa-icons';

import './i18n';

import {html, customElement, query, PropertyValues} from 'lit-element';
import {IRoute, RouterSlot} from '@appnest/web-router';
import {CustomElement} from './custom-element';

import './View/layout/Header/header';

import {EwpHomePage} from './View/pages/home/home-page';
import {EwpProfExamsPage} from './View/pages/professor/exams/prof-exams-page';
import { EwpLoginPage } from './View/pages/login/login-page';

function isAuthenticatedGuard() {
  if (localStorage.getItem('auth') == null) {
    history.replaceState(null, '', '/home');
    return false;
  }

  return true;
}

function isNotAuthenticatedGuard() {
  if (localStorage.getItem('auth') != null) {
    history.replaceState(null, '', '/prof/exams');
    return false;
  }

  return true;
}

const ROUTES: IRoute[] = [
  {
    path: 'home',
    component: EwpHomePage,
    guards: [isNotAuthenticatedGuard],
  },
  {
    path: 'login',
    component: EwpLoginPage,
  },
  {
    path: 'prof/exams',
    component: EwpProfExamsPage,
    guards: [isAuthenticatedGuard],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

/**
 * EWP App element
 *
 */
@customElement('ewp-app')
export class EwpApp extends CustomElement {
  @query('router-slot') $routerSlot!: RouterSlot;

  firstUpdated(props: PropertyValues) {
    super.firstUpdated(props);

    this.$routerSlot.add(ROUTES);
  }

  render() {
    return html`
      <ewp-header></ewp-header>
      <main><router-slot></router-slot></main>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ewp-app': EwpApp;
  }
}
