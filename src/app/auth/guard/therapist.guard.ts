import { Injectable } from '@angular/core';
import {
  CanActivate, CanActivateChild, UrlTree, Router
} from '@angular/router';
import { AuthService } from '../../../app/services/auth.service';
import { Observable, map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthTherapistGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router){}

  private decide(): Observable<boolean | UrlTree> {
    return this.authService.isTherapist().pipe(
      map(() => true),                                               // 200 OK
      catchError(() => of(this.router.createUrlTree(['/unauthorized']))) // 401/403
    );
  }

  canActivate() { return this.decide(); }
  canActivateChild() { return this.decide(); }
}
