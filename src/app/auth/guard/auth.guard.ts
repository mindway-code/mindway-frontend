import { Injectable } from '@angular/core';
import {
  CanActivate, CanActivateChild, UrlTree, Router
} from '@angular/router';
import { AuthService } from '../../../app/services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router){}

  private decide(): boolean | UrlTree {
    return this.authService.isLogged()
    ? true
    : this.router.createUrlTree(['/login']);
  }

  canActivate() { return this.decide(); }
  canActivateChild() { return this.decide(); }
}
