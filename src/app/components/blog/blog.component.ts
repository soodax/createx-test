import { Component, OnInit } from '@angular/core';
import { MediaCardService } from 'src/app/services/media-card.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { IRecommendArray } from 'src/app/data/types';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  constructor(
    private mediaCardsService: MediaCardService,
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
      'mic-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/images/single-post/our-blog/mic.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'video-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/images/single-post/Play.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'right-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/images/Right.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'calendar-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/images/single-post/Calendar.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'lock-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/images/single-post/Clock.svg'
      )
    );
  }

  mediaCardsArray = this.mediaCardsService.getBlogData();

  ngOnInit(): void {}
}
