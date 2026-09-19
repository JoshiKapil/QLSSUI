import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({ selector: 'app-main-layout', templateUrl: './main-layout.component.html', styleUrls: ['./main-layout.component.scss'] })
export class MainLayoutComponent {
  constructor(private readonly router: Router) {}
  get isApplicationPage(): boolean {
    return this.isWorkspace || /^\/(admin|assessment\/admin|ghar-9001\/admin)(\/|$)/.test(this.router.url.split(/[?#]/)[0]);
  }
  get isWorkspace(): boolean {
    const path = this.router.url.split(/[?#]/)[0];
    return /^\/(workspace|zeiss)(\/|$)/.test(path) || (/^\/onboarding(\/|$)/.test(path) && path !== '/onboarding/access-request');
  }
}
