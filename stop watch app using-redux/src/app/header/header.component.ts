import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ISubscription } from 'rxjs/Subscription';
import { AF } from "../providers/af";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;
  subscription: ISubscription;

  constructor(private afService: AF, private router: Router) {
  }

  ngOnInit() {
    this.subscription = this.afService._authState.subscribe(auth => auth ? this.isAuthenticated = true : this.isAuthenticated = false);
  }
  logout() {
    this.afService.logout();
    localStorage.removeItem('uid');
    this.router.navigate(['login']);
  }

  ngOnDestroy() {
    this.subscription ? this.subscription.unsubscribe() : '';
  }

}
