import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'ngx-alerts';
import { CustomValidator } from 'src/app/validators/custom-validator';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss']
})

export class SetPasswordComponent implements OnInit {
  userForm: FormGroup;
  posted = false;
  actionButton: string;
  shiftDetails: any;
  errored: boolean;
  serviceErrors: string;
  status: boolean;
  checkedOk: boolean;
  fieldType: boolean;
  station: string;
  theCompany: string;
  closingBal: string;
  numberPlates: [];
  phoneNumbers: [];
  loanDetails: any;
  secretPin: number;
  loanLimit: number;
  amountDue: number;
  txnId: number;
  numberValue: number;
  values: any;
  user = '/../../../assets/img/man.svg';
  clientName: string;

  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userForm = this.createFormGroup();
    this.checkedOk = false;
  }

  createFormGroup(): any {
    return this.fb.group({
      currentPassword: new FormControl(
        '',
        Validators.compose([
          // 1. Password Field is Required

          Validators.required,

          // 2. check whether the entered password has a number
          CustomValidator.patternValidator(
            /^(([0-9])([0-9])([0-9])([0-9]))$/,
            {
              hasNumber: true,
            }
          ),

          Validators.minLength(4),
          Validators.maxLength(4),
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([
          // 1. Password Field is Required

          Validators.required,

          // 2. check whether the entered password has a number
          CustomValidator.patternValidator(
            /^(([0-9])([0-9])([0-9])([0-9]))$/,
            {
              hasNumber: true,
            }
          ),

          Validators.minLength(4),
          Validators.maxLength(4),
        ])
      ),
      confirmPassword: new FormControl(
        '',
        Validators.compose([
          // 1. Password Field is Required

          Validators.required,

          // 2. check whether the entered password has a number
          CustomValidator.patternValidator(
            /^(([0-9])([0-9])([0-9])([0-9]))$/,
            {
              hasNumber: true,
            }
          ),
          // 6. Has a length of exactly 4 digits
          Validators.minLength(4),
          Validators.maxLength(4),
        ])
      ),
    },
    { validator: CustomValidator.passwordMatchValidator }
    );
  }

  revert(): any {
    this.userForm.reset();
  }

  refresh(): any {
    location.reload();
  }

  get fval(): any {
    return this.userForm.controls;
  }
  onKey(event: any): any {
    // without type info
    this.values = event.target.value.replace(/[\D\s\._\-]+/g, '');

    this.numberValue = this.values ? parseInt(this.values, 10) : 0;

    // tslint:disable-next-line:no-unused-expression
    this.values =
      this.numberValue === 0 ? '' : this.numberValue.toLocaleString('en-US');

    this.userForm.controls.amount_to_borrow.setValue(this.values);
  }

  // toggle visibility of password field
  toggleFieldType(): any {
    this.fieldType = !this.fieldType;
  }


  setPassword(): any {

    this.userForm.patchValue({
      amount_to_borrow: parseInt( this.userForm.controls.amount_to_borrow.value.replace(/[\D\s\._\-]+/g, ''), 10 )
    });

    // tslint:disable-next-line:triple-equals
    if (!(this.secretPin == this.userForm.controls.pin.value)) {
      this.alertService.danger({
        html: '<b>Invalid PIN!</b>'
      });
      return;
    } else {
      if (this.userForm.controls.amount_to_borrow.value > this.loanLimit) {
        this.alertService.warning({
          html: '<b>Loan Limit Exceeded!</b>' + '<br/>'
        });
        return;
      } else {
        this.userForm.controls.number_plate.enable();
        this.userForm.patchValue({
          user_station: jwt_decode(this.authService.getJwtToken()).user_station,
          user_id: jwt_decode(this.authService.getJwtToken()).user_id
        });
        // console.log(this.userForm.value);
        this.posted = true;
        this.spinner.show();
        // this.pumpService.createLoan(this.userForm).subscribe(
        //   result => {
        //     this.amountDue = result[0].amount_due;
        //     this.txnId = result[0].txn_id;
        //     this.spinner.hide();
        //     this.openModal();
        //     this.router.navigate(['dashboardpump/shiftmanagement']);
        //     setTimeout(() => {
        //       location.reload();
        //     }, 3000);
        //   },

        //   (error: string) => {
        //     this.spinner.hide();
        //     this.errored = true;
        //     this.serviceErrors = error;
        //     this.alertService.danger({
        //       html: '<b>' + this.serviceErrors + '</b>' + '<br/>'
        //     });
        //   }
        // );
      }
    }
  }
}
