import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { EventsComponent } from './components/events/events.component';
import { MatchesComponent } from './components/matches/matches.component';
import { ChatsComponent } from './components/chats/chats.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingsComponent } from './components/settings/settings.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthenticationGuard } from './Guards/authentication.guard';
import { NotificationsComponent } from './notifications/notifications.component';
import { ContactComponent } from './components/contact/contact.component';
import { KagertingComponent } from './components/kagerting/kagerting.component';
import { MatchrequestsComponent } from './components/matchrequests/matchrequests.component';
import { ServicesComponent } from './components/profileeditors/services/services.component';
import { EducationinfoComponent } from './components/profileeditors/educationinfo/educationinfo.component';
import { WebsiteComponent } from './components/profileeditors/website/website.component';
import { ContactinfoComponent } from './components/profileeditors/contactinfo/contactinfo.component';
import { RelatedskillsComponent } from './components/profileeditors/relatedskills/relatedskills.component';

const routes: Routes = [
  { path: "", component: MainComponent },
  { path: "sign-up", component: SignupComponent, title:"Register" },
  { path: "sign-in", component: SigninComponent },
  {
    path: "uoai",
    component: LandingpageComponent,
    title:'ADI',
    canActivate:[AuthenticationGuard],
    children: [
      { path: "home", component: HomeComponent },
      { path: "events", component: EventsComponent },
      { path: "matches", component: MatchesComponent },
      { path: "chats", component: ChatsComponent },
      { path: "profile", component: ProfileComponent, title:'ADI | Profile',
          children:[
    
          ]
    },

      { path: "settings", component: SettingsComponent },
      {path: "contact", component: ContactComponent},
      {path:'notifications', component:NotificationsComponent},
      {path: "kagerting", component: KagertingComponent},
      {path: "matchrequests", component: MatchrequestsComponent}

    ]
  },

  {path:"**",component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
