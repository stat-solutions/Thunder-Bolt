import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { CustomValidator } from 'src/app/validators/custom-validator';
import { OthersService } from 'src/app/shared/services/other-services/others.service';
import * as jwt_decode from 'jwt-decode';
import { NgTranscludeDirective } from 'ngx-bootstrap/tabs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';

@Component({
  selector: 'app-comfirm-loan',
  templateUrl: './comfirm-loan.component.html',
  styleUrls: ['./comfirm-loan.component.scss']
})
export class ComfirmLoanComponent implements OnInit {
  registered = false;
  submitted = false;
  errored = false;
  posted = false;
  showFinalBtn = false;
  showcompleteBtn = true;
  userForm: FormGroup;
  serviceErrors: any = {};
  value: string;
  fieldType: boolean;
  User = this.authService.loggedInUserInfo();
  txns: any;
  phoneNumbers: Array<string> = [];
  garantorsPhotoUrl: string;
  securityPhotoUrl: string;
  securityTypes: any;
  customers: any;
  checkedClient: any;
  constructor(
    private authService: AuthServiceService,
    private others: OthersService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private alertService: AlertService,
    private storage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.errored = false;
    this.posted = false;
    this.userForm = this.createFormGroup();
    this.others.getSecurityType().subscribe(
      res => {
        this.securityTypes = res;
      },
      err => {
        this.errored = true;
        this.alertService.danger({
          html: '<b>' + err.error.error.message + '</b>'
        });
      }
    );
    this.others.getMicroCustomers().subscribe(
      res => {
        if (res.length > 0){
          this.customers = res;
          this.phoneNumbers = [];
          this.checkedClient = {};
          this.customers.forEach((customer) => {
            this.phoneNumbers.push(customer.customerPhone1);
          });
        } else {
          this.errored = true;
          this.alertService.danger({
            html: '<b>There are no Micro Loan customers registered</b>'
          });
        }
      },
      err => {
        this.errored = true;
        console.log(err);
        this.alertService.danger({
          html: '<b>' + err.error.error.mesage + '</b>'
        });
      }
  );
  }
  createFormGroup(): any {
    return new FormGroup({
      user_contact_number: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          CustomValidator.patternValidator(
            /^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/,
            { hasNumber: true }
          ),
        ])
      ),
      pin: new FormControl(
        { value: '', disabled: false },
        Validators.compose([
          Validators.required,
          CustomValidator.patternValidator(/\d/, { hasNumber: true }),
          Validators.maxLength(4),
          Validators.minLength(4),
        ])
      ),
    });
  }
  refresh(): any {
    location.reload();
  }

  checkLoanbility(value: any): any {
    if (value !== ''){
        let microCustomers =  [...this.customers];
        microCustomers = microCustomers.filter((customer) => customer.customerPhone1 === value);
        this.checkedClient = microCustomers[0];
        // this.openModal(template);
    }
  }

  // toggle visibility of password field
  toggleFieldType(): any {
    this.fieldType = !this.fieldType;
  }

  revert(): any {
    this.userForm.reset();
  }

  get fval(): any {
    return this.userForm.controls;
  }

  getSecurityTypeCode(typeName: string): number{
    for (const item of this.securityTypes){
      if (item.securityTypeName === typeName){
        return item.securityTypeCode;
      }
    }
  }

  saveAndNew(): any{
    if (this.userForm.valid){
      if (Number(this.fval.pin.value) === this.checkedClient.customerSecretPin){
        // const txn = {
        //   txnAmount:  parseInt(this.fval.amount_to_pay.value.replace(/[\D\s\._\-]+/g, ''), 10),
        //         customerId: this.checkedClient.customerId,
        //         txnDetailsId: this.assignTxnId('MICROLOAN', 'LOANDISBURSEMENT'),
        //         userId: this.User.userId,
        //         productCode: 400,
        //         microLoanPurpose: this.fval.loanpurpose.value.toUpperCase(),
        //         theStationLocationId: this.User.userLocationId
        // };
      } else {
        this.errored = true;
        this.alertService.danger({
          html: '<b>Secret pin does not much!/b>'
        });
      }
    }
  }

  postLoan(): any {
    if (this.userForm.valid){
      if (Number(this.fval.pin.value) === this.checkedClient.customerSecretPin){
        const data = {};
        this.others.putTxnCustomerApproval(data).subscribe(
          res => {
            if (res){
              this.posted = true;
              this.alertService.success({
                html: '<b> Deposit was successfully</b>'
              });
              setTimeout(() => {
                this.userForm = this.createFormGroup();
              }, 3000);
            }
          },
          err => {
            this.errored = true;
            if (err.error.error.status === 500) {
              this.alertService.danger({
                html: '<b> Server Could Not handle this request!</b>'
              });
            } else {
              this.alertService.danger({
                html: '<b>' + err.error.error.message + '</b>'
              });
            }
          }
        );
      } else {
        this.errored = true;
        this.alertService.danger({
          html: '<b>Secret pin does not much</b>'
        });
      }
    }
  }
}
