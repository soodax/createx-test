import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { socialsArray } from 'src/app/data/store';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})

export class SignUpComponent implements OnInit {

  socialsArray = socialsArray.filter(el => 
    el.name === 'facebook' || 
    el.name === 'google' || 
    el.name === 'twitter' || 
    el.name === 'linked-in'
  )

  constructor(
    private formBuilder: FormBuilder, 
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    for (let i = 0; i < this.socialsArray.length; i++) {
      this.matIconRegistry.addSvgIcon(
        `${this.socialsArray[i].name}-icon`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          this.socialsArray[i].src
        )
      );  
    }
  }
  
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
  }

  //Метод для переключения чекбокса
  checkboxToggle() {   
    this.isRememberMe = !this.isRememberMe
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
