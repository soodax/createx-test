import { Component, OnInit } from '@angular/core';
import { socialsArray, trendingArray } from 'src/app/data/store';
import { TagsService } from 'src/app/services/tags.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  socialsArray = socialsArray.filter(
    (el) =>
      el.name === 'instagram' ||
      el.name === 'twitter' ||
      el.name === 'linked-in'
  );

  trendingArray = trendingArray;
  tagsArray: string[];

  constructor(private tagsService: TagsService) {
    this.tagsArray = this.tagsService.getTags();
  }

  ngOnInit(): void {}
}
