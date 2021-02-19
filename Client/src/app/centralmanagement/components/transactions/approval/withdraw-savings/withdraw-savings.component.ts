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
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { OthersService } from 'src/app/shared/services/other-services/others.service';

@Component({
  selector: 'app-withdraw-savings',
  templateUrl: './withdraw-savings.component.html',
  styleUrls: ['./withdraw-savings.component.scss'],
})
export class WithdrawSavingsComponent implements OnInit {
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
    this.others.getSavingsCustomers().subscribe(
      res => {
        if (res.length > 0){
          this.customers = res;
        } else {
          this.errored = true;
          this.alertService.danger({
            html: '<b>There are no Savings customers registered</b>'
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
      txnApprovalDetailsId: this.fb.control({ value: '' }),
      comment: this.fb.control({ value: '' }),
      client: this.fb.control({ value: '' }),
      clientId: this.fb.control({ value: '' }),
      amount: this.fb.control({ value: '' }),
      product: this.fb.control({ value: '' }),
      station: this.fb.control({ value: '' }),
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
    this.others.getTxnsForApproval().subscribe(
      items => {
          this.txnsApprovals = items;
          this.txnsApprovals.forEach((item, i) => {
          const details = JSON.parse(item.txnApprovalDetailsPayLoad);
          this.fval.txnApprovals.controls[i].controls.txnApprovalDetailsId.setValue(item.txnApprovalDetailsId);
          this.fval.txnApprovals.controls[i].controls.clientId.setValue(details.customerId);
          this.customers.forEach(customer => {
            if (customer.customerId === details.customerId) {
              this.fval.txnApprovals.controls[i].controls.client.setValue(customer.customerName);
            }
          });
          this.fval.txnApprovals.controls[i].controls.product.setValue(item.txnDetailsCat + 'S');
          this.fval.txnApprovals.controls[i].controls.station.setValue(item.stationName);
          this.fval.txnApprovals.controls[i].controls.amount.setValue(details.txnAmount);
          this.fval.txnApprovals.controls[i].controls.comment.setValue('Please approve this listed transaction');
          this.fval.txnApprovals.controls[i].controls.approved.setValue(false);
          this.addItem();
          n = i + 1;
        });
          this.removeItem(n);
          this.loaded = true;
      }, err => {
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
        itemsApproved.push({
          txnApprovalDetailsId: this.fval.txnApprovals.controls[i].controls.txnApprovalDetailsId.value,
          userId: this.User.userId,
        });
      }
    });
    if (itemsApproved.length > 0) {
      this.others.postApproveTxns(itemsApproved).subscribe(
        res => {
          this.posted = true;
          this.alertService.success({
            html: '<b> Savings Withdraw was Approved Successfully </b>'
          });
          itemsApproved = [];
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
            html: '<b> Please select something first </b>'
          });
      return;
    }
  }
  rejectItems(): any {
    let itemsRejected = [];
    this.spinner.show();
    this.txnsApprovals.forEach((item, i) => {
      if (this.fval.txnApprovals.controls[i].controls.approved.value === true) {
        item.status = 1;
        itemsRejected.push({
          txnApprovalDetailsId: this.fval.txnApprovals.controls[i].controls.txnApprovalDetailsId.value,
          userId: this.User.userId,
        });
      }
    });
    if (itemsRejected.length > 0) {
      this.others.postRejectTxns(itemsRejected).subscribe(
        res => {
          this.posted = true;
          this.alertService.success({
            html: '<b> Savings Withraws Were rejected Successfully </b>'
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
            html: '<b> Please select a loan first </b>'
          });
      return;
    }
  }
}
