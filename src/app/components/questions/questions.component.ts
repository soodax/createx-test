import { Component, ElementRef, ViewChild } from "@angular/core";
import { checkboxToggler } from "src/app/data/togglers";

@Component({
    selector: 'app-questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.scss']
})

export class QuestionsComponent {
    checkboxIcon: string = 'assets/images/questions/checked.svg'
    checkboxAlt: string = 'checkbox check'
    isAgree = true

    ngOnInit() : void{
    }

    checkboxToggle() {   
        const result = checkboxToggler(this.isAgree)
        this.isAgree = result.value
        this.checkboxIcon = result.src
        this.checkboxAlt = result.alt
    }
}