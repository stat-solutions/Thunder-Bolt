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

// business unit section
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
  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/user/getAllUsers`);
  }
  getUsersForApproval(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/user/getUsersForApproval`);
  }
  rejectUsers(postData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/user/putRejectUserApproval`, postData, this.httpOptions);
  }
  getUserProfile(userId: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/user/getUser/?id=${userId}`);
  }
  setUserProfile(postData: any): any {
    return this.http.post(`${this.API_URL}/api/user/putUser`, postData, this.httpOptions);
  }
  setNewPassword(postData: string, userId: number ): any{
    return this.http.put(`${this.API_URL}/api/business/users/?id=${userId}`, postData, this.httpOptions);
  }

//  creating area town and station
    createArea(postData: any): any {
      return this.http.post(`${this.API_URL}/api/areaUser/postAreaCreate`, postData, this.httpOptions);
    }
    createTheArea(postData: any): any {
      return this.http.post(`${this.API_URL}/api/areaUser/postCreateAreaLocation`, postData, this.httpOptions);
    }
    createTown(postData: any): any {
      return this.http.post(`${this.API_URL}/api/townUser/postTownCreate`, postData, this.httpOptions);
    }
    createTheTown(postData: any): any {
      return this.http.post(`${this.API_URL}/api/townUser/postCreateTownLocation`, postData, this.httpOptions);
    }
    createStation(postData: any): any {
      return this.http.post(`${this.API_URL}/api/stationUser/postStationCreate`, postData, this.httpOptions);
    }
    createTheStation(postData: any): any {
      return this.http.post(`${this.API_URL}/api/stationUser/postCreateStationLocation`, postData, this.httpOptions);
    }

// get areas towns and stations
    getAreas(): Observable<any> {
      return this.http.get<any>(`${this.API_URL}/api/areaUser/getAllAreas`);
    }
    getAllTheAreaLocations(): Observable<any> {
      return this.http.get<any>(`${this.API_URL}/api/areaUser/getAllAreaLocations`);
    }
    getAllTheAreaLocationTotals(): Observable<any> {
      return this.http.get<any>(`${this.API_URL}/api/areaUser/getTotalAreaLocations`);
    }
    getTowns(): Observable<any> {
      return this.http.get<any>(`${this.API_URL}/api/townUser/getAllTowns`);
    }
    getAllTheTownLocations(): Observable<any> {
      return this.http.get<any>(`${this.API_URL}/api/townUser/getAllTownLocations`);
    }
    getAllTheTownLocationTotals(): Observable<any> {
      return this.http.get<any>(`${this.API_URL}/api/townUser/getTotalTownLocations`);
    }
    getStations(): Observable<any> {
      return this.http.get<any>(`${this.API_URL}/api/stationUser/getAllStations`);
    }
    getAllTheStationLocations(): Observable<any> {
      return this.http.get<any>(`${this.API_URL}/api/stationUser/getAllStationLocations`);
    }
    getAllTheStationLocationTotal(): Observable<any> {
      return this.http.get<any>(`${this.API_URL}/api/stationUser/getTotalStationLocations`);
    }

// get areas towns and stations to approve
    getAreasToApprove(userId: number): Observable<any> {
      return this.http.get<any>(`${this.API_URL}/api/areaUser/getAreasForApproval/?id=${userId}`);
    }
    getTownsToApprove(userId: number): Observable<any> {
      return this.http.get<any>(`${this.API_URL}/api/townUser/getTownsForApproval/?id=${userId}`);
    }
    getStationsToApprove(userId: number): Observable<any> {
      return this.http.get<any>(`${this.API_URL}/api/stationUser/getStationsForApproval/?id=${userId}`);
    }

// post approved areas towns and stations
    approveAreas(postData: Array<object>): any {
      return this.http.post(`${this.API_URL}/api/areaUser/putApproveRegionArea`, postData, this.httpOptions);
    }
    rejectAreas(postData: Array<object>): any {
      return this.http.post(`${this.API_URL}/api/areaUser/putRejectAreaApproval`, postData, this.httpOptions);
    }
    approveTowns(postData: Array<object>): any {
      return this.http.post(`${this.API_URL}/api/townUser/putApproveTown`, postData, this.httpOptions);
    }
    rejectTowns(postData: Array<object>): any {
      return this.http.post(`${this.API_URL}/api/townUser/putRejectTownApproval`, postData, this.httpOptions);
    }
    approveStations(postData: Array<object>): any {
      return this.http.post(`${this.API_URL}/api/stationUser/putApproveStation`, postData, this.httpOptions);
    }
    rejectStations(postData: Array<object>): any {
      return this.http.post(`${this.API_URL}/api/stationUser/putRejectStationApproval`, postData, this.httpOptions);
    }
// set managers
    setAreaManager(postData: Array<object>): any {
      return this.http.post(`${this.API_URL}/api/areaUser/postSetAreaManager`, postData, this.httpOptions);
    }
    setTownManager(postData: Array<object>): any {
      return this.http.post(`${this.API_URL}/api/townUser/postSetupTownManager`, postData, this.httpOptions);
    }
    setStationManager(postData: Array<object>): any {
      return this.http.post(`${this.API_URL}/api/stationUser/postSetupStationManager`, postData, this.httpOptions);
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
