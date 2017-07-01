import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { AF } from "../providers/af";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../app.component.css', './home.component.css']
})
export class HomeComponent implements OnInit {
  allTimers: any = [];
  timers: any;
  hoursMinsSecs: string = '00:00:00';
  seconds: number = 0;
  minutes: number = 0;
  hours: number = 0;
  timeout;
  currentIndex: number;
  selectedItem = {
    name: '',
    start: '-',
    duration: '0:0:0',
    end: '-',
    action: false,
    stopWatch: '-',
    $key: ''
  };

  constructor(private afService: AF, private router: Router, db: AngularFireDatabase) {
    let uid = localStorage.uid;
    // this.timers = db.list(`/timers/${uid}`);
    afService.getAllUserTimers(localStorage.uid).subscribe((successTimerRetreival) => {
      this.timers = successTimerRetreival;
    })
  }

  ngOnInit() {
    console.log('init')
  }

  startTimer() {
    this.timeout = setTimeout(() => {
      this.seconds++
      if (this.seconds >= 60) {
        this.seconds = 0
        this.minutes++
        if (this.minutes >= 60) {
          this.minutes = 0;
          this.hours++
        }
      }
      this.selectedItem.duration = `${this.hours}:${this.minutes}:${this.seconds}`;
      this.hoursMinsSecs = `${this.hours}:${this.minutes}:${this.seconds}`;
      this.startTimer();
    }, 1000);

    // this.calcTime()
  }
  calcTime() {
    this.seconds++
    if (this.seconds >= 60) {
      this.seconds = 0
      this.minutes++
      if (this.minutes >= 60) {
        this.minutes = 0;
        this.hours++
      }
    }
    this.selectedItem.duration = `${this.hours}:${this.minutes}:${this.seconds}`;
    this.hoursMinsSecs = `${this.hours}:${this.minutes}:${this.seconds}`;
    this.startTimer();
  }
  endTime(item) {
    clearTimeout(this.timeout);
    this.afService.updateTimerObject(item).then((successfullyUpdated) => {
      this.seconds = 0;
      this.minutes = 0;
      this.hours = 0;
    })
  }

  doAction(item, index) {

    let currentTime = new Date().getTime();
    let d = new Date(currentTime);
    if (item.action) {
      item.end = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
      this.endTime(item);
      this.disabledAllOthers(index, false);
    } else {
      this.disabledAllOthers(index, true);
      this.currentIndex = index;
      item.start = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
      item.action = true;
      this.selectedItem = item;
      this.startTimer();
    }
    // this.afService.updateTimerObject(item).then((successfullyUpdated) => {
    //   this.startTimer();
    // })
  }
  disabledAllOthers(index, action) {
    this.timers.map((d, i)=>{
      if(i != index){
        d.disabled = action
      }
    })
  }


}
