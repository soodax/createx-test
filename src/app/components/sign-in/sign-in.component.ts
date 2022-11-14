import {
  Component, 
  ViewChild, 
  ElementRef,  
} from '@angular/core';
import { passwordToggler } from 'src/app/data/togglers';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { socialsArray } from 'src/app/data/store';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})

export class SignInComponent {
  socialsArray = socialsArray

  //Валидация форм
  signInForm: FormGroup
  submitted = false

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit (): void {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    })
  }

  onSubmit() {
    this.submitted = true

    if (this.signInForm.invalid) {
      alert('Error')
      return
    }

    alert('Validation pass!')
  }
  
  //Поля для видимости пароля\KeepMe
  isKeepMe = true
  isPasswordHidden = true

  //Получаем ref дочернего элемента
  @ViewChild('passwordInputRef') passwordInputRef: ElementRef<HTMLInputElement>
  @ViewChild('emailInputRef') emailInputRef: ElementRef<HTMLInputElement>

  //Метод переключения видимости
  toggleHidden() {
    this.isPasswordHidden = passwordToggler([this.passwordInputRef.nativeElement], this.isPasswordHidden)
  }
}
