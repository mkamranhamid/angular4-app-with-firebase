import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AF } from "../providers/af";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['../app.component.css', './create.component.css']
})
export class CreateComponent implements OnInit {
  name: '';
  error:boolean = false;
  constructor(private afService: AF, private router: Router) { }

  ngOnInit() {
  }

  createTimer(name) {
    console.log('name ', name);
    if (name.length > 0) {
      this.afService.addTimerToDb(name).then((successfullyAddedTimer) => {
        if (successfullyAddedTimer) {
          this.error = false;
          this.router.navigate(['home']);
        }
      }).catch((error) => {
        if (error) {
          this.error = true;
          console.log('error ', error);
        }
      })
    } else {
          this.error = true;      
      console.log('error!! add something',);
    }

  }

}
