import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';
import { AuthServiceService } from '../../auth-service.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import { AlertService } from 'ngx-alerts';
// import * as jwt_decode from 'jwt-decode';

@Injectable({
    providedIn: 'root'
  })
  export class RandomGuard implements CanActivateChild {
    constructor(
      private authService: AuthServiceService,
      private router: Router,
      private jwtHelper: JwtHelperService,
      private alertService: AlertService
      ) { }
    canActivateChild(): boolean {
      if (this.authService.isLoggedIn()) {
          if (this.jwtHelper.isTokenExpired(this.authService.getJwtToken())){
              this.authService.refreshToken();
              return true;
            } else {
              return true;
          }
      }
      else {
        this.router.navigate(['/authpage/login']);
        return false;
      }
    }
  }
