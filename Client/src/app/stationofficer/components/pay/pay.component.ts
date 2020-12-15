import { Component, OnInit, TemplateRef } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'ngx-alerts';
import { CustomValidator } from 'src/app/validators/custom-validator';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { OthersService } from 'src/app/shared/services/other-services/others.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss'],
})
export class PayComponent implements OnInit {
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
  station: string;
  theCompany: string;
  closingBal: string;
  loanDetails: any;
  loanType: string;
  values: any;
  user = '/../../../assets/img/man.svg';
  loanAmount: number;
  customers: any;
  comment: string;
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

  ngOnInit(): any {
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
      amount_to_pay: new FormControl(
        { value: '', disabled: true },
        Validators.compose([
          Validators.required,
          CustomValidator.patternValidator(/\d/, { hasNumber: true }),
          Validators.maxLength(6),
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
              this.loanType = value;
              this.customers = [];
              this.customers = res;
              this.fval.number_plate.setValue('');
              this.fval.amount_to_pay.setValue('');
              this.fval.pin.setValue('');
              this.fval.amount_to_pay.disable();
              this.fval.pin.disable();
              this.numberPlates = [];
              this.checkedClient = {};
              this.customers.forEach((customer) => {
                this.numberPlates.push(customer.bodabodaCustomerNumberPlate);
              });
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
              this.customers = [];
              this.checkedClient = {};
              this.customers = res;
              this.loanType = value;
              this.fval.number_plate.setValue('');
              this.fval.amount_to_pay.setValue('');
              this.fval.pin.setValue('');
              this.fval.amount_to_pay.disable();
              this.fval.pin.disable();
              this.numberPlates = [];
              this.customers.forEach((customer) => {
                this.numberPlates.push(customer.taxiCustomerNumberPlate);
              });
              this.fval.number_plate.setValidators([
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(8),
              ]);
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
              this.customers = [];
              this.customers = res;
              this.checkedClient = {};
              this.loanType = value;
              this.fval.user_contact_number.setValue('');
              this.fval.amount_to_pay.setValue('');
              this.fval.pin.setValue('');
              this.fval.amount_to_pay.disable();
              this.fval.pin.disable();
              this.phoneNumbers = [];
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
    this.fval.amount_to_pay.disable();
    this.fval.pin.disable();
  }

  enableAmountAndPin(): any{
    this.fval.amount_to_pay.enable();
    this.fval.pin.enable();
  }
  checkLoanbility(value: any, template: any): any {
    if (value !== ''){
      // console.log(this.loanType);
      switch (this.loanType) {
        case 'Boda Loan':
          let bodaCustomers =  [...this.customers];
          bodaCustomers = bodaCustomers.filter((customer) => customer.bodabodaCustomerNumberPlate === value.toUpperCase());
          if (bodaCustomers.length === 1){
            this.others.getLoadDetails({customerId: bodaCustomers[0].customerId, productCode: 200}).subscribe(
              res => {
                this.checkedClient = {
                  Id: bodaCustomers[0].customerId,
                  name: bodaCustomers[0].customerName,
                  // tslint:disable-next-line: max-line-length
                  photoUrl: bodaCustomers[0].customerIdPhotoUrl === 'customerIdPhotoUrl.com' ? this.user : bodaCustomers[0].customerIdPhotoUrl,
                  phone: bodaCustomers[0].customerPhone1,
                  plate: bodaCustomers[0].bodabodaCustomerNumberPlate,
                  loanAmount: res[0].loanAmountTaken,
                  loanLimit: bodaCustomers[0].bodabodaCustomerLoanLimit,
                  loanPaid: res[0].loanAmountPaid,
                  loanBalance: res[0].loanAmountRemaining,
                  loanStatus: res[0].loanStatus === 2 ? 'RUNNING' : res[0].loanStatus === 3 ? 'COMPLETE' : 'CREATED',
                  comment: bodaCustomers[0].customerComment,
                  pin: bodaCustomers[0].customerSecretPin,
                };
                this.openModal(template);
                this.enableAmountAndPin();
              },
              err => {
                this.errored = true;
                this.alertService.danger({
                  html: '<b>' + err.error.error.message + '<b>'
                });
              }
            );
          } else {
            this.errored = true;
            this.alertService.danger({
              html: '<b> customer with number plate ' + value.toUpperCase() + ' is not registered<b>'
            });
          }
          break;
      case 'Taxi Loan':
        let taxiCustomers =  [...this.customers];
        taxiCustomers = taxiCustomers.filter((customer) => customer.taxiCustomerNumberPlate === value.toUpperCase());
        if (taxiCustomers.length === 1){
          this.others.getLoadDetails({customerId: taxiCustomers[0].customerId, productCode: 200}).subscribe(
            res => {
              this.checkedClient = {
                Id: taxiCustomers[0].customerId,
                name: taxiCustomers[0].customerName,
                // tslint:disable-next-line: max-line-length
                photoUrl: taxiCustomers[0].customerIdPhotoUrl === 'customerIdPhotoUrl.com' ? this.user : taxiCustomers[0].customerIdPhotoUrl ,
                phone: taxiCustomers[0].customerPhone1,
                plate: taxiCustomers[0].taxiCustomerNumberPlate,
                loanAmount: res[0].loanAmountTaken,
                loanLimit: taxiCustomers[0].taxiCustomerLoanLimit,
                loanPaid: res[0].loanAmountPaid,
                loanBalance: res[0].loanAmountRemaining,
                loanStatus: res[0].loanStatus === 2 ? 'RUNNING' : res[0].loanStatus === 3 ? 'COMPLETE' : 'CREATED',
                comment: taxiCustomers[0].customerComment,
                pin: taxiCustomers[0].customerSecretPin,
              };
              this.openModal(template);
              this.enableAmountAndPin();
           },
           err => {
              this.errored = true;
              this.alertService.danger({
                html: '<b>' + err.error.error.message + '<b>'
              });
            });
        } else {
          this.errored = true;
          this.alertService.danger({
              html: '<b> customer with number plate ' + value.toUpperCase() + ' is not registered<b>'
            });
        }
        break;
        case 'Micro Loan':
          let microCustomers =  [...this.customers];
          microCustomers = microCustomers.filter((customer) => customer.customerPhone1 === value.toUpperCase());
          if (microCustomers.length === 1){
            this.checkedClient = {
              Id: microCustomers[0].customerId,
              name: microCustomers[0].customerName,
              // tslint:disable-next-line: max-line-length
              photoUrl: microCustomers[0].customerIdPhotoUrl === 'customerIdPhotoUrl.com' ? this.user : microCustomers[0].customerIdPhotoUrl,
              phone: microCustomers[0].customerPhone1,
              loanAmount: microCustomers[0].microloanCustomerLoanLimit,
              loanLimit: microCustomers[0].microloanCustomerLoanLimit,
              loanPaid: microCustomers[0].microloanCustomerLoanLimit,
              loanBalance: microCustomers[0].microloanCustomerLoanLimit,
              loanStatus: microCustomers[0].microloanCustomerLoanLimit,
              comment: microCustomers[0].customerComment,
              pin: microCustomers[0].customerSecretPin,
            };
            this.openModal(template);
            this.enableAmountAndPin();
          } else {
              this.errored = true;
              this.checkedClient = {};
              this.alertService.danger({
                html: '<b> customer with number plate ' + value.toUpperCase() + ' is not registered<b>'
              });
            }
          break;
      }
    }
  }


  checkLimit(val: any): any{
    if (val !== ''){
      val = parseInt(val.replace(/[\D\s\._\-]+/g, ''), 10);
      if (val > this.checkedClient.loanBalance) {
        this.errored = true;
        this.fval.amount_to_pay.setValue(this.checkedClient.loanBalance);
        this.alertService.danger({
          html: '<b> Amount provided (' + val + ') is greater than the customer loan limit</b>'
        });
      } else {
        this.loanAmount = val;
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

  pay(): any {
    if (this.userForm.valid &&  this.checkedClient.Id && this.loanAmount){
      // if (Number(this.fval.pin.value) === this.checkedClient.pin){
        const data = {
          txnAmount: this.loanAmount,
          customerId: this.checkedClient.Id,
          txnDetailsId: null,
          userId: this.User.userId,
          productCode: this.loanType === 'Boda Loan' ? 200 :
                        this.loanType === 'Taxi Loan' ? 300 : 400,
          theStationLocationId: this.User.userLocationId
        };
        switch (this.loanType) {
          case 'Boda Loan':
            data.txnDetailsId = this.assignTxnId('BODABODALOAN', 'LOANPAYMENT');
            break;
          case 'Taxi Loan':
            data.txnDetailsId = this.assignTxnId('TAXILOAN', 'LOANPAYMENT');
            break;
          case 'Micro Loan':
            data.txnDetailsId = this.assignTxnId('MICROLOAN', 'LOANPAYMENT');
            break;
        }
        this.others.putTxnCustomer(data).subscribe(
          res => {
            if (res){
              this.posted = true;
              this.alertService.success({
                html: '<b> Payment was successfully</b>'
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
      // } else {
      //   this.errored = true;
      //   this.alertService.danger({
      //     html: '<b>Secret pin does not much</b>'
      //   });
      // }
    }
  }
}
