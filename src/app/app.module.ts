import { InjectionToken, NgModule } from '@angular/core';
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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NewsletterComponent } from './components/single-post/newsletter/newsletter.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RecommendComponent } from './components/single-post/recommend/recommend.component';
import { ColorfulDirective } from './directives/colorful.directive';
import { MatDialogModule } from '@angular/material/dialog';
import { TagsService } from './services/tags.service';
import { ChartsComponent } from './components/charts/charts.component';
import { ChartComponent } from './components/charts/chart/chart.component';
import { ChartsService } from './services/charts.service';
import { MediaCardComponent } from './components/common/media-card/media-card.component';
import { BlogComponent } from './components/blog/blog.component';
import { CardsFilterComponent } from './components/common/cards-filter/cards-filter.component';
import { HostService } from './services/host.service';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { SearchComponent } from './components/common/search/search.component';
import { SelectComponent } from './components/common/select/select.component';

export const HOST = new InjectionToken<string>('');

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
    RecommendComponent,
    ColorfulDirective,
    ChartsComponent,
    ChartComponent,
    MediaCardComponent,
    BlogComponent,
    CardsFilterComponent,
    SearchComponent,
    SelectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule,
    MatDialogModule,
  ],
  providers: [
    TagsService,
    { provide: HOST, useClass: HostService },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
