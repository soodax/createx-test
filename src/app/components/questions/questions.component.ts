import { Component } from "@angular/core";

@Component({
    selector: 'app-questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.scss']
})

export class QuestionsComponent {
    checkboxIcon = 'assets/images/questions/checked.svg'
    checkboxAlt = 'checkbox check'
    isAgree = true

    ngOnInit() : void{
    }

    checkboxToggle() {   
        this.isAgree = !this.isAgree
        this.isAgree ? this.checkboxIcon = 'assets/images/questions/checked.svg' : this.checkboxIcon = 'assets/images/questions/unchecked.svg'
        this.isAgree ? this.checkboxAlt = 'checkbox check' : this.checkboxAlt = 'checkbox uncheck'
      }
}