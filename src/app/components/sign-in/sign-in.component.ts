import { Component, EventEmitter,OnInit, Input, Output, ViewChild, ElementRef, AfterViewInit  } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements AfterViewInit  {

  //Поле для переключения Keep me (checkbox)
  isKeepMe = true

  //Поле видимости пароля
  isPasswordHidden = true

  //Получаем ref дочернего элемента
  @ViewChild('passwordInputRef') passwordInputRef: ElementRef<HTMLInputElement>

  //Метод для переключения фидимости пароля
  toggleHidden() {
    this.isPasswordHidden = !this.isPasswordHidden
    !this.isPasswordHidden 
      ? this.passwordInputRef.nativeElement.type = 'text' 
      : this.passwordInputRef.nativeElement.type = 'password'
  }

  constructor() { }

  ngAfterViewInit (): void {
  }

}
