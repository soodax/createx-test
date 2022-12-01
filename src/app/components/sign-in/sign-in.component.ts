import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { socialsArray } from 'src/app/data/store';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  socialsArray = socialsArray.filter(
    (el) =>
      el.name === 'facebook' ||
      el.name === 'google' ||
      el.name === 'twitter' ||
      el.name === 'linked-in'
  );

  //Валидация форм
  signInForm: FormGroup;
  submitted = false;

  //Поля для видимости пароля\KeepMe
  isKeepMe = true;
  isPasswordHidden = true;
  inputType = 'password';

  constructor(private formBuilder: FormBuilder) {}

  //Условия валидации
  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  //Метод переключения чекбокса
  checkboxToggle() {
    this.isKeepMe = !this.isKeepMe;
  }

  //Метод переключения видимости
  toggleHidden() {
    this.isPasswordHidden = !this.isPasswordHidden;
  }

  //Подтверждение формы
  onSubmit() {
    this.submitted = true;

    if (this.signInForm.invalid) {
      return alert('Error');
    }

    alert('Validation pass!');
  }
}
