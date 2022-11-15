import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { passwordToggler, checkboxToggler } from 'src/app/data/togglers';
import {
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { socialsArray } from 'src/app/data/store';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})

export class SignUpComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) {}

  socialsArray = socialsArray.filter(el => 
    el.name === 'facebook' || 
    el.name === 'google' || 
    el.name === 'twitter' || 
    el.name === 'linked-in'
  )

  //Базовые иконки
  checkboxIcon: string = 'assets/images/questions/checked.svg'
  checkboxAlt: string = 'checkbox check'
  passwordIcon: string = 'assets/images/Eye.svg'
  passwordAlt: string = 'show password'
  
  //Поля для видимости пароля\rememberMe
  isRememberMe = true;
  isPasswordHidden = true;

  //Валидация форм
  signUpForm: FormGroup;
  submitted = false;

  //Получаем ref дочернего элемента
  @ViewChild('nameInputRef') nameInputRef: ElementRef<HTMLInputElement>;
  @ViewChild('emailInputRef') emailInputRef: ElementRef<HTMLInputElement>;
  @ViewChild('passwordInputRef1')
  passwordInputRef1: ElementRef<HTMLInputElement>;
  @ViewChild('passwordInputRef2')
  passwordInputRef2: ElementRef<HTMLInputElement>;

  //Метод для переключения фидимости пароля
  toggleHidden() {
    console.log(this.isPasswordHidden)
    console.log(this.passwordIcon)
    console.log(this.passwordAlt)
    const result = passwordToggler(
      [
        this.passwordInputRef1.nativeElement,
        this.passwordInputRef2.nativeElement,
      ],
      this.isPasswordHidden
    );
    this.isPasswordHidden = result.value
    this.passwordIcon = result.src
    this.passwordAlt = result.alt
    console.log(this.isPasswordHidden)
    console.log(this.passwordIcon)
    console.log(this.passwordAlt)
  }

  checkboxToggle() {   
    const result = checkboxToggler(this.isRememberMe)
    this.isRememberMe = result.value
    this.checkboxIcon = result.src
    this.checkboxAlt = result.alt
  }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.signUpForm.invalid) {
      alert('Error');
      return;
    } else if (
      this.passwordInputRef1.nativeElement.value ===
      this.passwordInputRef2.nativeElement.value
    ) {
      alert('Validation pass!');
    }
  }
}
