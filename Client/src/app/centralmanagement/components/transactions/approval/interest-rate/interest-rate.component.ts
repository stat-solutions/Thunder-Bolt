import { Component, OnInit, TemplateRef } from '@angular/core';
// import * as jwt_decode from 'jwt-decode';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'ngx-alerts';
import { OthersService } from 'src/app/shared/services/other-services/others.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-interest-rate',
  templateUrl: './interest-rate.component.html',
  styleUrls: ['./interest-rate.component.scss'],
})
export class InterestRateComponent implements OnInit {
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
      rate: this.fb.control({ value: '' }),
      comment: this.fb.control({ value: '' }),
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
    this.others.getIdividualLoanInterestRate().subscribe(
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
          this.fval.txnApprovals.controls[i].controls.rate.setValue(details.theLoanInterestRate);
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
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-lg modal-dialog-center' })
    );
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

