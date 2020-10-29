import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Observable, throwError, of } from 'rxjs';
import { HttpHeaders, HttpErrorResponse, HttpClient, HttpParams, HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Tokens } from '../models/tokens';
import { map, tap, catchError, mapTo } from 'rxjs/operators';
import { UserRole } from '../models/user-role';
import { RegisterUser } from '../models/register';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {



    private API_URL = environment.apiUrl;
    private loggedInUser: string;
    private readonly ACCESS_TOKEN = 'ACCESS TOKEN';
    private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';

    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService) { }

    loginNormalUser(postData: any): any {
      return this.http.post<any>(`${this.API_URL}/api/user/loginUser`, postData, this.httpOptions)
        .pipe(
          // tap(tokens => console.log(`${tokens}`)),
          tap(tokens => this.doLoginUser(postData.userPhone1, tokens)),
          mapTo(true),
          catchError(this.handleLoginError)

        );
    }


    testingTheTablePost(postData: FormGroup): any {
      return this.http.post<any>(`${this.API_URL}/api/auth/testTableData`, postData.value, this.httpOptions)
        .pipe(
          // tap(tokens => console.log(`${tokens}`)),
          // tap(tokens => this.doLoginUser(postData.value.main_contact_number, tokens)),
          // mapTo(true),
          catchError(this.handleLoginError)
        );
    }

    isAgentRegistered(id: string): any {
          //  return of(true);
      const options1 = { params: new HttpParams().set('id', id) };
      return this.http.get<any>(`${this.API_URL}/api/auth/isAgentRegistered`, options1)
        .pipe(
          catchError(this.OtherErrors)
        );
    }
    getRoles(): Observable<UserRole[]> {
      return this.http.get<any[]>(`${this.API_URL}/api/auth/userRoles`);
    }

    // logout(): any {
    //   return this.http.post<any>(`${this.API_URL}/api/auth/logout`, { refreshToken: this.getRefreshToken() })
    //     .pipe(
    //       tap(() => this.doLogoutUser()),
    //       mapTo(true),
    //       catchError(error => {
    //         this.handleLoginError(error);
    //         return of(false);
    //       }
    //       )
    //     );
    // }

    registerUser(postData: RegisterUser): any {
      return this.http.post<any>(`${this.API_URL}/api/user/registerUser`, postData, this.httpOptions)
        .pipe(
          map((res: string) => res),
          tap(res => console.log(`AFTER MAP: ${res}`)),
          catchError(this.handleRegisterError)
        );
    }
    changePIN(postData: any): any {
      return this.http.post<any>(`${this.API_URL}/api/user/registerUser`, postData.value, this.httpOptions)
        .pipe(
          // tap(tokens => console.log(`${tokens}`)),
          tap(tokens => this.doLoginUser(postData.value.main_contact_number, tokens)),
          mapTo(true),
          catchError(this.handleLoginError)
        );
    }
    // tslint:disable-next-line: typedef
    doLoginUser(phoneNubmer: string, tokens: Tokens): any {
      this.loggedInUser = phoneNubmer;
      this.storeTokens(tokens);
    }

    doLogoutUser(): any {
      this.loggedInUser = null;
      this.removeTokens();
    }

    private removeTokens(): any {
      localStorage.removeItem(this.ACCESS_TOKEN);
      localStorage.removeItem(this.REFRESH_TOKEN);
    }

    isLoggedIn(): any {
      return !!this.getJwtToken();
    }
    loggedInUserInfo(): any {
      return {
        userName: this.jwtHelper.decodeToken(this.getJwtToken()).userName,
        userId: this.jwtHelper.decodeToken(this.getJwtToken()).userId,
        userPhone: this.jwtHelper.decodeToken(this.getJwtToken()).userPhone1,
        accessRights: this.jwtHelper.decodeToken(this.getJwtToken()).fkAccessRightsIdUser,
      };
    }

    getJwtToken(): any {
      return localStorage.getItem(this.ACCESS_TOKEN);
    }

    refreshToken(): any {
      console.log('am refreshing');
      return this.http.post<any>(`${this.API_URL}/api/user/userRefreshToken`, {
        refreshToken: this.getRefreshToken()
      }).pipe(tap((tokens: Tokens) => {
        this.storeJwtToken(tokens.accessToken);
      }));
    }

    storeJwtToken(accessToken: string): any {
      localStorage.setItem(this.ACCESS_TOKEN, accessToken);
    }

    getRefreshToken(): any {
      return localStorage.getItem(this.REFRESH_TOKEN);
    }

    private storeTokens(tokens: Tokens): any {
      localStorage.setItem(this.ACCESS_TOKEN, tokens.accessToken);
      localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
    }

    private handleLoginError(errorResponse: HttpErrorResponse): any {

      if (errorResponse.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', errorResponse.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(
          `Backend returned code ${errorResponse.status},` +
          `body was: ${errorResponse.error}`);
      }
      // return an observable with a user-facing error message
      return throwError(`Authorisation Failed!!
      ${(errorResponse.status === 0 || errorResponse.status === 500 || errorResponse.status === 200) ?
          'The Back End was not able to Handle this Request' : errorResponse.error}
  !!`);
    }


    private handleRegisterError(errorResponse: HttpErrorResponse): any {

      if (errorResponse.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', errorResponse.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(
          `Backend returned code ${errorResponse.status}, ` +
          `body was: ${errorResponse.error}`);
      }
      // return an observable with a user-facing error message
      return throwError(`User Registration failed!!
      ${(errorResponse.status === 500 || errorResponse.status === 0 || errorResponse.status === 200) ?
          'The Back End was not able to Handle this Request' : errorResponse.error}
  !!`);
    }

    private OtherErrors(errorResponse: HttpErrorResponse): any {

      if (errorResponse.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', errorResponse.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(
          `Backend returned code ${errorResponse.status}, ` +
          `body was: ${errorResponse.error}`);
      }
      // return an observable with a user-facing error message
      return throwError('The backend was not able to handle this request. Please contact system admin 0781331616.');
    }
}
