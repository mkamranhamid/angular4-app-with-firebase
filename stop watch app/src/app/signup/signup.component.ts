import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { AF } from "../providers/af";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../app.component.css', '../login/login.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private afService: AF, private router: Router) { }

  ngOnInit() {
  }
  onSubmit(event, formData) {
    event.preventDefault();
    console.log('formData ', formData.valid);
    console.log('formData value', formData.value);
    let userInfo = formData.value;
    this.afService.registerUser(userInfo).then((successfullyCreatedUser) => {
      if (successfullyCreatedUser) {
        delete userInfo.password;
        userInfo.uid = successfullyCreatedUser.uid;
        this.afService.saveUserInfoFromForm(userInfo).then((successfullyLoggedUser) => {
          this.router.navigate(['home']);
        })
      }
    })
  }
  addUserToDb(userInfo) {

  }
}
