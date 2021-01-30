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
  selector: 'app-set-loan-amortize-cycle',
  templateUrl: './set-loan-amortize-cycle.component.html',
  styleUrls: ['./set-loan-amortize-cycle.component.scss'],
})
export class SetLoanAmortizeCycleComponent implements OnInit {
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
  cycles = [
    { name: 'DAILY', code: 1 },
    { name: 'WEEKLY', code: 2 },
    { name: 'FORTNIGHTLY', code: 3 },
    { name: 'MONTHLY', code: 4 },
    { name: 'QUATERLY', code: 5 },
    { name: 'HALF YEARLY', code: 6 },
    { name: 'ANNUALLY', code: 7 },
    { name: 'BIANNIALY', code: 8 },
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
    this.userForm = this.createFormGroup();
    this.others.getProducts().subscribe((res) => {
      this.products = res;
      // tslint:disable-next-line: only-arrow-functions
      this.products = this.products.map(function (pdt: any): any {
        return {
          productCode: pdt.productCode,
          productName: pdt.productName.replace(/_/g, ' ').toUpperCase(),
        };
      });
    });
    this.others.getMicroCustomers().subscribe(
      (res) => {
        if (res.length > 0) {
          this.customers = [];
          this.customers = res;
          this.phoneNumbers = [];
          this.customers.forEach((customer) => {
            this.phoneNumbers.push(customer.customerPhone1);
          });
        } else {
          this.errored = true;
          this.alertService.danger({
            html: '<b>There are no Micro loan customers registered</b>',
          });
        }
      },
      (err) => {
        this.errored = true;
        this.alertService.danger({
          html: '<b>' + err.error.error.message + '</b>',
        });
      }
    );
  }

  createFormGroup(): any {
    return new FormGroup({
      cycle: new FormControl(
        '',
        Validators.compose([Validators.required, CustomValidator.maxValue(100)])
      ),
      user_contact_number: new FormControl(''),
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
  checkLoanbility(value: any, template: TemplateRef<any>): any {
    if (value !== '') {
      let microCustomers = [...this.customers];
      microCustomers = microCustomers.filter(
        (customer) => customer.customerPhone1 === value.toUpperCase()
      );
      if (microCustomers.length === 1) {
        this.checkedClient = microCustomers[0];
        this.openModal(template);
      } else {
        this.errored = true;
        this.checkedClient = {};
        this.alertService.danger({
          html:
            '<b> customer phone number ' +
            value.toUpperCase() +
            ' is not registered<b>',
        });
      }
    }
  }

  setAmortizationCycle(): any {
    // this.spinner.show();
    if (this.userForm.valid) {
      const data = {
        customerId: this.checkedClient.customerId,
        productCode: 400,
        userId: this.User.userId,
        theLoanAmortizationCycle: null,
        theStationLocationId: this.checkedClient.fktheStationLocationIdCustomer,
        comment: `Please set the amortization cycle of this customer to  ${this.fval.cycle.value}`,
      };
      this.cycles.forEach((cycle) => {
        if (cycle.name === this.fval.cycle.value) {
          data.theLoanAmortizationCycle = cycle.code;
        }
      });
      this.others.putSetIndividualLoanAmortizationCycle(data).subscribe(
        (res) => {
          this.posted = true;
          this.alertService.success({
            html: '<b> The amortization cycle was initiated successfully</b>',
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
    } else {
      this.errored = true;
      this.alertService.danger({
        html: '<b> The provided form details are invalid </b>',
      });
    }
  }
}
