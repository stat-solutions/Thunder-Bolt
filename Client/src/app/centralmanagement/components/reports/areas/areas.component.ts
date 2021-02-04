import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { OthersService } from 'src/app/shared/services/other-services/others.service';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss']
})
export class AreasComponent implements OnInit {
  public modalRef: BsModalRef;
  posted: boolean;
  errored: boolean;
  userForm: FormGroup;
  user = '/../../../assets/img/man.svg';
  type: string;
  reports = [
    'All Loans', 'Normal Loans', 'Completed Loans', 'Defaulters', 'Float Deposits',
     'Revenue Ledger', 'Lost Revenue', 'Cash Ledger', 'Paid Ledger',
    'Borrowed Ledger', 'Recovery', 'Enforcement', 'Savings', 'General Savings',
    'Float Withdraws', 'Float Deposit & Withdraw', 'Waived Principal', 'Reversed Principal',
    'Waived Interest', 'Loan Transaction', 'Interest', 'Float Balance Per Day', 'Commission',
    'Security', 'Taxi Loan', 'Micro Loan', 'Micro Loan Guarantor', 'Micro Loan Security',
    'Micro Loan Amortization', 'Bodaboda Loan', 'Transaction Details'
  ];
  User = this.authService.loggedInUserInfo();
  singleReport: any;
  imageUrl: string;
  totals: any;
  stationName: string;
  locations: any;
  locationId: any;
  level: any;
  areas: any;
  towns: any;
  stations: any;
  select: string;
  pageSize: number;
  p: number;
  total: number;
  constructor(
    private fb: FormBuilder,
    private modalService: BsModalService,
    private authService: AuthServiceService,
    private others: OthersService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
    ) {}

  ngOnInit(): void {
    this.reports.sort();
    this.others.getAllTheStationLocations().subscribe(
      res => this.stations = res,
      err => console.log(err)
    );
    this.others.getAllTheTownLocations().subscribe(
      res => this.towns = res,
      err => console.log(err)
    );
    this.others.getAllTheAreaLocations().subscribe(
      res => this.areas = res,
      err => console.log(err)
    );
    this.userForm = this .createFormGroup();
    this.select = 'place holder';
    this.pageSize = 10;
  }

  createFormGroup(): any {
    return this.fb.group({
      report_type: this.fb.control('', Validators.compose([])),
      search_by: this.fb.control('', Validators.compose([])),
      location: this.fb.control('', Validators.compose([])),
      range_date: this.fb.control('', Validators.compose([])),
    });
  }
  changeLevels(val: string): any{
    switch (val) {
      case 'Region':
        this.level = val;
        this.select = `select a ${val}`;
        this.locations = this.areas;
        break;
      case 'Town':
        this.level = val;
        this.select = `select a ${val}`;
        this.locations = this.towns;
        break;
      case 'Station':
        this.level = val;
        this.select = `select a ${val}`;
        this.locations = this.stations;
        break;
    }
  }
  changeReport(val: any): any {
    // console.log(val);
    this.type = val;
    const date = new Date();
    const startDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const endDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    this.fetchReports([startDate, endDate], this.type);
  }
  fetchReport(val: any): any {
    if (val.length > 1) {
      const startDate = `${val[0].getFullYear()}-${val[0].getMonth() + 1}-${val[0].getDate()}`;
      const endDate = `${val[1].getFullYear()}-${val[1].getMonth() + 1}-${val[1].getDate()}`;
      this.fetchReports([startDate, endDate], this.type);
    }
  }
  fetchReports(dates: Array<string>, typeOfReport: string): any{
    switch (typeOfReport){
      case 'Cash Ledger':
        this.p = 1;
        this.total = 0;
        const locatioVal = this.userForm.controls.location.value;
        if ( locatioVal !== '') {
          switch (this.level) {
            case 'Region':
              this.locations.forEach(location => {
                if (location.areaRegionName === locatioVal){
                  this.others.getCashLedgerArea({
                    theAreaLocationId: location.theAreaLocationId,
                    startDate: dates[0],
                    endDate: dates[1],
                  }).subscribe(
                    res => {
                      if (res.length === 1) {
                        this.totals = res[0];
                        this.singleReport = [];
                      }else {
                        this.totals = res.pop();
                        this.singleReport = res;
                        this.total = this.singleReport.length;
                      }
                    },
                    err => {
                      console.log(err);
                    }
                  );
                }
              });
              break;
            case 'Town':
              this.locations.forEach(location => {
                if (location.townName === locatioVal){
                  this.others.getCashLedgerTown({
                    theTownLocationId: location.theTownLocationId,
                    startDate: dates[0],
                    endDate: dates[1],
                  }).subscribe(
                    res => {
                      if (res.length === 1) {
                        this.totals = res[0];
                        this.singleReport = [];
                      }else {
                        this.totals = res.pop();
                        this.singleReport = res;
                        this.total = this.singleReport.length;
                      }
                    },
                    err => {
                      console.log(err);
                    }
                  );
                }
              });
              break;
            case 'Station':
              this.locations.forEach(location => {
                if (location.stationName === locatioVal){
                  this.others.getCashLedgerStation({
                    theStationLocationId: location.theStationLocationId,
                    startDate: dates[0],
                    endDate: dates[1],
                  }).subscribe(
                    res => {
                      if (res.length === 1) {
                        this.totals = res[0];
                        this.singleReport = [];
                      }else {
                        this.totals = res.pop();
                        this.singleReport = res;
                        this.total = this.singleReport.length;
                      }
                    },
                    err => {
                      console.log(err);
                    }
                  );
                }
              });
              break;
            }
        }
        break;
      case 'All Loans':
        this.p = 1;
        this.total = 0;
        this.others.getAllLoans().subscribe(
            res => {
              this.singleReport = res;
              this.total = this.singleReport.length;
            },
            err => {
              console.log(err);
            }
          );
        break;
      case 'Revenue Ledger':
        this.p = 1;
        this.total = 0;
        this.others.getAllRevenue({
          startDate: dates[0],
          endDate: dates[1],
        }).subscribe(
            res => {
              if (res.length === 1) {
                this.totals = res[0];
                this.singleReport = [];
              }else {
                this.totals = res.pop();
                this.singleReport = res;
                this.total = this.singleReport.length;
              }
            },
            err => {
              console.log(err);
            }
          );
        break;
    }
  }
  public openModal(template: TemplateRef<any>, photoUrl: string): any {
    this.imageUrl = photoUrl;
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-dialog-centered' })
    );
  }
  pageChanged(event): any{
    this.p = event;
  }
}
