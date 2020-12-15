import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import * as jwt_decode from 'jwt-decode';
import { CustomValidator } from 'src/app/validators/custom-validator';
import { OthersService } from 'src/app/shared/services/other-services/others.service';

@Component({
  selector: 'app-deposit-float',
  templateUrl: './deposit-float.component.html',
  styleUrls: ['./deposit-float.component.scss']
})
export class DepositFloatComponent implements OnInit {
  userForm: FormGroup;
  errored: boolean;
  posted: boolean;
  serviceErrors: string;
  values: any;
  numberValue: number;
  stations: any;
  User = this.authService.loggedInUserInfo();
  txns: any;

  constructor(
    private authService: AuthServiceService,
    private others: OthersService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.userForm = this.createFormGroup();
    this.others.getAllTheStationLocations().subscribe(
      res => {
        this.stations = res;
      },
      err => {
        console.log(err.error.statusText);
      }
    );
    this.others.getTxnDetails().subscribe(
      res => {
        this.txns = res;
        // console.log(res);
      },
      err => {
        console.log(err.error.statusText);
      }
    );
  }

  createFormGroup(): any {
    return new FormGroup({
      station: new FormControl('', Validators.compose([Validators.required])),
      floatAmount: new FormControl('', Validators.compose([Validators.required
      // CustomValidator.patternValidator(/^\d+$/, { hasNumber: true }
        // )
      ]))
});
  }

  revert(): any {
    this.userForm.reset();
  }
  get fval(): any {
    return this.userForm.controls;
  }

  deposit(): any {
  // this.spinner.show();
    if (this.userForm.valid){
      const data = {
        txnAmount: Number(this.fval.floatAmount.value),
        txnDetailsId: null,
        userId: this.User.userId,
        theStationLocationId: null
      };
      // console.log(this.products);
      for (const station of this.stations){
        if (station.stationName.toUpperCase() === this.fval.station.value.toUpperCase()){
        data.theStationLocationId = station.theStationLocationId;
        }
      }
      for (const txn of this.txns){
        if (txn.txnDetailsTypeName.toUpperCase() === 'FLOATDEPOSIT'){
        data.txnDetailsId = txn.txnDetailsId;
        }
      }
      if (data.theStationLocationId === null){
        this.errored = true;
        this.alertService.danger({
        html: '<b> The station chose do not exist</b>'
        });
      //  this.errored = false;
        return;
      } else {
        this.others.putTxnNoneCustomer(data).subscribe(
          res => {
            this.posted = true;
            this.alertService.success({
              html: '<b> Float was deposited successfully</b>'
            });
            setTimeout(this.revert(), 3000);
          },
          err => {
            this.errored = true;
            if (err.error.status === 500) {
              this.alertService.danger({
                html: '<b> Sever Could Not handle this request</b>'
              });
            } else {
              this.alertService.danger({
                html: '<b>' + err.error.statusText + '</b>'
              });
            }
          }
        );
      }
    } else {
        this.errored = true;
        this.alertService.danger({
          html: '<b> the provided form details are invalid </b>'
        });
      }
    }
  }
