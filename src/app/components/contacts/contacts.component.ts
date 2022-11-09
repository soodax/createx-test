import { Component, OnInit } from "@angular/core";

declare let ymaps:any;

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss']
})

export class ContactsComponent {
    api: 'bba85c08-dbe9-4a95-99ca-0b6c43e7c9a8'
    
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