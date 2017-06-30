import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { AF } from "../providers/af";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../app.component.css','./home.component.css']
})
export class HomeComponent implements OnInit {
  allTimers:any = [];
  timers: FirebaseListObservable<any>;
  constructor(private afService: AF, private router: Router, db: AngularFireDatabase) { 
    // this.allTimers = afService.timers;
    let uid = localStorage.uid;
    this.timers = db.list(`/timers/${uid}`);
    // this.timers = db.list(`/timers/`);
    console.log('this.allTimers ',this.timers);
  }

  ngOnInit() {
    console.log('init')
  }

  doAction(item) {
    let toUpdate = {};
    // toUpdate[props] = 
    let currentTime = new Date().getTime();
    console.log('currentTime ',currentTime);
    item.start = new Date(currentTime);
    this.afService.updateTimerObject(item).then((successfullyUpdated)=>{
      
    })
  }
  

}
