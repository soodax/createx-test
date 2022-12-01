import { Component, OnInit } from '@angular/core';
import { MediaCardService } from 'src/app/services/media-card.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  constructor(private mediaCardsService: MediaCardService) {}

  mediaCardsArray = this.mediaCardsService.getBlogData();

  ngOnInit(): void {}

  scrollTop() {
    window.scrollTo(0, 0);
  }
}
