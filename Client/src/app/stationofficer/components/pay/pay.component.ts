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
        Validators.compose([
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(7),
        ])
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
                  photoUrl: bodaCustomers[0].customerPhotoUrl === 'customerPhotoUrl.com' ? this.user : bodaCustomers[0].customerPhotoUrl,
                  phone: bodaCustomers[0].customerPhone1,
                  plate: bodaCustomers[0].bodabodaCustomerNumberPlate,
                  loanAmount: res.length === 1 ? res[0].loanAmountTaken : 0,
                  loanLimit: bodaCustomers[0].bodabodaCustomerLoanLimit,
                  loanPaid: res.length === 1 ? res[0].loanAmountPaid : 0,
                  loanBalance: res.length === 1 ? res[0].loanAmountRemaining : 0,
                  loanStatus: res.length === 1 ? res[0].loanStatus === 2 ? 'RUNNING' :
                              res[0].loanStatus === 3 ? 'COMPLETE' : 'CREATED' : 'COMPLETE',
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
                photoUrl: taxiCustomers[0].customerPhotoUrl === 'customerPhotoUrl.com' ? this.user : taxiCustomers[0].customerPhotoUrl ,
                phone: taxiCustomers[0].customerPhone1,
                plate: taxiCustomers[0].taxiCustomerNumberPlate,
                loanLimit: taxiCustomers[0].taxiCustomerLoanLimit,
                loanAmount: res.length === 1 ? res[0].loanAmountTaken : 0,
                loanPaid: res.length === 1 ? res[0].loanAmountPaid : 0,
                loanBalance: res.length === 1 ? res[0].loanAmountRemaining : 0,
                loanStatus: res.length === 1 ? res[0].loanStatus === 2 ? 'RUNNING' :
                            res[0].loanStatus === 3 ? 'COMPLETE' : 'CREATED' : 'COMPLETE',
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
      }
    }
  }


  checkLimit(val: any): any{
    if (val !== ''){
      val = parseInt(val.replace(/[\D\s\._\-]+/g, ''), 10);
      if (val > this.checkedClient.loanBalance) {
        this.errored = true;
        this.fval.amount_to_pay.setValue('');
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
        this.others.verifyUserWithPin({userPhone1: this.User.userPhone, userPassword: Number(this.fval.pin.value)}).subscribe(
          res => {
            if (res){
              const data = {
                txnAmount: this.loanAmount,
                customerId: this.checkedClient.Id,
                txnDetailsId: null,
                userId: this.User.userId,
                productCode: this.loanType === 'Boda Loan' ? 200 : 300,
                theStationLocationId: this.User.userLocationId
              };
              switch (this.loanType) {
                case 'Boda Loan':
                  data.txnDetailsId = this.assignTxnId('BODABODALOAN', 'LOANPAYMENT');
                  break;
                case 'Taxi Loan':
                  data.txnDetailsId = this.assignTxnId('TAXILOAN', 'LOANPAYMENT');
                  break;
              }
              this.others.putTxnCustomer(data).subscribe(
                response => {
                  if (response === true){
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
            } else {
              this.errored = true;
              this.alertService.danger({
                html: "<b> User's pin does not match<b>"
              });
            }
          },
          err => {
            this.errored = true;
            this.alertService.danger({
              html: '<b>' + err.error.error.message + '<b>'
            });
          }
        );
    }
  }
}
