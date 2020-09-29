import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';
import { AuthServiceService } from '../../auth-service.service';
import {JwtHelperService} from '@auth0/angular-jwt';
// import * as jwt_decode from 'jwt-decode';

@Injectable({
    providedIn: 'root'
  })
  export class RandomGuard implements CanActivateChild {
    constructor(
      private authService: AuthServiceService,
      private router: Router,
      private jwtHelper: JwtHelperService
      ) { }
    canActivateChild(): boolean {
      if (this.authService.isLoggedIn()) {
          if (this.jwtHelper.isTokenExpired(this.authService.getJwtToken())){
            if(this.jwtHelper.isTokenExpired(this.authService.getRefreshToken())){
              return false;
            } else {
              this.authService.refreshToken();
              return true;
            }
          }
          return true;
      }
      else {
        // return true;
        this.router.navigate(['/authpage/login']);
        return false;
      }
    }
  }
