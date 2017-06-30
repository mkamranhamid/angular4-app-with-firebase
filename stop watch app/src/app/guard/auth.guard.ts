import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        console.log('localStorage.uid ', localStorage.uid);
        console.log('state.url ', state.url);
        if (localStorage.getItem('uid') && (state.url == '/' || state.url == '/login')) {
            this.router.navigate(['/home']);
            return true;
        }
        if (localStorage.getItem('uid')) {
            // logged in so return true
            return true;
        }

        if (!localStorage.getItem('uid') && (state.url == '/' || state.url == '/login')) {
            // this.router.navigate(['/login']);
            return true;
        } else {
            // not logged in so redirect to login page with the return url
            this.router.navigate(['/login']);
            return false;
        }
    }

}
