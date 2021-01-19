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
  selector: 'app-micro-loan',
  templateUrl: './micro-loan.component.html',
  styleUrls: ['./micro-loan.component.scss'],
})
export class MicroLoanComponent implements OnInit {
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
      loanId: this.fb.control({ value: '' }),
      client: this.fb.control({ value: '' }),
      amount: this.fb.control({ value: '' }),
      purpose: this.fb.control({ value: '' }),
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
    this.others.getMicroCustomers().subscribe(
      res => {
        this.customers = res;
        this.others.getTxnForApproval().subscribe(
          items => {
            this.txnsApprovals = items;
            this.txnsApprovals.forEach((item, i) => {
            this.fval.txnApprovals.controls[i].controls.loanId.setValue(item.txnApprovalDetailsMicroId);
            const details = JSON.parse(item.txnApprovalDetailsMicroPayLoad);
            for (const customer of this.customers){
              if (customer.customerId === details[0].customerId) {
                this.fval.txnApprovals.controls[i].controls.client.setValue(customer.customerName);
              }
            }
            this.fval.txnApprovals.controls[i].controls.amount.setValue(Number(details[0].txnAmount));
            this.fval.txnApprovals.controls[i].controls.purpose.setValue(details[0].microLoanPurpose);
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
      },
      err => {
        this.errored = true;
        console.log(err);
        this.alertService.danger({
          html: '<b>' + err.error.error.message + '</b>'
        });
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
      if (item.txnApprovalDetailsMicroId === id) {
        let client;
        const details = JSON.parse(item.txnApprovalDetailsMicroPayLoad);
        for (const customer of this.customers){
          if (customer.customerId === details[0].customerId) {
           client = customer;
          }
        }
        this.checkedLoan =  {
          url: client.customerPhotoUrl,
          name: client.customerName,
          phone: client.customerPhone1,
          data: details
        };
        if (this.checkedLoan.data[1][1].length > 0) {
          for (const itm of this.checkedLoan.data[1][1]) {
            for (const security of this.securityTypes){
              if (security.securityTypeCode === itm.securityTypeCode){
                itm.securityTypeName = security.securityTypeName;
              }
            }
          }
        }
        this.modalRef = this.modalService.show(
          template,
          Object.assign({}, { class: 'white modal-lg modal-dialog-center' })
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
    this.txnsApprovals.forEach((item, i) => {
      if (this.fval.txnApprovals.controls[i].controls.approved.value === true) {
        itemsApproved.push({
          txnApprovalDetailsMircroId: this.fval.txnApprovals.controls[i].controls.loanId.value,
          userId: this.User.userId
        });
      }
    });
    if (itemsApproved.length > 0) {
      this.others.approveMicroTransaction(itemsApproved).subscribe(
        res => {
          this.posted = true;
          this.alertService.success({
            html: '<b> Micro Loan Approved Was Successfully </b>'
          });
          setTimeout(() => {
            itemsApproved = [];
            this.userForm = this.createFormGroup();
            this.fval.selectAll.setValue(false);
            this.initialiseForm();
          }, 3000);
        },
        err =>  {
          this.errored = true;
          this.alertService.danger({
            html: '<b>' + err.error.error.message + '</b>'
          });
        }
      );
    } else {
      this.errored = true;
      this.alertService.danger({
            html: '<b> Please select a loan first </b>'
          });
      return;
    }
  }
  rejectItems(): any {
    let itemsRejected = [];
    this.txnsApprovals.forEach((item, i) => {
      if (this.fval.txnApprovals.controls[i].controls.approved.value === true) {
        item.status = 1;
        itemsRejected.push({
          txnApprovalDetailsMircroId: this.fval.txnApprovals.controls[i].controls.loanId.value,
          userId: this.User.userId
        });
      }
    });
    if (itemsRejected.length > 0) {
      this.others.rejectMicroTransaction(itemsRejected).subscribe(
        res => {
          this.posted = true;
          this.alertService.success({
            html: '<b> Micro Loan Rejection Was Successfully </b>'
          });
          setTimeout(() => {
            itemsRejected = [];
            this.userForm = this.createFormGroup();
            this.fval.selectAll.setValue(false);
            this.initialiseForm();
          }, 3000);
        },
        err =>  {
          this.errored = true;
          this.alertService.danger({
            html: '<b>' + err.error.error.message + '</b>'
          });
        }
      );
    } else {
      this.errored = true;
      this.alertService.danger({
            html: '<b> Please select a loan first </b>'
          });
      return;
    }
  }
}
