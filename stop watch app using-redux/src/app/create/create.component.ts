import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { NgRedux } from '@angular-redux/store';
import { AuthActions } from '../store/actions/auth.actions';
import { IAppState } from "../store/reducers/reducer";

import { AF } from "../providers/af";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['../app.component.css', './create.component.css']
})
export class CreateComponent implements OnInit {
  name: string = '';
  _name: string = '';
  error: boolean = false;
  subscription;
  constructor(private afService: AF, private router: Router, private ngRedux: NgRedux<IAppState>, private actions: AuthActions) {
    this.subscription = ngRedux.select<string>('name')
      .subscribe(newCount => {
        this._name = newCount
      });
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  createTimer(name) {
    console.log('name ', name);
    if (name.length > 0) {
      this.actions.create(name);
      // this.ngRedux.dispatch(this.actions.create(name));
      /*this.afService.addTimerToDb(name).then((successfullyAddedTimer) => {
        if (successfullyAddedTimer) {
          this.error = false;
          this.router.navigate(['home']);
        }
      }).catch((error) => {
        if (error) {
          this.error = true;
          console.log('error ', error);
        }
      })*/
    } else {
      this.error = true;
      console.log('error!! add something');
    }

  }

  makeErrorDisappear() {
    this.error = false
  }

}
