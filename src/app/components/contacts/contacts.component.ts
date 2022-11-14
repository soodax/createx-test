import { Component, Input, OnInit } from "@angular/core";
import { socialsArray, contactsArray } from '../../data/store'

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

  ngOnInit() {
    ymaps.ready().then(() => {
        this.map = new ymaps.Map('map', {
          center: [55.4424, 37.3656],
          zoom: 12
        });
      });      
  }

}