import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'ngx-alerts';
import { CustomValidator } from 'src/app/validators/custom-validator';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { OthersService } from 'src/app/shared/services/other-services/others.service';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss'],
})
export class AreaComponent implements OnInit {
  public modalRef: BsModalRef;
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
    this.userForm = this .createFormGroup();
  }

  createFormGroup(): any {
    return this.fb.group({
      report_type: this.fb.control('', Validators.compose([])),
      range_date: this.fb.control('', Validators.compose([])),
    });
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
      this.userForm.controls.range_date.setValue('');
    }
  }
  fetchReports(dates: Array<string>, typeOfReport: string): any{
    switch (typeOfReport){
      case 'Cash Ledger':
        this.others.getCashLedgerTown({
          theStationLocationId: this.User.userLocationId,
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
            }
          },
          err => {
            console.log(err);
          }
        );
        break;
      case 'All Loans':
        this.others.getAllLoansByTown(this.User.userLocationId).subscribe(
            res => {
              this.singleReport = res;
            },
            err => {
              console.log(err);
            }
        );
        break;
      case 'Revenue Ledger':
        this.others.getAllRevenueTown({
          theTownLocationId: this.User.userLocationId,
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
}
