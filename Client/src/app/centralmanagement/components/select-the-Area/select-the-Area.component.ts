import { Component, OnInit } from '@angular/core';
// import * as jwt_decode from 'jwt-decode';
import {FormGroup, FormControl, Validators, FormBuilder, FormArray, } from '@angular/forms';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'ngx-alerts';
// import { BsModalService } from 'ngx-bootstrap/modal';
// import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-lib-select-the-area',
  templateUrl: './select-the-Area.component.html',
  styleUrls: ['./select-the-Area.component.scss']
})
export class SelectTheAreaComponent implements OnInit {
  userForm: FormGroup;
  approvedAreas = [
    {
      areaId: 2,
      areaName: 'kinawattaka'
    },
    {
      areaId: 2,
      areaName: 'kinawattaka'
    },
     {
      areaId: 2,
      areaName: 'kinawattaka'
    },
    {
      areaId: 2,
      areaName: 'kinawattaka'
    },
    {
      areaId: 2,
      areaName: 'kinawattaka'
    },
  ];
  posted = false;
  actionButton: string;
  errored: boolean;
  serviceErrors: string;
  status: boolean;
  checkedOk: boolean;
  constructor(
    private authService: AuthServiceService,
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
      selectedAreas: this.fb.array([this.selectArea]),
      selectAll: this.fb.control({}),
    });
  }
  get selectArea(): any {
    return this.fb.group({
      areaId: this.fb.control({ value: '' }),
      areaName: this.fb.control({ value: '' }),
      approved: this.fb.control({}),
    });
  }
  addItem(): any {
    // this.unitForm.controls.bussinessUnits  as FormArray
    (this.fval.selectedAreas as FormArray).push(this.selectArea);
  }

  removeItem(index: number): any {
    (this.fval.selectedAreas as FormArray).removeAt(index);
  }
  initialiseForm(): any {
    let n: number;
    // this.others.getBussinessUnits().subscribe(
    //   units => {
    //     this.approvals = units;
    this.approvedAreas.forEach((item, i) => {
      // console.log(item.areaName);
      // console.log(i);
      this.fval.selectedAreas.controls[i].controls.areaId.setValue(
        item.areaId
      );
      this.fval.selectedAreas.controls[i].controls.areaName.setValue(
        item.areaName
      );
      this.fval.selectedAreas.controls[i].controls.approved.setValue(
        false
      );
      this.addItem();
      n = i + 1;
    });
    this.removeItem(n);
    // }
    // )
  }
  checkAllItems(val: boolean): any {
    if (val === true) {
      this.approvedAreas.forEach((item, i) => {
        this.fval.selectedAreas.controls[i].controls.approved.setValue(
          val
        );
      });
    } else {
      this.approvedAreas.forEach((item, i) => {
        this.fval.selectedAreas.controls[i].controls.approved.setValue(
          false
        );
      });
    }
  }
  deselectAll(val: any): any {
    // console.log(this.fval.approveAreas["controls"][val]["controls"].approved.value)
    if (
      this.fval.selectedAreas.controls[val].controls.approved.value === true
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
    // const itemsApproved = [];
    // this.centralUserApprovals.forEach((item, i) => {
    //   if (
    //     this.fval.approveUsers.controls[i].controls.approved.value === true
    //   ) {
    //     item.status = 2;
    //     itemsApproved.push(item);
    //   }
    // });

    // console.log(itemsApproved.length);
    // if (itemsApproved.length > 0) {
    //   setTimeout(() => {
    //     this.router.navigate(['centralmanagement/dashboard']);
    //   }, 3000);
    // } else {
    //   // alert("Please select something")
    //   return;
    // }
  }
  rejectItems(): any {
    // const itemsRejected = [];
    // this.centralUserApprovals.forEach((item, i) => {
    //   if (
    //     this.fval.approveUsers.controls[i].controls.approved.value === true
    //   ) {
    //     item.status = 1;
    //     itemsRejected.push(item);
    //   }
    // });
    // console.log(itemsRejected.length);
    // if (itemsRejected.length > 0) {
    //   setTimeout(() => {
    //     this.router.navigate(['centralmanagement/dashboard']);
    //   }, 3000);
    // } else {
    //   // alert("Please select something")
    //   return;
    // }
  }
}
