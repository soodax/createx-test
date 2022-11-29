import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss'],
})
export class NewsletterComponent implements OnInit {
  constructor() {}

  checkboxIcon = 'assets/images/questions/checked.svg';
  checkboxAlt = 'checkbox check';
  isAgree = true;

  ngOnInit(): void {}

  checkboxToggle() {
    this.isAgree = !this.isAgree;
    this.isAgree
      ? (this.checkboxIcon = 'assets/images/questions/checked.svg')
      : (this.checkboxIcon = 'assets/images/questions/unchecked.svg');
    this.isAgree
      ? (this.checkboxAlt = 'checkbox check')
      : (this.checkboxAlt = 'checkbox uncheck');
  }
}
