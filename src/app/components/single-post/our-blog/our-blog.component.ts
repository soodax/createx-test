import { Component, OnInit } from '@angular/core';
import { recommendArray } from 'src/app/data/store';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-our-blog',
  templateUrl: './our-blog.component.html',
  styleUrls: ['./our-blog.component.scss']
})
export class OurBlogComponent implements OnInit {

  recommendArray = recommendArray

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
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

  ngOnInit(): void {
  }

}
