import { Component, OnInit } from '@angular/core';
import { socialsArray } from 'src/app/data/store';
import { TagsService } from 'src/app/services/tags.service';

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

  constructor(private tagsService: TagsService) {
    this.tagsArray = this.tagsService
      .getTags()
      .filter(
        (el) => el === '#learning' || el === '#HR' || el === '#self-development'
      );
  }

  ngOnInit(): void {}
}
