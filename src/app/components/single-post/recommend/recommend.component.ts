import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MediaCardService } from 'src/app/services/media-card.service';

@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.scss'],
})
export class RecommendComponent implements OnInit {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private mediaCardService: MediaCardService
  ) {
    this.matIconRegistry.addSvgIcon(
      'calendar-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/images/single-post/Calendar.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'clock-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/images/single-post/Clock.svg'
      )
    );
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
      'right-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/images/Right.svg'
      )
    );
  }

  mediaCardArray = this.mediaCardService.getMediaCardData();

  scrollTop() {
    window.scrollTo(0, 0);
  }

  ngOnInit(): void {}
}
