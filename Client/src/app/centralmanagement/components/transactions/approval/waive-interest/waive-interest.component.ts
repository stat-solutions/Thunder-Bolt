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
  selector: 'app-waive-interest',
  templateUrl: './waive-interest.component.html',
  styleUrls: ['./waive-interest.component.scss'],
})
export class WaiveInterestComponent implements OnInit {
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
      amount: this.fb.control({ value: '' }),
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
    this.others.getWaivedInterestsForApproval().subscribe(
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
          this.fval.txnApprovals.controls[i].controls.amount.setValue(details.theInterestToBeWiaved);
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
        if (details.productCode === 400) {
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
        } else {
          this.others.bodaAndTaxiCustomerStatement({
            customerId: id,
            productCode: details.productCode
          }).subscribe(
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
        itemsApproved.push({
          userId: this.User.userId,
          otheApprovalsAllId: this.fval.txnApprovals.controls[i].controls.otherApprovalsAllId.value,
          theInterestToBeWiaved: this.fval.txnApprovals.controls[i].controls.amount.value
        });
      }
    });
    // console.log(itemsApproved);
    if (itemsApproved.length > 0) {
      this.others.postApproveWaivedInterest(itemsApproved).subscribe(
        res => {
          this.posted = true;
          this.alertService.success({
            html: '<b> Individual Waived Interests were approved Successfully </b>'
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
            html: '<b> Please select a something first </b>'
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
          userId: this.User.userId,
          otheApprovalsAllId: this.fval.txnApprovals.controls[i].controls.otherApprovalsAllId.value,
          theInterestToBeWiaved: this.fval.txnApprovals.controls[i].controls.amount.value
        });
      }
    });
    // console.log(itemsRejected);
    if (itemsRejected.length > 0) {
      this.others.postRejectWaivedInterest(itemsRejected).subscribe(
        res => {
          this.posted = true;
          this.alertService.success({
            html: '<b> Individual Waive Interests were rejected Successfully </b>'
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


