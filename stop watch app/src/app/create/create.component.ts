import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AF } from "../providers/af";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['../app.component.css', './create.component.css']
})
export class CreateComponent implements OnInit {
  name:'';
  constructor(private afService: AF, private router: Router) { }

  ngOnInit() {
  }

  createTimer(name){
    console.log('name ',name);
    this.afService.addTimerToDb(name).then((successfullyAddedTimer)=>{
      if(successfullyAddedTimer){
        this.router.navigate(['home']);
      }
    }).catch((error)=>{
      if(error){
        console.log('error ',error);
      }
    })
  }

}
