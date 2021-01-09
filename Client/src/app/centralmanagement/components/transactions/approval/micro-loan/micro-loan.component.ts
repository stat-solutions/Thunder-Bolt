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
  actionButton: string;
  errored: boolean;
  serviceErrors: string;
  status: boolean;
  checkedOk: boolean;
  station: string;
  theCompany: string;
  User = this.authService.loggedInUserInfo();
  checkedLoan: any;
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
    this.others.getTxnForApproval().subscribe(
      items => {
        this.txnsApprovals = items;
        this.txnsApprovals.forEach((item, i) => {
        this.fval.txnApprovals.controls[i].controls.loanId.setValue(item.client);
        this.fval.txnApprovals.controls[i].controls.client.setValue(item.client);
        this.fval.txnApprovals.controls[i].controls.amount.setValue(item.rate);
        this.fval.txnApprovals.controls[i].controls.purpose.setValue(item.rate);
        this.fval.txnApprovals.controls[i].controls.approved.setValue(false);
        this.addItem();
        n = i + 1;
      });
        this.removeItem(n);
    }, err => {
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
      if (item.microLoanId === id) {
        this.checkedLoan = item;
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
    const itemsApproved = [];
    this.txnsApprovals.forEach((item, i) => {
      if (this.fval.txnApprovals.controls[i].controls.approved.value === true) {
        item.status = 2;
        itemsApproved.push(item);
      }
    });

    console.log(itemsApproved.length);
    if (itemsApproved.length > 0) {
      setTimeout(() => {
        this.router.navigate(['centralmanagement/dashboard']);
      }, 3000);
    } else {
      // alert("Please select something")
      return;
    }
  }
  rejectItems(): any {
    const itemsRejected = [];
    this.txnsApprovals.forEach((item, i) => {
      if (this.fval.txnApprovals.controls[i].controls.approved.value === true) {
        item.status = 1;
        itemsRejected.push(item);
      }
    });
    console.log(itemsRejected.length);
    if (itemsRejected.length > 0) {
      setTimeout(() => {
        this.router.navigate(['centralmanagement/dashboard']);
      }, 3000);
    } else {
      // alert("Please select something")
      return;
    }
  }
}
