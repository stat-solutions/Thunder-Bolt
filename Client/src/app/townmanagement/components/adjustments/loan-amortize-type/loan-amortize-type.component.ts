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
  selector: 'app-loan-amortize-type',
  templateUrl: './loan-amortize-type.component.html',
  styleUrls: ['./loan-amortize-type.component.scss'],
})
export class LoanAmortizeTypeComponent implements OnInit {
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
    {name: 'FLAT RATE', code: 1},
    {name: 'REDUCING BALANCE WITH REDUCING INSTALMENT', code: 2},
    {name: 'REDUCING BALANCE WITH CONSTANT INSTALMENT', code: 3},
  ];
  phoneNumbers: Array<string> = [];
  customers: any;
  statement: any;

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
    this.others.getMicroCustomers().subscribe(
      res => {
        if (res.length > 0){
          this.customers = [];
          this.customers = res;
          this.phoneNumbers = [];
          this.customers.forEach((customer) => {
            this.phoneNumbers.push(customer.customerPhone1);
          });
        } else {
          this.errored = true;
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
  }

  createFormGroup(): any {
    return new FormGroup({
      type: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      user_contact_number: new FormControl('',
        Validators.compose([
          Validators.required,
          CustomValidator.patternValidator(
            /^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/,
            { hasNumber: true }
          ),
        ])
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
  checkLoanbility(value: any, template: TemplateRef<any>): any {
    if (value !== ''){
      let microCustomers =  [...this.customers];
      microCustomers = microCustomers.filter((customer) => customer.customerPhone1 === value.toUpperCase());
      if (microCustomers.length === 1){
        this.checkedClient = microCustomers[0];
        this.others.microCustomerStatement(this.checkedClient.customerId).subscribe(
          res => {
            this.statement = res;
            if (this.statement.length === 0){
              this.posted = true;
              this.alertService.success({
                html: '<b>Customer has no previous transactions</b>'
              });
            } else{
              this.openModal(template);
            }
          },
          err => {
            this.errored = true;
            this.alertService.danger({
                html: '<b>There was a problem getting customer statement</b>'
            });
          }
        );
        } else {
          this.errored = true;
          this.checkedClient = {};
          this.alertService.danger({
            html: '<b> customer phone number ' + value.toUpperCase() + ' is not registered<b>'
          });
        }
      }
    }

  setAmortizationType(): any {
    // this.spinner.show();
    if (this.userForm.valid) {
      const data = {
        customerId: this.checkedClient.customerId,
        productCode: 400,
        userId: this.User.userId,
        theLoanAmortizationType: null,
        theStationLocationId: this.checkedClient.fktheStationLocationIdCustomer,
        comment: `Please set the amortization type of this customer to  ${this.fval.type.value}`
      };
      this.types.forEach((type) => {
        if (type.name === this.fval.type.value) {
          data.theLoanAmortizationType = type.code;
        }
      });
      if (data.theLoanAmortizationType === null){
        this.errored = true;
        this.alertService.danger({
         html: '<b> The amortization Type chosen is not valid</b>'
        });
       //  this.errored = false;
        return;
      } else {
        this.others
          .putSetIndividualLoanAmortizationType(data)
          .subscribe(
            (res) => {
              this.posted = true;
              this.alertService.success({
                html:
                  '<b> The amortization type was initiated successfully</b>',
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
