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

    openDialog(form: string) {

        switch (form) {
            case 'sign-in':
                this.dialog.open(
                    SignInComponent, {
                    enterAnimationDuration: '0ms',
                    exitAnimationDuration: '0ms',
                })
                break;
            case 'sign-up':
                this.dialog.open(
                    SignUpComponent, {
                    enterAnimationDuration: '0ms',
                    exitAnimationDuration: '0ms',
                })
                break;
            default:
                alert('error')
        }
    }
}