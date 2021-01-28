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
  selector: 'app-loan-amortize-cycle',
  templateUrl: './loan-amortize-cycle.component.html',
  styleUrls: ['./loan-amortize-cycle.component.scss'],
})
export class LoanAmortizeCycleComponent implements OnInit {
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

  constructor(
    private authService: AuthServiceService,
    private others: OthersService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private alertService: AlertService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.userForm = this.createFormGroup();
    this.others.getAllTheStationLocations().subscribe(
      (res) => {
        this.stations = res;
      },
      (err) => {
        console.log(err.error.statusText);
      }
    );
    this.others.getProducts().subscribe(
      (res) => {
        this.products = res;
        // tslint:disable-next-line: only-arrow-functions
        this.products = this.products.map(function (pdt: any): any {
          return {
            productCode: pdt.productCode,
            productName: pdt.productName.replace(/_/g, ' ').toUpperCase(),
          };
        });
      },
      (err) => console.log(err.statusText)
    );
  }

  createFormGroup(): any {
    return new FormGroup({
      accrualDays: new FormControl(
        '',
        Validators.compose([Validators.required, CustomValidator.maxValue(100)])
      ),
      user_contact_number: new FormControl(''),
      station_name: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      loan_product: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
    });
  }
  revert(): any {
    this.userForm.reset();
  }
  get fval(): any {
    return this.userForm.controls;
  }

  // modal method
  public openModal(template: TemplateRef<any>): any {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-lg modal-dialog-centered' })
    );
  }

  setAccrualDays(): any {
    // this.spinner.show();
    if (this.userForm.valid) {
      const data = {
        theStationLocationConstantsDaysForAccrual: this.fval.accrualDays.value,
        productCode: null,
        userId: this.User.userId,
        theStationLocationId: null,
      };
      // console.log(this.products);
      this.products.forEach((pdt) => {
        if (pdt.productName === this.fval.loan_product.value) {
          data.productCode = pdt.productCode;
        }
      });
      for (const station of this.stations) {
        if (
          station.stationName.toUpperCase() ===
          this.fval.station_name.value.toUpperCase()
        ) {
          data.theStationLocationId = station.theStationLocationId;
        }
      }
      if (data.theStationLocationId === null) {
        this.errored = true;
        this.alertService.danger({
          html: '<b> The station chosen does not exist</b>',
        });
        //  this.errored = false;
        return;
      } else {
        this.others
          .postSetStationNumberOfDaysForAccrualInterest(data)
          .subscribe(
            (res) => {
              this.posted = true;
              this.alertService.success({
                html:
                  '<b> The Number Of Days For Accrual Interest was set successfully</b>',
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
    } else {
      this.errored = true;
      this.alertService.danger({
        html: '<b> The provided form details are invalid </b>',
      });
    }
  }
}
