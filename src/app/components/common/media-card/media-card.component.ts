import { Component, Input, OnInit } from '@angular/core';
import { IRecommendArray } from 'src/app/data/types';

@Component({
  selector: 'app-media-card',
  templateUrl: './media-card.component.html',
  styleUrls: ['./media-card.component.scss'],
})
export class MediaCardComponent implements OnInit {
  @Input() mediaCardData: IRecommendArray;

  constructor() {}

  ngOnInit(): void {}
}
