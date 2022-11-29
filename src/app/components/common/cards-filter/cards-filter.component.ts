import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-cards-filter',
  templateUrl: './cards-filter.component.html',
  styleUrls: ['./cards-filter.component.scss'],
})
export class CardsFilterComponent implements OnInit {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'article-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/images/single-post/Files.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'video-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/images/single-post/Play.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'mic-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/images/single-post/our-blog/mic.svg'
      )
    );
  }

  ngOnInit(): void {}

  useFilter(value: string) {}
}
