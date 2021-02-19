import { Component, OnInit, TemplateRef } from '@angular/core';
// import * as jwt_decode from 'jwt-decode';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'ngx-alerts';
import { OthersService } from 'src/app/shared/services/other-services/others.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-loan-amortize-cycle',
  templateUrl: './loan-amortize-cycle.component.html',
  styleUrls: ['./loan-amortize-cycle.component.scss'],
})
export class LoanAmortizeCycleComponent implements OnInit {
  public modalRef: BsModalRef;
  userForm: FormGroup;
  txnsApprovals = [];
  posted = false;
  loaded = false;
  actionButton: string;
  errored = false;
  serviceErrors: string;
  status: boolean;
  checkedOk: boolean;
  station: string;
  theCompany: string;
  User = this.authService.loggedInUserInfo();
  checkedLoan: any;
  customers: any;
  securityTypes: any;
  checkedClient: any;
  cycles = [
    {name: 'DAILY', code: 1}, {name: 'WEEKLY', code: 2},
    {name: 'FORTNIGHTLY', code: 3}, {name: 'MONTHLY', code: 4},
    {name: 'QUATERLY', code: 5}, {name: 'HALF YEARLY', code: 6},
    {name: 'ANNUALLY', code: 7}, {name: 'BIANNIALY', code: 8},
  ];
  statement: any;
  constructor(
    private authService: AuthServiceService,
    private others: OthersService,
    private router: Router,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): any {
    this.userForm = this.createFormGroup();
    this.fval.selectAll.setValue(false);
    this.initialiseForm();
  }
  createFormGroup(): any {
    return this.fb.group({
      txnApprovals: this.fb.array([this.txnApproval]),
      selectAll: this.fb.control({}),
    });
  }
  get txnApproval(): any {
    return this.fb.group({
      client: this.fb.control({ value: '' }),
      clientId: this.fb.control({ value: '' }),
      station: this.fb.control({ value: '' }),
      product: this.fb.control({ value: '' }),
      amorCycle: this.fb.control({ value: '' }),
      comment: this.fb.control({ value: '' }),
      otherApprovalsAllId: this.fb.control({ value: '' }),
      approved: this.fb.control({}),
    });
  }
  addItem(): any {
    // this.unitForm.controls.bussinessUnits  as FormArray
    (this.fval.txnApprovals as FormArray).push(this.txnApproval);
  }

  removeItem(index: number): any {
    (this.fval.txnApprovals as FormArray).removeAt(index);
  }

  initialiseForm(): any {
    let n: number;
    this.others.getIndividualLoanAmortizationTypeForApproval().subscribe(
      items => {
        this.txnsApprovals = items;
        this.txnsApprovals.forEach((item, i) => {
          const details = JSON.parse(item.otheApprovalsAllPayLoad);
          this.fval.txnApprovals.controls[i].controls.clientId.setValue(details.customerId);
          this.fval.txnApprovals.controls[i].controls.comment.setValue(details.comment);
          const pdt = details.productCode === 200 ? 'BODA BODA FUEL LOAN' :
                      details.productCode === 300 ? 'TAXI FUEL LOAN' : 'MICRO LOAN';
          this.fval.txnApprovals.controls[i].controls.product.setValue(pdt);
          this.fval.txnApprovals.controls[i].controls.client.setValue(item.customerName);
          this.fval.txnApprovals.controls[i].controls.station.setValue(item.stationName);
          this.fval.txnApprovals.controls[i].controls.otherApprovalsAllId.setValue(item.otheApprovalsAllId);
          this.cycles.forEach((cycle) => {
            if (cycle.code === details.theLoanAmortizationType) {
              this.fval.txnApprovals.controls[i].controls.amorCycle.setValue(cycle.name);
            }
          });
          this.fval.txnApprovals.controls[i].controls.approved.setValue(false);
          this.addItem();
          n = i + 1;
      });
        this.removeItem(n);
        this.loaded = true;
    },
    err => {
      this.loaded = false;
      console.log(err.error.error.message);
      }
    );
  }
  checkAllItems(val: boolean): any {
    if (val === true) {
      this.txnsApprovals.forEach((item, i) => {
        this.fval.txnApprovals.controls[i].controls.approved.setValue(val);
      });
    } else {
      this.txnsApprovals.forEach((item, i) => {
        this.fval.txnApprovals.controls[i].controls.approved.setValue(false);
      });
    }
  }
  deselectAll(val: number): any {
    // console.log(this.fval.approveAreas["controls"][val]["controls"].approved.value)
    if (this.fval.txnApprovals.controls[val].controls.approved.value === true) {
      this.fval.selectAll.setValue(false);
    }
  }

  // loan modal method
  public openModal(template: TemplateRef<any>, id: number): any {
    this.txnsApprovals.forEach(item => {
      const details = JSON.parse(item.otheApprovalsAllPayLoad);
      if (details.customerId === id) {
        this.checkedClient = item;
        this.others.microCustomerStatement(id).subscribe(
          res => {
            this.statement = res;
            if (this.statement.length === 0){
              this.posted = true;
              this.alertService.success({
                html: '<b>Customer has no previous transactions</b>'
              });
            } else{
              this.modalRef = this.modalService.show(
                template,
                Object.assign({}, { class: 'modal-lg modal-dialog-center' })
              );
            }
          },
          err => {
            this.errored = true;
            this.alertService.danger({
                html: '<b>There was a problem getting customer statement</b>'
            });
          }
        );
      }
    });
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

  disableForm(): any {
    return this.userForm.disable();
  }

  enableEdit(): any {
    return this.userForm.enable();
  }

  approveItems(): any {
    let itemsApproved = [];
    this.spinner.show();
    this.txnsApprovals.forEach((item, i) => {
      if (this.fval.txnApprovals.controls[i].controls.approved.value === true) {
        const data = {
          userId: this.User.userId,
          otheApprovalsAllId: this.fval.txnApprovals.controls[i].controls.otherApprovalsAllId.value,
          theLoanAmortizationCycle: null
        };
        this.cycles.forEach((cycle) => {
          if (cycle.name === this.fval.txnApprovals.controls[i].controls.amorCycle.value) {
            data.theLoanAmortizationCycle = cycle.code;
            itemsApproved.push(data);
          }
        });
      }
    });
    // console.log(itemsApproved);
    if (itemsApproved.length > 0) {
      this.others.postApproveIndividualLoanAmortizationCycle(itemsApproved).subscribe(
        res => {
          this.posted = true;
          this.alertService.success({
            html: '<b> Individual amortization cycles were approved Successfully </b>'
          });
          this.userForm = this.createFormGroup();
          itemsApproved = [];
          this.fval.selectAll.setValue(false);
          this.initialiseForm();
          this.spinner.hide();
        },
        err =>  {
          this.errored = true;
          this.spinner.hide();
          this.alertService.danger({
            html: '<b>' + err.error.error.message + '</b>'
          });
        }
      );
    } else {
      this.errored = true;
      this.spinner.hide();
      this.alertService.danger({
            html: '<b> Please select a something first</b>'
          });
      return;
    }
  }
  rejectItems(): any {
    let itemsRejected = [];
    this.spinner.show();
    this.txnsApprovals.forEach((item, i) => {
      if (this.fval.txnApprovals.controls[i].controls.approved.value === true) {
        const data = {
          userId: this.User.userId,
          otheApprovalsAllId: this.fval.txnApprovals.controls[i].controls.otherApprovalsAllId.value,
          theLoanAmortizationCycle: null
        };
        this.cycles.forEach((cycle) => {
          if (cycle.name === this.fval.txnApprovals.controls[i].controls.amorCycle.value) {
            data.theLoanAmortizationCycle = cycle.code;
            itemsRejected.push(data);
          }
        });
      }
    });
    // console.log(itemsRejected);
    if (itemsRejected.length > 0) {
      this.others.postRejectIndividualLoanAmortizationCycle(itemsRejected).subscribe(
        res => {
          this.posted = true;
          this.alertService.success({
            html: '<b> Individual armotization cycles were rejected Successfully </b>'
          });
          itemsRejected = [];
          this.userForm = this.createFormGroup();
          this.fval.selectAll.setValue(false);
          this.initialiseForm();
          this.spinner.hide();
        },
        err =>  {
          this.errored = true;
          this.spinner.hide();
          this.alertService.danger({
            html: '<b>' + err.error.error.message + '</b>'
          });
        }
      );
    } else {
      this.errored = true;
      this.spinner.hide();
      this.alertService.danger({
            html: '<b> Please select a something first </b>'
          });
      return;
    }
  }
}
