import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthServiceService } from '../../auth-service.service';
import * as jwt_decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
  })
  export class AuthGuard implements CanActivate {
    constructor(private authService: AuthServiceService, private router: Router, private jwtHelper: JwtHelperService) { }
    canActivate(): any {
        console.log('this is authguard');
        if (this.authService.isLoggedIn()) {
          if (this.jwtHelper.decodeToken(this.authService.getJwtToken()).fkAccessRightsIdUser === 600){
              this.router.navigate(['/admin']);
          }
          else if (this.jwtHelper.decodeToken(this.authService.getJwtToken()).fkAccessRightsIdUser === 100){
                this.router.navigate(['/centralmanagement']);
          }
          else if (this.jwtHelper.decodeToken(this.authService.getJwtToken()).fkAccessRightsIdUser === 200){
                this.router.navigate(['/areamanagement']);
          }
          else if (this.jwtHelper.decodeToken(this.authService.getJwtToken()).fkAccessRightsIdUser === 300){
                this.router.navigate(['/townmanagement']);
          }
          else if (this.jwtHelper.decodeToken(this.authService.getJwtToken()).fkAccessRightsIdUser === 400){
                this.router.navigate(['/stationmanagement']);
          }
          else if (this.jwtHelper.decodeToken(this.authService.getJwtToken()).fkAccessRightsIdUser === 500){
                this.router.navigate(['/stationofficer']);
          }
        }
      else {
        return this.authService.isLoggedIn();
      }
    }
  }
