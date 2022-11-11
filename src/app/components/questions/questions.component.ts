import { Component } from "@angular/core";

@Component({
    selector: 'app-questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.scss']
})

export class QuestionsComponent {
    isAgree = true

    ngOnInit() : void{
    }
    // toggle() {
    //     this.isAgree = !this.isAgree
    // }
}