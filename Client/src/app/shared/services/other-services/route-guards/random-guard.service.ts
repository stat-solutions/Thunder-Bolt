import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthServiceService } from '../../auth-service.service';
import * as jwt_decode from 'jwt-decode';

@Injectable({
    providedIn: 'root'
  })
  export class RandomGuard implements CanActivate {
  
    constructor(private authService: AuthServiceService, private router: Router) { }
  
    canActivate() {
      if (this.authService.isLoggedIn()) {
        
      }
      else {
        return !this.authService.isLoggedIn();
      }
    }
  }