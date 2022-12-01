import { Component } from '@angular/core';
import { IconsService } from './services/icons.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private iconsService: IconsService) {
    this.iconsService.setSvgIcon(
      'article-icon',
      'assets/images/single-post/Files.svg'
    );
    this.iconsService.setSvgIcon(
      'calendar-icon',
      'assets/images/single-post/Calendar.svg'
    );
    this.iconsService.setSvgIcon(
      'clock-icon',
      'assets/images/single-post/Clock.svg'
    );
    this.iconsService.setSvgIcon(
      'facebook-icon',
      'assets/images/contacts/Facebook.svg'
    );
    this.iconsService.setSvgIcon(
      'twitter-icon',
      'assets/images/contacts/Twitter.svg'
    );
    this.iconsService.setSvgIcon(
      'linked-in-icon',
      'assets/images/contacts/Linked-In.svg'
    );
    this.iconsService.setSvgIcon(
      'mic-icon',
      'assets/images/single-post/our-blog/mic.svg'
    );
    this.iconsService.setSvgIcon(
      'video-icon',
      'assets/images/single-post/Play.svg'
    );
    this.iconsService.setSvgIcon('right-icon', 'assets/images/Right.svg');
    this.iconsService.setSvgIcon('search-icon', 'assets/images/search.svg');
    this.iconsService.setSvgIcon(
      'youtube-icon',
      'assets/images/contacts/YouTube.svg'
    );
    this.iconsService.setSvgIcon(
      'telegram-icon',
      'assets/images/contacts/telegram.svg'
    );
    this.iconsService.setSvgIcon(
      'instagram-icon',
      'assets/images/contacts/Instagram.svg'
    );
    this.iconsService.setSvgIcon(
      'google-icon',
      'assets/images/sign-in/Google.svg'
    );
  }
  title = 'createx';
}
