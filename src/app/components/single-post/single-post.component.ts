import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { socialsArray } from 'src/app/data/store';
import { TagsService } from 'src/app/services/tags.service';
import { IconsService } from 'src/app/services/icons.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss'],
})
export class SinglePostComponent implements OnInit {
  tagsArray: string[];

  socialsArray = socialsArray.filter(
    (el) =>
      el.name === 'facebook' || el.name === 'twitter' || el.name === 'linked-in'
  );

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private tagsService: TagsService,
    private iconsService: IconsService
  ) {
    this.matIconRegistry.addSvgIcon(
      'article-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/images/single-post/Files.svg'
      )
    );
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
      'facebook-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.socialsArray[0].src)
    );
    this.matIconRegistry.addSvgIcon(
      'twitter-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.socialsArray[1].src)
    );
    this.matIconRegistry.addSvgIcon(
      'linked-in-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.socialsArray[2].src)
    );

    this.tagsArray = tagsService
      .getTags()
      .filter(
        (el) => el === '#learning' || el === '#HR' || el === '#self-development'
      );
  }

  ngOnInit(): void {}
}
