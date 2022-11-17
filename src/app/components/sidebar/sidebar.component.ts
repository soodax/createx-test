import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { socialsArray, tagsArray, trendingArray } from 'src/app/data/store';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  socialsArray = socialsArray.filter(el => 
    el.name === 'instagram' || 
    el.name === 'twitter' || 
    el.name === 'linked-in'
  )

  trendingArray = trendingArray
  tagsArray = tagsArray

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
      'search-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/images/search.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'instagram-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        this.socialsArray[0].src
      )
    );
    this.matIconRegistry.addSvgIcon(
      'twitter-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        this.socialsArray[1].src
      )
    );
    this.matIconRegistry.addSvgIcon(
      'linked-in-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        this.socialsArray[2].src
      )
    );
      }

    ngOnInit(): void {}

}
