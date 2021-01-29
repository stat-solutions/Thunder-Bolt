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
  selector: 'app-set-interest-rate',
  templateUrl: './set-interest-rate.component.html',
  styleUrls: ['./set-interest-rate.component.scss'],
})
export class SetInterestRateComponent implements OnInit {
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
  }

  createFormGroup(): any {
    return new FormGroup({
      category: new FormControl(['', Validators.required]),
      loanType: new FormControl(['', Validators.required]),
      number_plate: new FormControl(
        '',
      ),
      user_contact_number: new FormControl(
        '',
      ),
      itemRate: new FormControl(
        { value: '', disabled: false },
        Validators.compose([Validators.required, CustomValidator.maxValue(100)])
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
              this.fval.itemRate.setValue('');
              this.fval.pin.setValue('');
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
              this.fval.itemRate.setValue('');
              this.fval.pin.setValue('');
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
              this.fval.itemRate.setValue('');
              this.fval.pin.setValue('');
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
  }

  checkLoanbility(value: any, template: TemplateRef<any>): any {
    if (value !== ''){
      // console.log(this.loanType);
      switch (this.loanType) {
        case 'Boda Loan':
          let bodaCustomers =  [...this.customers];
          bodaCustomers = bodaCustomers.filter((customer) => customer.bodabodaCustomerNumberPlate === value.toUpperCase());
          if (bodaCustomers.length === 1){
            this.checkedClient = bodaCustomers[0];
            this.openModal(template);
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
          this.checkedClient = taxiCustomers[0];
          this.openModal(template);
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
            this.checkedClient = microCustomers[0];
            this.openModal(template);
          } else {
              this.errored = true;
              this.checkedClient = {};
              this.alertService.danger({
                html: '<b> customer phone number ' + value.toUpperCase() + ' is not registered<b>'
              });
            }
          break;
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

// modal
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

  setInterestRate(): any {
    const itemRate = this.fval.itemRate.value;
    if (this.userForm.valid){
      this.others.verifyUserWithPin({userPhone1: this.User.userPhone, userPassword: Number(this.fval.pin.value)}).subscribe(
        res => {
          if (res){
            const data = {
              customerId: this.checkedClient.customerId,
              theStationLocationId: this.checkedClient.fktheStationLocationIdCustomer,
              productCode: this.loanType === 'Boda Loan' ? 200 : this.loanType === 'Taxi Loan' ? 300 : 400,
              theLoanInterestRate: itemRate,
              userId: this.User.userId,
              comment: `Please set interest rate of this customer to ${itemRate}%`
            };
            this.others.setIdividualLoanInterestRate(data).subscribe(
              response => {
                if (response === true){
                  this.posted = true;
                  this.alertService.success({
                    html: '<b> Individual Interest Rate was Initiated Successfully, wait for approval</b>'
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
