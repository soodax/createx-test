import { Injectable } from '@angular/core';
import { SinglePostComponent } from '../components/single-post/single-post.component';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  tagsArray = [
    '#marketing',
    '#recruiting',
    '#coding',
    '#learning',
    '#HR',
    '#self-development',
  ];

  getTags(): string[] {
    return [...this.tagsArray];
  }

  constructor() {}
}
