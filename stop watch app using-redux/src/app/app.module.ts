import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgReduxModule, NgRedux } from '@angular-redux/store'; // <- New

// firebase
import { AngularFireModule } from 'angularfire2';
// New imports to update based on AngularFire2 version 4
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

//provider
import { AF } from './providers/af';
import { AuthGuard } from './guard/auth.guard';

//NG2-REDUX
import { rootReducer, IAppState, INITIAL_STATE } from './store/reducers/reducer';
import { AuthActions } from './store/actions/auth.actions';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'create', component: CreateComponent, canActivate: [AuthGuard] }
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
    AngularFireAuthModule,
    NgReduxModule

  ],
  providers: [
    AF,
    AuthGuard,
    AuthActions
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>) {
    // Tell @angular-redux/store about our rootReducer and our initial state.
    // It will use this to create a redux store for us and wire up all the
    // events.
    ngRedux.configureStore(
      rootReducer,
      INITIAL_STATE);
  }
}
