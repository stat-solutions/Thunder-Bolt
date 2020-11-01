import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';
import { AuthServiceService } from '../../auth-service.service';
import * as jwt_decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertService } from 'ngx-alerts';


@Injectable({
    providedIn: 'root'
  })
  export class CentralGuard implements CanActivateChild {
    constructor(
        private authService: AuthServiceService,
        private router: Router,
        private jwtHelper: JwtHelperService,
        private alert: AlertService
    ) { }
    canActivateChild(): boolean {
        if (this.authService.isLoggedIn()) {
            if (this.jwtHelper.isTokenExpired(this.authService.getJwtToken())){
                this.authService.refreshToken();
              } else {
                if (this.jwtHelper.decodeToken(this.authService.getJwtToken()).fkAccessRightsIdUser === 100){
                    return true;
                } else {
                    this.router.navigate(['/authpage/login']);
                    this.alert.danger({
                        html: '<strong>User unauthorised</strong>'
                    });
                    return false;
                }
            }
        }
        else {
          this.router.navigate(['/authpage/login']);
          this.alert.danger({
            html: '<strong>Please logg In first</strong>'
          });
          return false;
        }
      }
  }
