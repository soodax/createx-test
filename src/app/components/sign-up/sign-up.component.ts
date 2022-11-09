import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { validationEmail, validationPassword } from 'src/app/validation/validation';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  isRememberMe = true
  isPasswordHidden = true
  isNameTrue = false
  isEmailTrue = false
  isPasswordTrue = false

  constructor() { }

  @Input() modal: boolean
  

  //Получаем ref дочернего элемента
  @ViewChild('nameInputRef') nameInputRef: ElementRef<HTMLInputElement>
  @ViewChild('emailInputRef') emailInputRef: ElementRef<HTMLInputElement>
  @ViewChild('passwordInputRef1') passwordInputRef1: ElementRef<HTMLInputElement>
  @ViewChild('passwordInputRef2') passwordInputRef2: ElementRef<HTMLInputElement>
  @ViewChild('successMessageP1') successMessageP1: ElementRef<HTMLInputElement>
  @ViewChild('successMessageP2') successMessageP2: ElementRef<HTMLInputElement>
  @ViewChild('dangerMessageP1') dangerMessageP1: ElementRef<HTMLInputElement>
  @ViewChild('dangerMessageP2') dangerMessageP2: ElementRef<HTMLInputElement>
  @ViewChild('successMessageE') successMessageE: ElementRef<HTMLInputElement>
  @ViewChild('dangerMessageE') dangerMessageE: ElementRef<HTMLInputElement>



  //Метод для переключения фидимости пароля
  toggleHidden() {
    this.isPasswordHidden = !this.isPasswordHidden
    if (!this.isPasswordHidden) {
      this.passwordInputRef1.nativeElement.type = 'text';
      this.passwordInputRef2.nativeElement.type = 'text';
    } else {
      this.passwordInputRef1.nativeElement.type = 'password';
      this.passwordInputRef2.nativeElement.type = 'password';
    }
  }

    
    
  
    //Метод валидации почты

    nameCheck() {
      this.isNameTrue = true  
    }

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
    passwordCheck1() {
      if (validationPassword(this.passwordInputRef1.nativeElement)) {
        this.dangerMessageP1.nativeElement.style.display = 'none'
        this.successMessageP1.nativeElement.style.display = 'block'
        this.isPasswordTrue = true
      } else {
        this.successMessageP1.nativeElement.style.display = 'none'
        this.dangerMessageP1.nativeElement.style.display = 'block'
        this.isPasswordTrue = false
      }
      
    }

    passwordCheck2() {
      if (validationPassword(this.passwordInputRef2.nativeElement)) {
        this.dangerMessageP2.nativeElement.style.display = 'none'
        this.successMessageP2.nativeElement.style.display = 'block'
        this.isPasswordTrue = true
      } else {
        this.successMessageP2.nativeElement.style.display = 'none'
        this.dangerMessageP2.nativeElement.style.display = 'block'
        this.isPasswordTrue = false
      }
      
    }

    submit() {
      if (this.passwordInputRef1.nativeElement.value === this.passwordInputRef2.nativeElement.value) {
        if (this.isEmailTrue) {
          if (this.isNameTrue) {
            alert('Validation pass!')
          }
        }
      }
    }

  ngOnInit(): void {
  }

}
