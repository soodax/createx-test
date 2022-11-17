import { Component } from "@angular/core";
import { SignUpComponent } from "../sign-up/sign-up.component";
import { MatDialog } from '@angular/material/dialog';
import { SignInComponent } from "../sign-in/sign-in.component";


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent {

    constructor(public dialog: MatDialog) {}

    openDialog(form: string, enterAnimationDuration: string, exitAnimationDuration: string) {

        switch (form) {
            case 'sign-in':
                this.dialog.open(
                    SignInComponent, {
                    enterAnimationDuration,
                    exitAnimationDuration,
                })
                break;
            case 'sign-up':
                this.dialog.open(
                    SignUpComponent, {
                    enterAnimationDuration,
                    exitAnimationDuration,
                })
                break;
            default:
                alert('error')
        }
    }
}