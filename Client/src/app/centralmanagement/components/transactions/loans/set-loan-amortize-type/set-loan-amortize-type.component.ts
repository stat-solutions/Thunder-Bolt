import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import * as jwt_decode from 'jwt-decode';
import { CustomValidator } from 'src/app/validators/custom-validator';
import { OthersService } from 'src/app/shared/services/other-services/others.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-set-loan-amortize-type',
  templateUrl: './set-loan-amortize-type.component.html',
  styleUrls: ['./set-loan-amortize-type.component.scss'],
})
export class SetLoanAmortizeTypeComponent implements OnInit {
  modalRef: BsModalRef;
  userForm: FormGroup;
  errored: boolean;
  posted: boolean;
  serviceErrors: string;
  values: any;
  numberValue: number;
  stations: any;
  products: any;
  User = this.authService.loggedInUserInfo();
  checkedClient: any;
  types = [
    { name: 'FLAT RATE', code: 1 },
    { name: 'REDUCING BALANCE WITH REDUCING INSTALMENT', code: 2 },
    { name: 'REDUCING BALANCE WITH CONSTANT INSTALMENT', code: 3 },
  ];
  phoneNumbers: Array<string> = [];
  customers: any;

  constructor(
    private authService: AuthServiceService,
    private others: OthersService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private alertService: AlertService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.others.getAllTheStationLocations().subscribe(
      res => {
        this.stations = res;
      },
      err => {
        console.log(err.error.statusText);
      }
    );
    this.userForm = this.createFormGroup();
  }

  createFormGroup(): any {
    return new FormGroup({
      type: new FormControl(
        '',
        Validators.compose([Validators.required,])
      ),
      station_name: new FormControl(
        '',
        Validators.compose([Validators.required,])
      ),
    });
  }
  revert(): any {
    this.userForm.reset();
  }
  get fval(): any {
    return this.userForm.controls;
  }

  setAmortizationType(): any {
    // this.spinner.show();
    if (this.userForm.valid) {
      const data = {
        productCode: 400,
        userId: this.User.userId,
        amortizationType: null,
        theStationLocationId: null,
      };
      this.types.forEach((type) => {
        if (type.name === this.fval.type.value) {
          data.amortizationType = type.code;
        }
      });
      for (const station of this.stations){
        if (station.stationName.toUpperCase() === this.fval.station_name.value.toUpperCase()){
         data.theStationLocationId = station.theStationLocationId;
        }
      }
      if (data.theStationLocationId === null){
        this.errored = true;
        this.alertService.danger({
         html: '<b> The station chosen does not exist</b>'
        });
       //  this.errored = false;
        return;
      } else {
        if (data.amortizationType === null){
          this.errored = true;
          this.alertService.danger({
           html: '<b> The amortization Type chosen is not valid</b>'
          });
         //  this.errored = false;
          return;
        } else {
          this.others.postSetStationAmortType(data).subscribe(
            (res) => {
              this.posted = true;
              this.alertService.success({
                html: '<b> The amortization type was set successfully</b>',
              });
              setTimeout(this.revert(), 3000);
            },
            (err) => {
              this.errored = true;
              if (err.error.status === 500) {
                this.alertService.danger({
                  html: '<b> Server Could Not handle this request</b>',
                });
              } else {
                this.alertService.danger({
                  html: '<b>' + err.error.statusText + '</b>',
                });
              }
            }
          );
        }
      }
    } else {
      this.errored = true;
      this.alertService.danger({
        html: '<b> The provided form details are invalid </b>',
      });
    }
  }
}
