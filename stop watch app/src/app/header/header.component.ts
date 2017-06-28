import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() {
    if(localStorage.uid){
      console.log('localStorage ',localStorage.uid);
    }
   }

  ngOnInit() {
    if(localStorage.uid){
      console.log('localStorage emmiter ',localStorage.uid);
    }
  }

}
