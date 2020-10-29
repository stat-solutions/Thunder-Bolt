import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpErrorResponse, HttpClient, HttpParams, HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { Approvals } from 'src/app/admin/components/approval-setup/approval-setup.component';
import { CompanyInfo } from '../../models/company';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { UserInfo } from '../../models/user-info';
import { AnyNaptrRecord } from 'dns';
import { AreaApprovals } from 'src/app/centralmanagement/components/approvals/approve-areas/approve-areas.component';
import { TownApprovals } from 'src/app/centralmanagement/components/approvals/approve-towns/approve-towns.component';
import { StationApprovals } from 'src/app/centralmanagement/components/approvals/approve-stations/approve-stations.component';
import { AreaInfo } from '../../models/area-ifo';
import { TownInfo } from '../../models/town-info';
import { StationInfo } from '../../models/station-info';
import { Client } from '../../models/client';
@Injectable({
  providedIn: 'root'
})
export class OthersService {
  private API_URL = environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(
    private http: HttpClient, private router: Router) { }
    testApi(): Observable<any> {
      return this.http.get<any>(`${this.API_URL}/api/auth/getSms`)
        .pipe(
          tap(res => console.log()),
          catchError(async (err) => console.log(err))
        );
    }
//  create company section
    createCompany(postData: CompanyInfo): Observable<any>{
      return this.http.post<any>(`${this.API_URL}/api/adminUser/setUpCompany`, postData, this.httpOptions)
        .pipe(
          tap(res => console.log(`AFTER MAP: ${res}`)),
          catchError(this.handleCompanySetupError)
        );
    }
    updateCompanyLogo(postData: any): Observable<any>{
      return this.http.post<any>(`${this.API_URL}/api/adminUser/updateCompanyLogo`, postData, this.httpOptions)
        .pipe(
          tap(res => console.log(`AFTER MAP: ${res}`)),
          // catchError(this.handleCompanySetupError)
        );
    }
    getCompanyInfo(): Observable<CompanyInfo> {
      return this.http.get<CompanyInfo>(`${this.API_URL}/api/adminUser/getTheCompanyDetails`)
          .pipe(
          catchError(this.OtherErrors)
        ) as Observable<CompanyInfo>;
  }
  // approvals and business unit
  getApprovalLevelsCreate(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/adminUser/itemsRequiringApprovalCreate`);
  }
  getApprovalLevelsUpdate(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/adminUser/itemsRequiringApprovalUpdate`);
  }
  setApprovalLevel(postData: any): any {
    return this.http.post(`${this.API_URL}/api/adminUser/putItemsRequiringApprovalCreate`, postData, this.httpOptions);
  }

  getBussinessUnits(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/adminUser/getAllBusinessUnits`);
  }
  setBussinessUnits(postData: any): any {
    return this.http.post(`${this.API_URL}/api/adminUser/postBusinessUnit`, postData, this.httpOptions);
  }
  editBussinessUnits(postData: any): any {
    return this.http.post(`${this.API_URL}/api/adminUser/putTheBusinessUnit`, postData, this.httpOptions);
  }

// users and set user profile
  getUsers(): Observable<UserInfo> {
    return this.http.get<UserInfo>(`${this.API_URL}/api/business/users`);
  }
  getUserProfile(userId: number): Observable<UserInfo> {
    return this.http.get<UserInfo>(`${this.API_URL}/api/business/users/${userId}`);
  }
  setUserProfile(postData: FormGroup, userId: number ): any {
    return this.http.put(`${this.API_URL}/api/business/users/${userId}`, postData.value, this.httpOptions);
  }
  setNewPassword(postData: string, userId: number ): any{
    return this.http.put(`${this.API_URL}/api/business/users/${userId}`, postData, this.httpOptions);
  }
  // top results
  getTopUsers(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/business/topusers`);
  }
  getTopClients(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/bussiness/topclients`);
  }
  getTopStations(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/business/topstations`);
  }

//  creating area town and station
    createArea(postData: string): any {
      return this.http.post(`${this.API_URL}/api/business/createarea`, postData, this.httpOptions);
    }
    createTown(postData: string): any {
      return this.http.post(`${this.API_URL}/api/business/createtown`, postData, this.httpOptions);
    }
    createStaion(postData: string): any {
      return this.http.post(`${this.API_URL}/api/business/createstation`, postData, this.httpOptions);
    }
// client section
    enrollClient(postData: Array<object>): any {
      return this.http.post(`${this.API_URL}/api/business/enrollclient`, postData, this.httpOptions);
    }

    getClients(): Observable<Client> {
      return this.http.get<Client>(`${this.API_URL}/api/business/clients`);
    }
// get areas towns and stations
     getAreas(): Observable<AreaInfo[]> {
      return this.http.get<AreaInfo[]>(`${this.API_URL}/api/business/areas`);
    }
    getTowns(): Observable<TownInfo[]> {
      return this.http.get<TownInfo[]>(`${this.API_URL}/api/business/towns`);
    }
    getStations(): Observable<StationInfo[]> {
      return this.http.get<StationInfo[]>(`${this.API_URL}/api/business/stations`);
    }

    getAreasToApprove(): Observable<AreaApprovals[]> {
      return this.http.get<AreaApprovals[]>(`${this.API_URL}/api/business/approvalareas`);
    }
    getTownsToApprove(): Observable<TownApprovals[]> {
      return this.http.get<TownApprovals[]>(`${this.API_URL}/api/business/approvaltowns`);
    }
    getStationsToApprove(): Observable<StationApprovals[]> {
      return this.http.get<StationApprovals[]>(`${this.API_URL}/api/business/approvalstations`);
    }
    approvedAreas(postData: Array<object>): any {
      return this.http.post(`${this.API_URL}/api/business/approvedareas`, postData, this.httpOptions);
    }
    approvedTowns(postData: Array<object>): any {
      return this.http.post(`${this.API_URL}/api/business/approvedtowns`, postData, this.httpOptions);
    }
    approvedStations(postData: Array<object>): any {
      return this.http.post(`${this.API_URL}/api/business/approvedstations`, postData, this.httpOptions);
    }
    rejectedApprovalsArea(postData: Array<object>): any {
      return this.http.post(`${this.API_URL}/api/business/rejectedareas`, postData, this.httpOptions);
    }
    rejectedApprovalsTown(postData: Array<object>): any {
      return this.http.post(`${this.API_URL}/api/business/rejectedtowns`, postData, this.httpOptions);
    }
    rejectedApprovalsStation(postData: Array<object>): any {
      return this.http.post(`${this.API_URL}/api/business/rejectedstations`, postData, this.httpOptions);
    }

    private handleCompanySetupError(errorResponse: HttpErrorResponse): any {

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
      return throwError(`Company Setup failed!!
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
