import { Component, OnInit } from '@angular/core';
import { SeoService } from './core/services/seo.service';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private seoService: SeoService,
    private themeService: ThemeService,
  ) {}

  ngOnInit(): void {
    this.seoService.init();
  }
}
