import { Component, OnInit } from '@angular/core';
// import * as jwt_decode from 'jwt-decode';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'ngx-alerts';
import { OthersService } from 'src/app/shared/services/other-services/others.service';

// import { BsModalService } from 'ngx-bootstrap/modal';
// import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-loan-limit',
  templateUrl: './loan-limit.component.html',
  styleUrls: ['./loan-limit.component.scss'],
})
export class LoanLimitComponent implements OnInit {
  userForm: FormGroup;
  loanLimitApprovals: any;
  posted = false;
  actionButton: string;
  errored: boolean;
  serviceErrors: string;
  status: boolean;
  checkedOk: boolean;
  constructor(
    private authService: AuthServiceService,
    private others: OthersService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.userForm = this.createFormGroup();
    this.fval.selectAll.setValue(false);
    this.initialiseForm();
  }
  createFormGroup(): any {
    return this.fb.group({
      approveLoanLimits: this.fb.array([this.loanLimitApproval]),
      selectAll: this.fb.control({}),
    });
  }
  get loanLimitApproval(): any {
    return this.fb.group({
      station: this.fb.control({ value: '' }),
      client: this.fb.control({ value: '' }),
      ammount: this.fb.control({ value: '' }),
      approved: this.fb.control({}),
    });
  }
  addItem(): any {
    // this.unitForm.controls.bussinessUnits  as FormArray
    (this.fval.approveLoanLimits as FormArray).push(this.loanLimitApproval);
  }

  removeItem(index: number): any {
    (this.fval.approveLoanLimits as FormArray).removeAt(index);
  }
  initialiseForm(): any {
    let n: number;
    this.others.getIdividualLoanLimit().subscribe(
      res => {
        this.loanLimitApprovals = res;
        this.loanLimitApprovals.forEach((item, i) => {
          // console.log(item.name);
          // console.log(i);
          this.fval.approveLoanLimits.controls[i].controls.station.setValue(
            item.station
          );
          this.fval.approveLoanLimits.controls[i].controls.client.setValue(
            item.client
          );
          this.fval.approveLoanLimits.controls[i].controls.ammount.setValue(
            item.ammount
          );
          this.fval.approveLoanLimits.controls[i].controls.approved.setValue(
            false
          );
          this.addItem();
          n = i + 1;
        });
        this.removeItem(n);
        }
    );
  }
  checkAllItems(val: boolean): any {
    if (val === true) {
      this.loanLimitApprovals.forEach((item, i) => {
        this.fval.approveLoanLimits.controls[i].controls.approved.setValue(val);
      });
    } else {
      this.loanLimitApprovals.forEach((item, i) => {
        this.fval.approveLoanLimits.controls[i].controls.approved.setValue(false);
      });
    }
  }
  deselectAll(val: number): any {
    // console.log(this.fval.approveAreas["controls"][val]["controls"].approved.value)
    if (
      this.fval.approveLoanLimits.controls[val].controls.approved.value ===
      true
    ) {
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
    const itemsApproved = [];
    this.loanLimitApprovals.forEach((item, i) => {
      if (
        this.fval.approveLoanLimits.controls[i].controls.approved.value ===
        true
      ) {
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
    this.loanLimitApprovals.forEach((item, i) => {
      if (
        this.fval.approveLoanLimits.controls[i].controls.approved.value ===
        true
      ) {
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

