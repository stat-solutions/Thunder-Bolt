import { Component, OnInit, TemplateRef } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'ngx-alerts';
import { CustomValidator } from 'src/app/validators/custom-validator';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { OthersService } from 'src/app/shared/services/other-services/others.service';

@Component({
  selector: 'app-lend',
  templateUrl: './lend.component.html',
  styleUrls: ['./lend.component.scss'],
})
export class LendComponent implements OnInit {
  modalRef: BsModalRef;
  userForm: FormGroup;
  posted = false;
  actionButton: string;
  shiftDetails: any;
  errored: boolean;
  serviceErrors: string;
  status: boolean;
  checkedOk: boolean;
  fieldType: boolean;
  customers: any;
  loanType: string;
  amountBorrowed: number;
  canLend = false;
  user = '/../../../assets/img/man.svg';
  checkedClient: any;
  numberPlates: Array<string> = [];
  phoneNumbers: Array<string> = [];
  User = this.authService.loggedInUserInfo();
  txns: any;

  constructor(
    private authService: AuthServiceService,
    private others: OthersService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.userForm = this.createFormGroup();
    this.checkedOk = false;
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
      loanType: new FormControl(['', Validators.required]),
      number_plate: new FormControl(
        '',
      ),
      user_contact_number: new FormControl(
        '',
      ),
      amount_to_borrow: new FormControl(
        { value: '', disabled: true },
        Validators.compose([
          Validators.required,
          CustomValidator.patternValidator(/\d/, { hasNumber: true }),
          Validators.maxLength(12),
          Validators.minLength(3),
        ])
      ),
      pin: new FormControl(
        { value: '', disabled: true },
        Validators.compose([
          Validators.required,
          CustomValidator.patternValidator(/\d/, { hasNumber: true }),
          Validators.maxLength(4),
          Validators.minLength(4),
        ])
      ),
    });
  }
  checkLoanType(value: string): any {
    switch (value) {
      case 'Boda Loan':
        this.others.getBodaCustomers().subscribe(
          res => {
            if (res.length > 0){
              this.customers = res;
              this.customers.forEach((customer) => {
                this.numberPlates.push(customer.bodabodaCustomerNumberPlate);
              });
              this.loanType = value;
              this.fval.number_plate.setValidators([
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(8),
              ]);
            } else {
              this.errored = true;
              this.choosingPdts();
              this.alertService.danger({
                html: '<b>There are no boda boda customers registered</b>'
              });
            }
          },
          err => {
            this.errored = true;
            console.log(err);
            this.alertService.danger({
              html: '<b>' + err.error.error.message + '</b>'
            });
          }
        );
        break;
      case 'Taxi Loan':
        this.others.getTaxiCustomers().subscribe(
          res => {
            if (res.length > 0){
              this.customers = res;
              this.customers.forEach((customer) => {
                this.numberPlates.push(customer.taxiCustomerNumberPlate);
              });
              this.fval.number_plate.setValidators([
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(8),
              ]);
              this.loanType = value;
            } else {
              this.errored = true;
              this.choosingPdts();
              this.alertService.danger({
                html: '<b>There are no Taxi customers registered</b>'
              });
            }
          },
          err => {
            this.errored = true;
            this.alertService.danger({
              html: '<b>' + err.error.error.message + '</b>'
            });
          }
        );
        break;
      case 'Micro Loan':
        this.others.getMicroCustomers().subscribe(
          res => {
            if (res.length > 0){
              this.customers = res;
              this.customers.forEach((customer) => {
                this.phoneNumbers.push(customer.customerPhone1);
              });
              this.fval.user_contact_number.setValidators([
                Validators.required,
                CustomValidator.patternValidator(
                  /^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/,
                  { hasNumber: true }
                ),
              ]);
              this.loanType = value;
            } else {
              this.errored = true;
              this.choosingPdts();
              this.alertService.danger({
                html: '<b>There are no Micro loan customers registered</b>'
              });
            }
          },
          err => {
            this.errored = true;
            this.alertService.danger({
              html: '<b>' + err.error.error.message + '</b>'
            });
          }
        );
        break;
    }
  }

  choosingPdts(): any{
    this.loanType = '';
    this.numberPlates = [];
    this.phoneNumbers = [];
    this.fval.amount_to_borrow.disable();
    this.fval.pin.disable();
  }

  enableAmountAndPin(): any{
    this.fval.amount_to_borrow.enable();
    this.fval.pin.enable();
  }
  checkLoanbility(value: any, template: any): any {
    if (value !== ''){
      switch (this.loanType) {
        case 'Boda Loan':
          this.customers.forEach(customer => {
            if (customer.bodabodaCustomerNumberPlate === value){
              this.checkedClient = {
                Id: customer.customerId,
                name: customer.customerName,
                photoUrl: customer.customerIdPhotoUrl === 'customerIdPhotoUrl.com' ? this.user : customer.customerIdPhotoUrl,
                phone: customer.customerPhone1,
                plate: customer.bodabodaCustomerNumberPlate,
                loanAmount: customer.bodabodaCustomerLoanLimit,
                loanLimit: customer.bodabodaCustomerLoanLimit,
                loanPaid: customer.bodabodaCustomerLoanLimit,
                loanBalance: customer.bodabodaCustomerLoanLimit,
                loanStatus: customer.bodabodaCustomerLoanLimit,
                comment: customer.customerComment,
                pin: customer.customerSecretPin,
              };
              this.openModal(template);
              this.enableAmountAndPin();
            } else {
              this.errored = true;
              this.alertService.danger({
                html: '<b> customer with number plate' + value.toUpperCase() + ' is not registered<b>'
              });
            }
          });
          break;
        case 'Taxi Loan':
          this.customers.forEach(customer => {
            if (customer.taxiCustomerNumberPlate === value){
              this.checkedClient = {
                Id: customer.customerId,
                name: customer.customerName,
                photoUrl: customer.customerIdPhotoUrl === 'customerIdPhotoUrl.com' ? this.user : customer.customerIdPhotoUrl,
                phone: customer.customerPhone1,
                plate: customer.taxiCustomerNumberPlate,
                loanAmount: customer.taxiCustomerLoanLimit,
                loanLimit: customer.taxiCustomerLoanLimit,
                loanPaid: customer.taxiCustomerLoanLimit,
                loanBalance: customer.taxiCustomerLoanLimit,
                loanStatus: customer.taxiCustomerLoanLimit,
                comment: customer.customerComment,
                pin: customer.customerSecretPin,
              };
              this.openModal(template);
              this.enableAmountAndPin();
            } else {
              this.errored = true;
              this.alertService.danger({
                html: '<b> customer with number plate' + value.toUpperCase() + ' is not registered<b>'
              });
            }
          });
          break;
        case 'Micro Loan':
          this.customers.forEach(customer => {
            if (customer.customerPhone1 === value){
              this.checkedClient = {
                Id: customer.customerId,
                name: customer.customerName,
                photoUrl: customer.customerIdPhotoUrl === 'customerIdPhotoUrl.com' ? this.user : customer.customerIdPhotoUrl,
                phone: customer.customerPhone1,
                loanAmount: customer.microloanCustomerLoanLimit,
                loanLimit: customer.microloanCustomerLoanLimit,
                loanPaid: customer.microloanCustomerLoanLimit,
                loanBalance: customer.microloanCustomerLoanLimit,
                loanStatus: customer.microloanCustomerLoanLimit,
                comment: customer.customerComment,
                pin: customer.customerSecretPin,
              };
              this.openModal(template);
              this.enableAmountAndPin();
            } else {
              this.errored = true;
              this.alertService.danger({
                html: '<b> customer with number plate' + value.toUpperCase() + ' is not registered<b>'
              });
            }
          });
          break;
      }
    }
  }

  checkLimit(val: any): any{
    if (val !== ''){
      val = parseInt(val.replace(/[\D\s\._\-]+/g, ''), 10);
      if (val > this.checkedClient.loanLimit) {
        this.errored = true;
        this.fval.amount_to_borrow.setValue(this.checkedClient.loanLimit);
        this.canLend = false;
        this.alertService.danger({
          html: '<b> Amount provided (' + val + ') is greater than the customer loan limit</b>'
        });
      } else {
        this.amountBorrowed = val;
      }
    }
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

  public openModal(template: TemplateRef<any>): any {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-lg modal-dialog-centered' })
    );
  }

  // toggle visibility of password field
  toggleFieldType(): any {
    this.fieldType = !this.fieldType;
  }

  assignTxnId(familyName: string, typeName: string): number{
    for (const txn of this.txns){
      if (txn.txnDetailsFamilyName.toUpperCase() === familyName && txn.txnDetailsTypeName.toUpperCase() === typeName){
        return txn.txnDetailsId;
      }
    }
  }

  lend(): any {
    if (this.userForm.valid){
      if (Number(this.fval.pin.value) === this.checkedClient.pin){
        const data = {
          txnAmount: this.amountBorrowed,
          customerId: this.checkedClient.Id,
          txnDetailsId: null,
          userId: this.User.userId,
          productCode: this.loanType === 'Boda Loan' ? 200 :
                        this.loanType === 'Taxi Loan' ? 300 : 400,
          theStationLocationId: this.User.userLocationId
        };
        switch (this.loanType) {
          case 'Boda Loan':
            data.txnDetailsId = this.assignTxnId('BODABODALOAN', 'LOANDISBURSEMENT');
            break;
          case 'Taxi Loan':
            data.txnDetailsId = this.assignTxnId('TAXILOAN', 'LOANDISBURSEMENT');
            break;
          case 'Micro Loan':
            data.txnDetailsId = this.assignTxnId('MICROLOAN', 'LOANDISBURSEMENT');
            break;
        }
        this.others.putTxnCustomer(data).subscribe(
          res => {
            if (res){
              this.posted = true;
              this.alertService.success({
                html: '<b> Loan was successfully</b>'
              });
              setTimeout(this.revert(), 3000);
            }
          },
          err => {
            this.errored = true;
            if (err.error.error.status === 500) {
              this.alertService.danger({
                html: '<b> Sever Could Not handle this request</b>'
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
