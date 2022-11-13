import { Component, Input, OnInit } from "@angular/core";

declare let ymaps:any;

interface ISocialsArray {
  name: string
  src: string
  alt: string
}

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss']
})

export class ContactsComponent {

  socialsArray: ISocialsArray[] = [
    {
      name: 'Facebook', 
      src: 'assets/images/contacts/Facebook.svg',
      alt: 'Facebook icon'
    },
    {
      name: 'Twitter', 
      src: 'assets/images/contacts/Twitter.svg',
      alt: 'Twitter icon'
    },
    {
      name: 'YouTube', 
      src: 'assets/images/contacts/YouTube.svg',
      alt: 'YouTube icon'
    },
    {
      name: 'telegram', 
      src: 'assets/images/contacts/telegram.svg',
      alt: 'telegram icon'
    },
    {
      name: 'Instagram', 
      src: 'assets/images/contacts/Instagram.svg',
      alt: 'Instagram icon'
    },
    {
      name: 'Linked-In', 
      src: 'assets/images/contacts/Linked-In.svg',
      alt: 'Linked-In icon'
    },

  ]
      
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