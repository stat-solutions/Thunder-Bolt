import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthServiceService } from '../../auth-service.service';
import * as jwt_decode from 'jwt-decode';

@Injectable({
    providedIn: 'root'
  })
  export class AuthGuard implements CanActivate {
  
    constructor(private authService: AuthServiceService, private router: Router) { }
  
    canActivate() {
         console.log("this is authguard")
      if (this.authService.isLoggedIn()) {
           return true;
     //   if(jwt_decode(this.authService.getJwtToken()).user_role === "admin"){
     //        this.router.navigate(['/admin']);
     //   }
     //   else if (jwt_decode(this.authService.getJwtToken()).user_role === "central user"){
     //        this.router.navigate(['/centralmanagement']);
     //   }
     //   else if (jwt_decode(this.authService.getJwtToken()).user_role === "area manager"){
     //        this.router.navigate(['/areamanagement']);
     //   }
     //   else if (jwt_decode(this.authService.getJwtToken()).user_role === "town manager"){
     //        this.router.navigate(['/townmanagement']);
     //   }
     //   else if (jwt_decode(this.authService.getJwtToken()).user_role === "station manager"){
     //        this.router.navigate(['/stationmanagement']);
     //   }
     //   else if (jwt_decode(this.authService.getJwtToken()).user_role === "station officer"){
     //        this.router.navigate(['/stationofficer']);
     //   }
      }
      else {
        return this.authService.isLoggedIn();
      }
    }
  }