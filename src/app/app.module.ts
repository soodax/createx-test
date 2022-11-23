import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ContactsContainerComponent } from './components/contacts-container/contacts-container.component';
import { FooterComponent } from './components/footer/footer.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { HeaderComponent } from './components/header/header.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SinglePostComponent } from './components/single-post/single-post.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { NewsletterComponent } from './components/single-post/newsletter/newsletter.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { OurBlogComponent } from './components/single-post/our-blog/our-blog.component';
import { ColorfulDirective } from './directives/colorful.directive';
import { MatDialogModule } from '@angular/material/dialog';
import { TagsService } from './services/tags.service';
import { ChartsComponent } from './components/charts/charts.component';
import { ChartComponent } from './components/charts/chart/chart.component';
import { ChartsService } from './services/charts.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactsComponent,
    QuestionsComponent,
    FooterComponent,
    ContactsContainerComponent,
    NotFoundComponent,
    SignInComponent,
    SignUpComponent,
    SinglePostComponent,
    NewsletterComponent,
    SidebarComponent,
    OurBlogComponent,
    ColorfulDirective,
    ChartsComponent,
    ChartComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [
    TagsService,
    ChartsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
