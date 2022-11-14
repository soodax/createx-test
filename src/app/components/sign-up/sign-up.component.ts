import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { passwordToggler } from 'src/app/data/togglers';
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
  socialsArray = socialsArray
  
  //Поля для видимости пароля\rememberMe
  isRememberMe = true;
  isPasswordHidden = true;

  //Получаем ref дочернего элемента
  @ViewChild('nameInputRef') nameInputRef: ElementRef<HTMLInputElement>;
  @ViewChild('emailInputRef') emailInputRef: ElementRef<HTMLInputElement>;
  @ViewChild('passwordInputRef1')
  passwordInputRef1: ElementRef<HTMLInputElement>;
  @ViewChild('passwordInputRef2')
  passwordInputRef2: ElementRef<HTMLInputElement>;

  //Метод для переключения фидимости пароля
  toggleHidden() {
    this.isPasswordHidden = passwordToggler(
      [
        this.passwordInputRef1.nativeElement,
        this.passwordInputRef2.nativeElement,
      ],
      this.isPasswordHidden
    );
  }

  //Валидация форм
  signUpForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) {}

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
