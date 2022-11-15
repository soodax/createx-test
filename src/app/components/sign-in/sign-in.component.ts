import {
  Component, 
  ViewChild, 
  ElementRef,
  ViewChildren,
  QueryList,  
} from '@angular/core';
import { passwordToggler, checkboxToggler } from 'src/app/data/togglers';
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

  // @ViewChildren("input") inputArray: QueryList<any>

  //Базовые иконки
  checkboxIcon: string = 'assets/images/questions/checked.svg'
  checkboxAlt: string = 'checkbox check'
  passwordIcon: string = 'assets/images/Eye.svg'
  passwordAlt: string = 'show password'

  //Валидация форм
  signInForm: FormGroup
  submitted = false

  //Поля для видимости пароля\KeepMe
  isKeepMe = true
  isPasswordHidden = true

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit (): void {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    })
    
  }

  // ngAfterViewInit() {}

  checkboxToggle() {   
    const result = checkboxToggler(this.isKeepMe)
    this.isKeepMe = result.value
    this.checkboxIcon = result.src
    this.checkboxAlt = result.alt
}

  onSubmit() {
    this.submitted = true

    if (this.signInForm.invalid) {
      alert('Error')
      return
    }

    alert('Validation pass!')
  }
  
  //Получаем ref дочернего элемента
  @ViewChild('passwordInputRef') passwordInputRef: ElementRef<HTMLInputElement>
  @ViewChild('emailInputRef') emailInputRef: ElementRef<HTMLInputElement>

  //Метод переключения видимости
  toggleHidden() {
    const result = passwordToggler(
      [
        this.passwordInputRef.nativeElement,
      ],
      this.isPasswordHidden
    );
    this.isPasswordHidden = result.value
    this.passwordIcon = result.src
    this.passwordAlt = result.alt
  }
}
