import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { TokenStorageService } from '../services';

import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
    private authService: TokenStorageService) {
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isAuthenticate()) {
      return true;
    }

    this.router.navigate(['login']);

    return false;
  }
}
