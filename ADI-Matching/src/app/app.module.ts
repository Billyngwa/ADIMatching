import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { NgImageSliderModule } from 'ng-image-slider';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { BrowserModule } from '@angular/platform-browser';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { MainComponent } from './components/main/main.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MatchesComponent } from './components/matches/matches.component';
import { NavComponent } from './components/nav/nav.component';
import { EventsComponent } from './components/events/events.component';
import { ChatsComponent } from './components/chats/chats.component';
import { SettingsComponent } from './components/settings/settings.component';
import { HomeComponent } from './components/home/home.component';
import { MatchService } from './services/match.service';
import { NotificationsComponent } from './notifications/notifications.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactComponent } from './components/contact/contact.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ConnectionServiceModule } from 'ng-connection-service';
import { ReactiveFormsModule } from '@angular/forms';
import { KagertingComponent } from './components/kagerting/kagerting.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import{MatRadioModule} from '@angular/material/radio';
import { NgxPayPalModule } from 'ngx-paypal';
import { PaypalComponent } from './components/paypal/paypal.component';
import { RequestsidepullComponent } from './components/requestsidepull/requestsidepull.component';
import { MatchrequestsComponent } from './components/matchrequests/matchrequests.component';
import { WebsiteComponent } from './components/profileeditors/website/website.component';
import { ServicesComponent } from './components/profileeditors/services/services.component';
import { RelatedskillsComponent } from './components/profileeditors/relatedskills/relatedskills.component';
import { EducationinfoComponent } from './components/profileeditors/educationinfo/educationinfo.component';
import { ContactinfoComponent } from './components/profileeditors/contactinfo/contactinfo.component';
import { LoaderComponent } from './components/loader/loader.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import { LoaderInterceptor } from 'src/interceptors/loader.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    MainComponent,
    NotFoundComponent,
    HeaderComponent,
    LandingpageComponent,
    ProfileComponent,
    MatchesComponent,
    NavComponent,
    EventsComponent,
    ChatsComponent,
    SettingsComponent,
    HomeComponent,
    NotificationsComponent,
    ContactComponent,
    KagertingComponent,
    PaypalComponent,
    RequestsidepullComponent,
    MatchrequestsComponent,
    WebsiteComponent,
    ServicesComponent,
    RelatedskillsComponent,
    EducationinfoComponent,
    ContactinfoComponent,
    LoaderComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    NgImageSliderModule,
    MatDialogModule,
    HttpClientModule,
    ConnectionServiceModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatRadioModule,
    NgxPayPalModule,
    MatProgressSpinnerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents:[WebsiteComponent,ServicesComponent,ContactComponent]
})
export class AppModule { }
