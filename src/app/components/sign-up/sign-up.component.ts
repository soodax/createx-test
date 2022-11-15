import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
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
  checkboxIcon = 'assets/images/questions/checked.svg'
  checkboxAlt = 'checkbox check'
  passwordIcon = 'assets/images/Eye.svg'
  
  //Поля для видимости пароля\rememberMe
  isRememberMe = true;
  isPasswordHidden = true;
  inputType = 'password';

  //Валидация форм
  signUpForm: FormGroup;
  submitted = false;

  //Получаем ref для сравнения паролей
  @ViewChild('passwordInputRef1')
  passwordInputRef1: ElementRef<HTMLInputElement>;
  @ViewChild('passwordInputRef2')
  passwordInputRef2: ElementRef<HTMLInputElement>;

  //Метод для переключения фидимости пароля
  toggleHidden() {
    this.isPasswordHidden = !this.isPasswordHidden
    this.isPasswordHidden ? this.inputType = 'password' : this.inputType = 'text'
    this.isPasswordHidden ? this.passwordIcon = 'assets/images/Eye.svg' : this.passwordIcon = 'assets/images/Closed-Eye.svg'
  }

  //Метод для переключения чекбокса
  checkboxToggle() {   
    this.isRememberMe = !this.isRememberMe
    this.isRememberMe ? this.checkboxIcon = 'assets/images/questions/checked.svg' : this.checkboxIcon = 'assets/images/questions/unchecked.svg'
    this.isRememberMe ? this.checkboxAlt = 'checkbox check' : this.checkboxAlt = 'checkbox uncheck'
  }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  //Подтверждение формы
  onSubmit() {
    this.submitted = true;

    if (this.signUpForm.invalid) {
      return alert('Error');
    } else if (
      this.passwordInputRef1.nativeElement.value ===
      this.passwordInputRef2.nativeElement.value
    ) {
      alert('Validation pass!');
    }
  }
}
