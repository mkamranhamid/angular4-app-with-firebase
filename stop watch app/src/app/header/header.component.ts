import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AF } from "../providers/af";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private afService: AF, private router: Router) {
    if(localStorage.uid){
      console.log('localStorage ',localStorage.uid);
    }
   }

  ngOnInit() {
    if(localStorage.uid){
      console.log('localStorage emmiter ',localStorage.uid);
    }
  }
  logout(){
    this.afService.logout();
    localStorage.removeItem('uid');
    this.router.navigate(['login']);
  }

}
