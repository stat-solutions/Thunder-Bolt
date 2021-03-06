import { Component, OnInit } from '@angular/core';
// import * as jwt_decode from 'jwt-decode';
import {FormGroup, FormControl, Validators, FormBuilder, FormArray, } from '@angular/forms';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'ngx-alerts';
import { OthersService } from 'src/app/shared/services/other-services/others.service';
// import { BsModalService } from 'ngx-bootstrap/modal';
// import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-lib-select-the-area',
  templateUrl: './select-the-Area.component.html',
  styleUrls: ['./select-the-Area.component.scss']
})
export class SelectTheAreaComponent implements OnInit {
  userForm: FormGroup;
  approvedAreas = [];
  posted = false;
  loaded = false;
  actionButton: string;
  errored: boolean;
  serviceErrors: string;
  status: boolean;
  checkedOk: boolean;
  User = this.authService.loggedInUserInfo();
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
    this.others.getAreas().subscribe(
      units => {
        this.approvedAreas = units;
        // console.log(this.approvedAreas)
        // areaRegionId: 803
        // areaRegionName: "CENTRAL REGION"
        // areaRegionStatus: 2
        // fkApprovalDetailsIdAreaRegion: 125
        this.approvedAreas.forEach((item, i) => {
          this.fval.selectedAreas.controls[i].controls.areaId.setValue(item.areaRegionId);
          this.fval.selectedAreas.controls[i].controls.areaName.setValue(item.areaRegionName);
          this.fval.selectedAreas.controls[i].controls.approved.setValue(false);
          this.addItem();
          n = i + 1;
        });
        this.removeItem(n);
        this.loaded = true;
      }
    );
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
    this.userForm = this.createFormGroup();
    this.fval.selectAll.setValue(false);
    this.initialiseForm();
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
    const areasSelected = [];
    this.spinner.show();
    this.approvedAreas.forEach((item, i) => {
      if (this.fval.selectedAreas.controls[i].controls.approved.value === true) {
        areasSelected.push({
            areaRegionId: item.areaRegionId,
            theBusinessUnitId: this.User.userLocationId,
            userId: this.User.userId
        });
      }
    });
    // console.log(AreasSelected.length);
    if (areasSelected.length > 0) {
        this.others.createTheArea(areasSelected).subscribe(
          res => {
            this.posted = true;
            this.alertService.success({
              html: '<b> Areas were  set successfully</b>'
            });
            this.fval.selectAll.setValue(false);
            this.userForm = this.createFormGroup();
            this.initialiseForm();
            this.spinner.hide();
          }, err => {
            this.errored = true;
            this.spinner.hide();
            this.alertService.danger({
              html: '<b>' + err.error.ststusText + '</b>'
            });
          }
        );
    } else {
      this.errored = true;
      this.spinner.hide();
      this.alertService.danger({
              html: '<b> Please select something </b>'
            });
      return;
    }
  }
  cancelSelection(): any {
    this.revert();
    setTimeout(() => {
      this.router.navigate(['centralmanagement']);
    }, 3000);
  }
}
