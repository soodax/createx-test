import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class IconsService {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {}

  // getIcons() {
  //   this.matIconRegistry.addSvgIcon(
  //     'article-icon',
  //     this.domSanitizer.bypassSecurityTrustResourceUrl(
  //       'assets/images/single-post/Files.svg'
  //     )
  //   );
  // }
}
