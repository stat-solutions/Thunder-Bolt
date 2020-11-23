import { Component, OnInit } from '@angular/core';
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
// import { BsModalService } from 'ngx-bootstrap/modal';
// import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

export interface IntRateApprovals {
  station: string;
  client: string;
  rate: number;
  status: number;
}

@Component({
  selector: 'app-loan-tenure',
  templateUrl: './loan-tenure.component.html',
  styleUrls: ['./loan-tenure.component.scss'],
})
export class LoanTenureComponent implements OnInit {
  userForm: FormGroup;
  ratesApprovals: IntRateApprovals[] = [
    { station: 'nsambya', client: 'Kasule Joseph', rate: 5, status: 0 },
    { station: 'kyengera', client: 'mukasa rony', rate: 8, status: 0 },
    { station: 'ndeeba', client: 'kasozi med', rate: 3, status: 0 },
    { station: 'kibuye', client: 'Kasule Joseph', rate: 4, status: 0 },
    { station: 'kyengera', client: 'mukasa rony', rate: 8, status: 0 },
    { station: 'ndeeba', client: 'kasozi med', rate: 3, status: 0 },
    { station: 'kibuye', client: 'Kasule Joseph', rate: 4, status: 0 },
    { station: 'bwayise', client: 'Kasule Jose', rate: 2, status: 0 },
  ];
  posted = false;
  actionButton: string;
  errored: boolean;
  serviceErrors: string;
  status: boolean;
  checkedOk: boolean;
  station: string;
  theCompany: string;
  constructor(
    private authService: AuthServiceService,
    private router: Router,
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
      approveRates: this.fb.array([this.rateApproval]),
      selectAll: this.fb.control({}),
    });
  }
  get rateApproval(): any {
    return this.fb.group({
      station: this.fb.control({ value: '' }),
      client: this.fb.control({ value: '' }),
      rate: this.fb.control({ value: '' }),
      approved: this.fb.control({}),
    });
  }
  addItem(): any {
    // this.unitForm.controls.bussinessUnits  as FormArray
    (this.fval.approveRates as FormArray).push(this.rateApproval);
  }

  removeItem(index: number): any {
    (this.fval.approveRates as FormArray).removeAt(index);
  }
  initialiseForm(): any {
    let n: number;
    // this.others.getBussinessUnits().subscribe(
    //   units => {
    //     this.approvals = units;
    this.ratesApprovals.forEach((item, i) => {
      // console.log(item.name);
      // console.log(i);
      this.fval.approveRates.controls[i].controls.station.setValue(
        item.station
      );
      this.fval.approveRates.controls[i].controls.client.setValue(item.client);
      this.fval.approveRates.controls[i].controls.rate.setValue(item.rate);
      this.fval.approveRates.controls[i].controls.approved.setValue(false);
      this.addItem();
      n = i + 1;
    });
    this.removeItem(n);
    // }
    // )
  }
  checkAllItems(val: boolean): any {
    if (val === true) {
      this.ratesApprovals.forEach((item, i) => {
        this.fval.approveRates.controls[i].controls.approved.setValue(val);
      });
    } else {
      this.ratesApprovals.forEach((item, i) => {
        this.fval.approveRates.controls[i].controls.approved.setValue(false);
      });
    }
  }
  deselectAll(val: number): any {
    // console.log(this.fval.approveAreas["controls"][val]["controls"].approved.value)
    if (this.fval.approveRates.controls[val].controls.approved.value === true) {
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
    this.ratesApprovals.forEach((item, i) => {
      if (this.fval.approveRates.controls[i].controls.approved.value === true) {
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
    this.ratesApprovals.forEach((item, i) => {
      if (this.fval.approveRates.controls[i].controls.approved.value === true) {
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
