import { Component } from '@angular/core';
import { contactsArray, socialsArray } from 'src/app/data/store';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  contactsArray = contactsArray.filter(
    (el) => el.name === 'phone' || el.name === 'email'
  );
  socialsArray = socialsArray;
}
