import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AF } from "../providers/af";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../app.component.css', './login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private afService: AF, private router: Router) { 
    // afService.ifUserLogin().map((loggedIn)=>{
    //   if(loggedIn){
    //     router.navigate(['home']);
    //   }
    // })
  }

  ngOnInit() {
  }

  loginWithGoogle() {
    this.afService.loginWithGoogle().then((successfullyLogin) => {
      console.log('successfullyLogin ', successfullyLogin)
      this.afService.saveUserInfoFromForm(successfullyLogin).then((successfullyLoggedUser) => {
        localStorage.uid = successfullyLogin.uid;
        this.router.navigate(['home']);
      })
    })
  }

  onLogin(event, user) {
    event.preventDefault();
    console.log('login ', user.value);
    this.afService.loginWithEmail(user.value).then((successfullyLoggedIn) => {
      if (successfullyLoggedIn) {
        console.log('successfullyLoggedIn ', successfullyLoggedIn)
        localStorage.uid = successfullyLoggedIn.uid;
        this.router.navigate(['home']);
      }
    })
  }
}
