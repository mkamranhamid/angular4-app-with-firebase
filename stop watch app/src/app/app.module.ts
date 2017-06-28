import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
// firebase
import { AngularFireModule } from 'angularfire2';

// New imports to update based on AngularFire2 version 4
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
// firebase ---------
//provider
import { AF } from './providers/af';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  { path: 'create', component: CreateComponent }
];

export const firebaseConfig = {
  apiKey: "AIzaSyBP4baKPa2Gbcy-578wTeFBro5PvfcABnE",
  authDomain: "quayside-9d979.firebaseapp.com",
  databaseURL: "https://quayside-9d979.firebaseio.com",
  projectId: "quayside-9d979",
  storageBucket: "quayside-9d979.appspot.com",
  messagingSenderId: "31090138202"
};



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    CreateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(appRoutes),
    AngularFireDatabaseModule,
    AngularFireAuthModule

  ],
  providers: [AF],
  bootstrap: [AppComponent]
})
export class AppModule { }
