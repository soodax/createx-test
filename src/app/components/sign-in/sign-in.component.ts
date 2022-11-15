import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { socialsArray } from 'src/app/data/store';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})

export class SignInComponent {
  
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

  //Валидация форм
  signInForm: FormGroup
  submitted = false

  //Поля для видимости пароля\KeepMe
  isKeepMe = true
  isPasswordHidden = true
  inputType = 'password'

  constructor(private formBuilder: FormBuilder) { }

  //Условия валидации
  ngOnInit (): void {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    })
  }

  //Метод переключения чекбокса
  checkboxToggle() {   
    this.isKeepMe = !this.isKeepMe
    this.isKeepMe ? this.checkboxIcon = 'assets/images/questions/checked.svg' : this.checkboxIcon = 'assets/images/questions/unchecked.svg'
    this.isKeepMe ? this.checkboxAlt = 'checkbox check' : this.checkboxAlt = 'checkbox uncheck'
  }

  //Подтверждение формы
  onSubmit() {
    this.submitted = true

    if (this.signInForm.invalid) {
      return alert('Error')
    }

    alert('Validation pass!')
  }
  
  //Метод переключения видимости
  toggleHidden() {
    this.isPasswordHidden = !this.isPasswordHidden
    this.isPasswordHidden ? this.inputType = 'password' : this.inputType = 'text'
    this.isPasswordHidden ? this.passwordIcon = 'assets/images/Eye.svg' : this.passwordIcon = 'assets/images/Closed-Eye.svg'
  }
}
