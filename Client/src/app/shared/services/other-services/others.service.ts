import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpErrorResponse, HttpClient, HttpParams, HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { CompanyInfo } from '../../models/company';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AnyNaptrRecord } from 'dns';
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
  getBussinessUnitLocations(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/adminUser/getAllBusinessUnitLocations`);
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
  getUsersByLocation(locationId: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/user/getUsersPerLocation/?id=${locationId}`);
  }
  getUsersForApproval(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/user/getUsersForApproval`);
  }
  rejectUsers(postData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/user/putRejectUserApproval`, postData, this.httpOptions);
  }
  approveUsers(postData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/user/putApproveUser`, postData, this.httpOptions);
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
    getAllTheAreaLocationTotal(): Observable<any> {
      return this.http.get<any>(`${this.API_URL}/api/areaUser/getTotalAreaLocations`);
    }
    getTowns(): Observable<any> {
      return this.http.get<any>(`${this.API_URL}/api/townUser/getAllTowns`);
    }
    getAllTheTownLocations(): Observable<any> {
      return this.http.get<any>(`${this.API_URL}/api/townUser/getAllTownLocations`);
    }
    getAllTheTownLocationTotal(): Observable<any> {
      return this.http.get<any>(`${this.API_URL}/api/townUser/getTotalTownLocations`).pipe(
      );
    }
    getStations(): Observable<any> {
      return this.http.get<any>(`${this.API_URL}/api/stationUser/getAllStations`);
    }
    getAllTheStationLocationsByTown(id: any): Observable<any> {
      return this.http.get<any>(`${this.API_URL}/api/stationUser/getStationLocationsByTownLocation/?towmLocationId=${id}`);
    }
    getAllTheStationLocationsByArea(id: any): Observable<any> {
      return this.http.get<any>(`${this.API_URL}/api/stationUser/getStationLocationsByAreaLocation/?areaLocationId=${id}`);
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
    setAreaManager(postData: any): any {
      return this.http.post(`${this.API_URL}/api/areaUser/postSetAreaManager`, postData, this.httpOptions);
    }
    setTownManager(postData: any): any {
      return this.http.post(`${this.API_URL}/api/townUser/postSetupTownManager`, postData, this.httpOptions);
    }
    setStationManager(postData: any): any {
      return this.http.post(`${this.API_URL}/api/stationUser/postSetupStationManager`, postData, this.httpOptions);
    }

//  bussiness section
    createTaxiPark(postData: any): any {
      return this.http.post(`${this.API_URL}/api/customer/postCreateTaxiPark`, postData, this.httpOptions);
    }
    updateTaxiPark(postData: any): any {
      return this.http.post(`${this.API_URL}/api/customer/putUpdateTaxiPark`, postData, this.httpOptions);
    }
    getTaxiParks(): any{
      return this.http.get<any>(`${this.API_URL}/api/customer/getTaxiParks`);
    }
    createTaxiStage(postData: any): any {
      return this.http.post(`${this.API_URL}/api/customer/postCreateTaxiStage`, postData, this.httpOptions);
    }
    updateTaxiStage(postData: any): any {
      return this.http.post(`${this.API_URL}/api/customer/putUpdateTaxiStage`, postData, this.httpOptions);
    }
    getTaxiStages(): any{
      return this.http.get<any>(`${this.API_URL}/api/customer/getTaxiStages`);
    }
    createBodaCluster(postData: any): any {
      return this.http.post(`${this.API_URL}/api/customer/postCreateBodaBodaCluster`, postData, this.httpOptions);
    }
    updateBodaCluster(postData: any): any {
      return this.http.post(`${this.API_URL}/api/customer/postCreateBodaBodaCluster`, postData, this.httpOptions);
    }
    getBodaClusters(): any{
      return this.http.get<any>(`${this.API_URL}/api/customer/getBodabodaClusters`);
    }
    createBodaStage(postData: any): any {
      return this.http.post(`${this.API_URL}/api/customer/postCreateBodaBodaStage`, postData, this.httpOptions);
    }
    updateBodaStage(postData: any): any {
      return this.http.post(`${this.API_URL}/api/customer/putUpdateBodaBodaStage`, postData, this.httpOptions);
    }
    getBodaStages(): any{
      return this.http.get<any>(`${this.API_URL}/api/customer/getBodabodaStages`);
    }
    getProducts(): Observable<any> {
      return this.http.get<any>(`${this.API_URL}/api/customer/getheTheProducts`);
    }
    createCustomer(postData: any): any {
      return this.http.post(`${this.API_URL}/api/customer/postCreateCustomer`, postData, this.httpOptions);
    }
    updateCustomer(postData: any): any {
      return this.http.post(`${this.API_URL}/api/customer/putUpdateCustomer`, postData, this.httpOptions);
    }
    createBodaCustomer(postData: any): any {
      return this.http.post(`${this.API_URL}/api/customer/postCreateBodaBodaCustomer`, postData, this.httpOptions);
    }
    updateBodaCustomer(postData: any): any {
      return this.http.post(`${this.API_URL}/api/customer/putUpdateBodabodaCustomer`, postData, this.httpOptions);
    }
    createTaxiCustomer(postData: any): any {
      return this.http.post(`${this.API_URL}/api/customer/postCreateTaxiCustomer`, postData, this.httpOptions);
    }
    updateTaxiCustomer(postData: any): any {
      return this.http.post(`${this.API_URL}/api/customer/putUpdateTaxiCustomer`, postData, this.httpOptions);
    }
    createMicroloanCustomer(postData: any): any {
      return this.http.post(`${this.API_URL}/api/customer/postCreateMicroloanCustomer`, postData, this.httpOptions);
    }
    updateMicroloanCustomer(postData: any): any {
      return this.http.post(`${this.API_URL}/api/customer/putUpdateMicroLoanCustomer`, postData, this.httpOptions);
    }
    createSavingsCustomer(postData: any): any {
      return this.http.post(`${this.API_URL}/api/customer/postCreateMicroloanCustomer`, postData, this.httpOptions);
    }
    updateSavingsCustomer(postData: any): any {
      return this.http.post(`${this.API_URL}/api/customer/putUpdateSavingsCustomer`, postData, this.httpOptions);
    }
    getCustomers(): any{
      return this.http.get<any>(`${this.API_URL}/api/customer/getAllCustomersOnly`);
    }
    getOneCustomer(id: number): any{
      return this.http.get<any>(`${this.API_URL}/api/customer/getOneCustomer/?customerId=${id}`);
    }
    getCustomersByArea(id: number): any{
      return this.http.get<any>(`${this.API_URL}/api/customer/getAreaCustomers/?theAreaLocationId=${id}`);
    }
    getCustomersByTown(id: number): any{
      return this.http.get<any>(`${this.API_URL}/api/customer/getTownCustomers/?theTownLocationId=${id}`);
    }
    getCustomersByStation(id: number): any{
      return this.http.get<any>(`${this.API_URL}/api/customer/getStationCustomers/?theStationLocationId=${id}`);
    }
    getBodaCustomers(): any{
      return this.http.get<any>(`${this.API_URL}/api/customer/getAllCustomersWithBodabodaLoanProduct`);
    }
    getBodaCustomer(id: number): any{
      return this.http.get<any>(`${this.API_URL}/api/customer/getOneCustomerWithBodabodaLoanProduct/?customerId=${id}`);
    }
    getBodaCustomersByArea(id: number): any{
      return this.http.get<any>(`${this.API_URL}/api/customer/getAreaCustomersWithBodabodaLoanProduct/?theAreaLocationId=${id}`);
    }
    getBodaCustomersByTown(id: number): any{
      return this.http.get<any>(`${this.API_URL}/api/customer/getTownCustomersWithBodabodaLoanProduct/?theTownLocationId=${id}`);
    }
    getBodaCustomersByStation(id: number): any{
      return this.http.get<any>(`${this.API_URL}/api/customer/getStationCustomersWithBodabodaLoanProduct/?theStationLocationId=${id}`);
    }
    getTaxiCustomers(): any{
      return this.http.get<any>(`${this.API_URL}/api/customer/getAllCustomersWithTaxiLoanProduct`);
    }
    getTaxiCustomer(id: number): any{
      return this.http.get<any>(`${this.API_URL}/api/customer/getOneCustomerWithTaxiLoanProduct/?customerId=${id}`);
    }
    getTaxiCustomersByArea(id: number): any{
      return this.http.get<any>(`${this.API_URL}/api/customer/getAreaCustomersWithTaxiLoanProduct/?theAreaLocationId=${id}`);
    }
    getTaxiCustomersByTown(id: number): any{
      return this.http.get<any>(`${this.API_URL}/api/customer/getTownCustomersWithTaxiLoanProduct/?theTownLocationId=${id}`);
    }
    getTaxiCustomersByStation(id: number): any{
      return this.http.get<any>(`${this.API_URL}/api/customer/getStationCustomersWithTaxiLoanProduct/?theStationLocationId=${id}`);
    }
    getMicroCustomers(): any{
      return this.http.get<any>(`${this.API_URL}/api/customer/getAllCustomersWithMicroLoanProduct`);
    }
    getMicroCustomer(id: number): any{
      return this.http.get<any>(`${this.API_URL}/api/customer/getOneCustomerWithMicroLoanProduct/?customerId=${id}`);
    }
    getMicroCustomersByArea(id: number): any{
      return this.http.get<any>(`${this.API_URL}/api/customer/getAreaCustomersWithMicroLoanProduct/?theAreaLocationId=${id}`);
    }
    getMicroCustomersByTown(id: number): any{
      return this.http.get<any>(`${this.API_URL}/api/customer/getTownCustomersWithMicroLoanProduct/?theTownLocationId=${id}`);
    }
    getMicroCustomersByStation(id: number): any{
      return this.http.get<any>(`${this.API_URL}/api/customer/getStationCustomersWithMicroLoanProduct/?theStationLocationId=${id}`);
    }
    getSavingsCustomers(): any{
      return this.http.get<any>(`${this.API_URL}/api/customer/getAllCustomersWithSavingsProduct`);
    }
    getSavingsCustomer(id: number): any{
      return this.http.get<any>(`${this.API_URL}/api/customer/getOneCustomerWithSavingsProduct/?customerId=${id}`);
    }
    getSavingsCustomersByArea(id: number): any{
      return this.http.get<any>(`${this.API_URL}/api/customer/getAreaCustomersWithSavingsProduct/?theAreaLocationId=${id}`);
    }
    getSavingsCustomersByTown(id: number): any{
      return this.http.get<any>(`${this.API_URL}/api/customer/getTownCustomersWithSavingsProduct/?theTownLocationId=${id}`);
    }
    getSavingsCustomersByStation(id: number): any{
      return this.http.get<any>(`${this.API_URL}/api/customer/getStationCustomersWithSavingsProduct/?theStationLocationId=${id}`);
    }
    getAreaSavingsCustomerToApprove(id: number): any{
      return this.http.get<any>(`${this.API_URL}/api/customer/getAreaSavingsCustomersForVerification/?theAreaLocationId=${id}`);
    }
    putVerifySavingsCustomer(postData: Array<object>): any {
      return this.http.post(`${this.API_URL}/api/customer/putVerifySavingsCustomer`, postData, this.httpOptions);
    }
    putRejectSavingsCustomer(postData: Array<object>): any {
      return this.http.post(`${this.API_URL}/api/customer/putRejectSavingsCustomerVerify`, postData, this.httpOptions);
    }
    getAreaTaxiCustomerToApprove(id: number): any{
      return this.http.get<any>(`${this.API_URL}/api/customer/getAreaTaxiCustomerForVerification/?theAreaLocationId=${id}`);
    }
    putVerifyTaxiCustomer(postData: Array<object>): any {
      return this.http.post(`${this.API_URL}/api/customer/putVerifyTaxiCustomer`, postData, this.httpOptions);
    }
    putRejectTaxiCustomer(postData: Array<object>): any {
      return this.http.post(`${this.API_URL}/api/customer/putRejectTaxiCustomerVerify`, postData, this.httpOptions);
    }
    getAreaMicroCustomerToApprove(id: number): any{
      return this.http.get<any>(`${this.API_URL}/api/customer/getAreaMicroloanCustomerForVerification/?theAreaLocationId=${id}`);
    }
    putVerifyMicroCustomer(postData: Array<object>): any {
      return this.http.post(`${this.API_URL}/api/customer/putVerifyMicroLoanCustomer`, postData, this.httpOptions);
    }
    putRejectMicroCustomer(postData: Array<object>): any {
      return this.http.post(`${this.API_URL}/api/customer/putRejectMicroLoanCustomerVerify`, postData, this.httpOptions);
    }
    getAreaBodaBodaCustomerToApprove(id: number): any{
      return this.http.get<any>(`${this.API_URL}/api/customer/getAreaBodabodaCustomerForVerification/?theAreaLocationId=${id}`);
    }
    putVerifyBodaBodaCustomer(postData: Array<object>): any {
      return this.http.post(`${this.API_URL}/api/customer/putVerifyBodaBodaCustomer`, postData, this.httpOptions);
    }
    putRejectBodaBodaCustomer(postData: Array<object>): any {
      return this.http.post(`${this.API_URL}/api/customer/putRejectBodaBodaCustomerVerify`, postData, this.httpOptions);
    }
    getTxnDetails(): any{
      return this.http.get<any>(`${this.API_URL}/api/loan/getTxnDetails`);
    }
    putTxnCustomer(postData: any): any {
      return this.http.post(`${this.API_URL}/api/loan/postTxnCustomer`, postData, this.httpOptions);
    }
    putTxnCustomerApproval(postData: any): any {
      return this.http.post(`${this.API_URL}/api/loan/postTxnCustomerApproval`, postData, this.httpOptions);
    }
    putTxnNoneCustomer(postData: any): any {
      return this.http.post(`${this.API_URL}/api/loan/postTxnNonCustomer`, postData, this.httpOptions);
    }
    postSetStationLoanLimit(postData: any): any {
      return this.http.post(`${this.API_URL}/api/loan/postSetStationLoanLimit`, postData, this.httpOptions);
    }
    postSetStationLoanTenure(postData: any): any {
      return this.http.post(`${this.API_URL}/api/loan/postSetStationLoanTenure`, postData, this.httpOptions);
    }
    postSetStationNumberOfDaysForAccrualInterest(postData: any): any {
      return this.http.post(`${this.API_URL}/api/loan/postSetStationNumberOfDaysForAccrualInterest`, postData, this.httpOptions);
    }
    postSetStationCommissionRate(postData: any): any {
      return this.http.post(`${this.API_URL}/api/loan/postSetStationCommissionRate`, postData, this.httpOptions);
    }
    postSetStationLoanInterestRate(postData: any): any {
      return this.http.post(`${this.API_URL}/api/loan/postSetStationLoanInterestRate`, postData, this.httpOptions);
    }
    getLoadDetails(postData: any): any{
      return this.http.post(`${this.API_URL}/api/loan/getCustomerLoanDetails`, postData);
    }
    getSecurityType(): any{
      return this.http.get(`${this.API_URL}/api/loan/getSecurityType`);
    }
    verifyUserWithPin(postData: any): any {
      return this.http.post(`${this.API_URL}/api/user/verifyUserWithPin`, postData );
    }
    createMicroLoan(postData: any): any {
      return this.http.post(`${this.API_URL}/api/loan/postCreateMicroloanApproval`, postData );
    }
    getTxnForApproval(): any{
      return this.http.get(`${this.API_URL}/api/loan/getTxnsForApprovalMicroloan`);
    }
    approveTransaction(postData: any): any {
      return this.http.post(`${this.API_URL}/api/loan/postApproveTxnMicron`, postData );
    }
    getTxnApproved(): any{
      return this.http.get(`${this.API_URL}/api/loan/getApprovedTxnsMicroloan`);
    }
    getTxnRejected(): any{
      return this.http.get(`${this.API_URL}api/loan/getRejectedTxnsMicroloan`);
    }
    confirmMicroLoan(postData: any): any {
      return this.http.post(`${this.API_URL}/api/user/verifyUserWithPin`, postData );
    }
    setIdividualLoanLimit(postData: any): any {
      return this.http.post(`${this.API_URL}/api/customer/putSetIndividualLoanLimit`, postData );
    }
    getIdividualLoanLimit(postData: any): any {
      return this.http.get(`${this.API_URL}/api/customer/getIndividualLoanLimitForApproval`);
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
