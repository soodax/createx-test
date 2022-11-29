import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './components/blog/blog.component';
import { ChartsComponent } from './components/charts/charts.component';
import { ContactsContainerComponent } from './components/contacts-container/contacts-container.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SinglePostComponent } from './components/single-post/single-post.component';

const routes: Routes = [
  { path: '', component: NotFoundComponent },
  { path: 'contacts', component: ContactsContainerComponent },
  { path: 'single-post', component: SinglePostComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'charts', component: ChartsComponent },
  { path: 'single-post/blog', component: BlogComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
