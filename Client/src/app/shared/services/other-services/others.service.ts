import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpErrorResponse, HttpClient, HttpParams, HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { Approvals } from 'src/app/admin/components/approval-setup/approval-setup.component';
import { BussinessUnits } from 'src/app/admin/components/bussinessunits/bussinessunits.component';
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
//  create company section
    createCompany(postData: FormGroup): Observable<any>{
      return this.http.post<any>(`${this.API_URL}/api/admin/companysetup`, postData.value, this.httpOptions)
        .pipe(
          tap(res => console.log(`AFTER MAP: ${res}`)),
          catchError(this.handleCompanySetupError)
        );
    }
    getCompanyInfo(): Observable<CompanyInfo> {
      return this.http.get<CompanyInfo>(`${this.API_URL}/api/admin/companyDetails`)
          .pipe(
          catchError(this.OtherErrors)
        );
  }
// users and set user profile
  getUsers (): Observable<UserInfo> {
    return this.http.get<UserInfo>(`${this.API_URL}/api/users`)
  }
  getUserProfile (userId: number): Observable<UserInfo> {
    return this.http.get<UserInfo>(`${this.API_URL}/api/users/${userId}`)
  }
  setUserProfile (postData: FormGroup, userId: number ) {
    return this.http.put(`${this.API_URL}/api/users/${userId}`, postData.value, this.httpOptions)
  }

// approvals and business unit
    getApprovalDetails():Observable<Approvals[]> {
      // const option = { params: new HttpParams().set("id", "approval details")};
      return this.http.get<Approvals[]>(`${this.API_URL}/api/admin/approvals`)
    }
    setApprovals (postData: FormGroup) {
      return this.http.post(`${this.API_URL}/api/admin/setapprovallevel`, postData.value, this.httpOptions)
    }
  
    getBussinessUnits():Observable<BussinessUnits[]> {
      return this.http.get<BussinessUnits[]>(`${this.API_URL}/api/admin/bussinessunits`)
    }
    setBussinessUnits(postData: string){
      return this.http.post(`${this.API_URL}/api/admin/setbusinessunit`, postData, this.httpOptions)
    }
//  creating area town and station
    createArea(postData: string){
      return this.http.post(`${this.API_URL}/api/central/createarea`, postData, this.httpOptions)
    }
    createTown(postData: string){
      return this.http.post(`${this.API_URL}/api/central/createtown`, postData, this.httpOptions)
    }
    createStaion(postData: string){
      return this.http.post(`${this.API_URL}/api/central/createstation`, postData, this.httpOptions)
    }

// get areas towns and stations 
     getAreas():Observable<AreaInfo[]> {
      return this.http.get<AreaInfo[]>(`${this.API_URL}/api/areas`)
    }
    getTowns():Observable<TownInfo[]> {
      return this.http.get<TownInfo[]>(`${this.API_URL}/api/towns`)
    }
    getStations():Observable<StationInfo[]> {
      return this.http.get<StationInfo[]>(`${this.API_URL}/api/stations`)
    }
// approve items
    getAreasToApprove():Observable<AreaApprovals[]>{
      return this.http.get<AreaApprovals[]>(`${this.API_URL}/api/approvalareas`)
    }
    getTownsToApprove():Observable<TownApprovals[]>{
      return this.http.get<TownApprovals[]>(`${this.API_URL}/api/approvaltowns`)
    }
    getStationsToApprove():Observable<StationApprovals[]>{
      return this.http.get<StationApprovals[]>(`${this.API_URL}/api/approvalstations`)
    }
    approvedAreas(postData: Array<object>) {
      return this.http.post(`${this.API_URL}/api/central/approvedareas`, postData, this.httpOptions)
    }
    approvedTowns(postData: Array<object>) {
      return this.http.post(`${this.API_URL}/api/central/approvedtowns`, postData, this.httpOptions)
    }
    approvedStations(postData: Array<object>) {
      return this.http.post(`${this.API_URL}/api/central/approvedstations`, postData, this.httpOptions)
    } 
    rejectedApprovalsArea (postData: Array<object>){
      return this.http.post(`${this.API_URL}/api/central/rejectedareas`, postData, this.httpOptions)
    }
    rejectedApprovalsTown (postData: Array<object>){
      return this.http.post(`${this.API_URL}/api/central/rejectedtowns`, postData, this.httpOptions)
    }
    rejectedApprovalsStation (postData: Array<object>){
      return this.http.post(`${this.API_URL}/api/central/rejectedstations`, postData, this.httpOptions)
    }

    private handleCompanySetupError(errorResponse: HttpErrorResponse) {

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
    private OtherErrors(errorResponse: HttpErrorResponse) {

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

