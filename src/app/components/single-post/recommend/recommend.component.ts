import { Component, OnInit } from '@angular/core';
import { MediaCardService } from 'src/app/services/media-card.service';

@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.scss'],
})
export class RecommendComponent implements OnInit {
  constructor(private mediaCardService: MediaCardService) {}

  mediaCardArray = this.mediaCardService.getMediaCardData();

  scrollTop() {
    window.scrollTo(0, 0);
  }

  ngOnInit(): void {}
}
