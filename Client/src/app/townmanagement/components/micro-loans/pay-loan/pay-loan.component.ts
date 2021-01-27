import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { CustomValidator } from 'src/app/validators/custom-validator';
import { OthersService } from 'src/app/shared/services/other-services/others.service';
import * as jwt_decode from 'jwt-decode';
import { NgTranscludeDirective } from 'ngx-bootstrap/tabs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-pay-loan',
  templateUrl: './pay-loan.component.html',
  styleUrls: ['./pay-loan.component.scss'],
})
export class PayLoanComponent implements OnInit {
  modalRef: BsModalRef;
  registered = false;
  submitted = false;
  errored = false;
  posted = false;
  userForm: FormGroup;
  fieldType: boolean;
  products: any;
  User = this.authService.loggedInUserInfo();
  user = '/../../../assets/img/man.svg';
  phoneNumbers: Array<string>;
  txns: any;
  checkedClient: any;
  customers: any;

  constructor(
    private authService: AuthServiceService,
    private others: OthersService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private alertService: AlertService,
    private storage: AngularFireStorage,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.errored = false;
    this.posted = false;
    this.others.getMicroCustomers().subscribe(
      (res) => {
        if (res.length > 0) {
          this.customers = res;
          this.phoneNumbers = [];
          this.checkedClient = {};
          this.customers.forEach((customer) => {
            this.phoneNumbers.push(customer.customerPhone1);
          });
        } else {
          this.errored = true;
          this.alertService.danger({
            html: '<b>There are no Micro Loan customers registered</b>',
          });
        }
      },
      (err) => {
        this.errored = true;
        console.log(err);
        this.alertService.danger({
          html: '<b>' + err.error.error.message + '</b>',
        });
      }
    );
    this.others.getTxnDetails().subscribe(
      (res) => {
        this.txns = res;
        // console.log(res);
      },
      (err) => {
        this.errored = true;
        this.alertService.danger({
          html: '<b>' + err.error.error.message + '</b>',
        });
      }
    );
    this.userForm = this.createFormGroup();
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
      amount_to_pay: new FormControl(
        { value: '', disabled: false },
        Validators.compose([
          Validators.required,
          CustomValidator.patternValidator(/\d/, { hasNumber: true }),
          Validators.maxLength(6),
          Validators.minLength(3),
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

  // toggle visibility of password field
  toggleFieldType(): any {
    this.fieldType = !this.fieldType;
  }

  //modal
  public openModal(template: TemplateRef<any>): any {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-lg modal-dialog-centered' })
    );
  }

  revert(): any {
    this.userForm.reset();
  }

  get fval(): any {
    return this.userForm.controls;
  }

  assignTxnId(familyName: string, typeName: string): number {
    for (const txn of this.txns) {
      if (
        txn.txnDetailsFamilyName.toUpperCase() === familyName &&
        txn.txnDetailsTypeName.toUpperCase() === typeName
      ) {
        return txn.txnDetailsId;
      }
    }
  }
  checkLoanbility(value: any): any {
    if (value !== '') {
      let microCustomers = [...this.customers];
      microCustomers = microCustomers.filter(
        (customer) => customer.customerPhone1 === value
      );
      if (microCustomers.length === 1) {
        this.others
          .getLoadDetails({
            customerId: microCustomers[0].customerId,
            productCode: 400,
          })
          .subscribe(
            (res) => {
              this.checkedClient = {
                Id: microCustomers[0].customerId,
                name: microCustomers[0].customerName,
                // tslint:disable-next-line: max-line-length
                photoUrl:
                  microCustomers[0].customerPhotoUrl === 'customerPhotoUrl.com'
                    ? this.user
                    : microCustomers[0].customerPhotoUrl,
                phone: microCustomers[0].customerPhone1,
                loanAmount: res.length === 1 ? res[0].loanAmountTaken : 0,
                loanLimit: microCustomers[0].bodabodaCustomerLoanLimit,
                loanPaid: res.length === 1 ? res[0].loanAmountPaid : 0,
                loanBalance: res.length === 1 ? res[0].loanAmountRemaining : 0,
                loanStatus:
                  res.length === 1
                    ? res[0].loanStatus === 2
                      ? 'RUNNING'
                      : res[0].loanStatus === 3
                      ? 'COMPLETE'
                      : 'CREATED'
                    : 'COMPLETE',
                comment: microCustomers[0].customerComment,
                pin: microCustomers[0].customerSecretPin,
                theStationLocationId:
                  microCustomers[0].fktheStationLocationIdCustomer,
              };
              // this.openModal(template);
            },
            (err) => {
              this.errored = true;
              this.alertService.danger({
                html: '<b>' + err.error.error.message + '<b>',
              });
            }
          );
      } else {
        this.errored = true;
        this.alertService.danger({
          html:
            '<b> customer with phone number ' + value + ' is not registered<b>',
        });
      }
    }
  }

  checkLimit(val: any): any {
    //  this.checkedClient.loanBalance = 60000;
    if (val !== '') {
      val = parseInt(val.replace(/[\D\s\._\-]+/g, ''), 10);
      if (val > this.checkedClient.loanBalance) {
        this.errored = true;
        this.fval.amount_to_pay.setValue('');
        this.alertService.danger({
          html:
            '<b> Amount provided is greater than the customer loan balance ' +
            this.checkedClient.loanBalance +
            '</b>',
        });
      } else {
        // this.loanAmount = val;
        return;
      }
    }
  }

  pay(): any {
    if (this.userForm.valid) {
      this.others
        .verifyUserWithPin({
          userPhone1: this.User.userPhone,
          userPassword: Number(this.fval.pin.value),
        })
        .subscribe(
          (res) => {
            if (res) {
              const data = {
                txnAmount: parseInt(
                  this.fval.amount_to_pay.value.replace(/[\D\s\._\-]+/g, ''),
                  10
                ),
                customerId: this.checkedClient.customerId,
                txnDetailsId: this.assignTxnId('MICROLOAN ', 'LOANPAYMENT'),
                userId: this.User.userId,
                productCode: 400,
                theStationLocationId: this.checkedClient.theStationLocationId,
              };
              this.others.putTxnCustomer(data).subscribe(
                (feed) => {
                  if (feed) {
                    this.posted = true;
                    this.alertService.success({
                      html: '<b> payment was successfully</b>',
                    });
                    setTimeout(() => {
                      this.userForm = this.createFormGroup();
                    }, 3000);
                  }
                },
                (err) => {
                  this.errored = true;
                  if (err.error.error.status === 500) {
                    this.alertService.danger({
                      html: '<b> Sever Could Not handle this request</b>',
                    });
                  } else {
                    this.alertService.danger({
                      html: '<b>' + err.error.error.message + '</b>',
                    });
                  }
                }
              );
            } else {
              this.errored = true;
              this.alertService.danger({
                html: "<b>User's pin does not match</b>",
              });
            }
          },
          (err) => {
            this.errored = true;
            this.alertService.danger({
              html: '<b>' + err.error.error.message + '<b>',
            });
          }
        );
    }
  }
}
