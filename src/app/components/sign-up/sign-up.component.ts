import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  isRememberMe = true

  constructor() { }

  @Input() modal: boolean

  ngOnInit(): void {
  }

}
