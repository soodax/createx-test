import { Component } from "@angular/core";
import { socialsArray, contactsArray } from '../../data/store'
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

declare let ymaps:any;

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss']
})

export class ContactsComponent {

  socialsArray = socialsArray
  contactsArray = contactsArray
      
  public map :any;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    for (let i = 0; i < 6; i++) {
      this.matIconRegistry.addSvgIcon(
        `${socialsArray[i].name}-icon`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          socialsArray[i].src
        )
      );  
    }   
  }

  ngOnInit() {
    ymaps.ready().then(() => {
        this.map = new ymaps.Map('map', {
          center: [55.4424, 37.3656],
          zoom: 12
        });
      });      
  }

}