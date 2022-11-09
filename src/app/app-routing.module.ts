import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsContainerComponent } from './components/contacts-container/contacts-container.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';


const routes: Routes = [
  {path: '', component: NotFoundComponent},
  {path: 'contacts', component: ContactsContainerComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'sign-in', component: SignInComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
