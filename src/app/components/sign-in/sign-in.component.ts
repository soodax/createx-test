import { Component, 
  EventEmitter,
  OnInit, 
  Input, 
  Output, 
  ViewChild, 
  ElementRef, 
  AfterViewInit  
} from '@angular/core';
import { validationEmail, validationPassword } from 'src/app/validation/validation';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements AfterViewInit  {

  //Поле для переключения Keep me (checkbox)
  isKeepMe = true
  isEmailTrue = false
  isPasswordTrue = false

  //Поле видимости пароля
  isPasswordHidden = true

  //Получаем ref дочернего элемента
  @ViewChild('passwordInputRef') passwordInputRef: ElementRef<HTMLInputElement>
  @ViewChild('emailInputRef') emailInputRef: ElementRef<HTMLInputElement>
  @ViewChild('successMessageE') successMessageE: ElementRef<HTMLInputElement>
  @ViewChild('dangerMessageE') dangerMessageE: ElementRef<HTMLInputElement>
  @ViewChild('successMessageP') successMessageP: ElementRef<HTMLInputElement>
  @ViewChild('dangerMessageP') dangerMessageP: ElementRef<HTMLInputElement>
  
  //Метод для переключения фидимости пароля
  toggleHidden() {
    this.isPasswordHidden = !this.isPasswordHidden
    !this.isPasswordHidden 
      ? this.passwordInputRef.nativeElement.type = 'text' 
      : this.passwordInputRef.nativeElement.type = 'password'
  }

  //Метод валидации почты
  emailCheck() {
    if (validationEmail(this.emailInputRef.nativeElement)) {
      this.dangerMessageE.nativeElement.style.display = 'none'
      this.successMessageE.nativeElement.style.display = 'block'
      this.isEmailTrue = true
    } else {
      this.successMessageE.nativeElement.style.display = 'none'
      this.dangerMessageE.nativeElement.style.display = 'block'
      this.isEmailTrue = false
    }
    
  }

  //Метод валидации пароля
  passwordCheck() {
    if (validationPassword(this.passwordInputRef.nativeElement)) {
      this.dangerMessageP.nativeElement.style.display = 'none'
      this.successMessageP.nativeElement.style.display = 'block'
      this.isPasswordTrue = true
    } else {
      this.successMessageP.nativeElement.style.display = 'none'
      this.dangerMessageP.nativeElement.style.display = 'block'
      this.isPasswordTrue = false
    }
    
  }

  submit() {
    if (this.passwordInputRef.nativeElement.value) {
      if (this.isEmailTrue) {
        alert('Validation pass!')    
      }
    }
  }

  constructor() { }

  ngAfterViewInit (): void {
    
  }

}
