import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'ngx-alerts';
import { OthersService } from 'src/app/shared/services/other-services/others.service';

export interface AreaApprovals {
  area: string;
  status: number;
}

@Component({
  selector: 'app-approve-areas',
  templateUrl: './approve-areas.component.html',
  styleUrls: ['./approve-areas.component.scss'],
})
export class ApproveAreasComponent implements OnInit {
  userForm: FormGroup;
  posted = false;
  loaded = false;
  errored: boolean;
  serviceErrors: string;
  status: boolean;
  checkedOk: boolean;
  areaApproval = [];
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
      approveAreas: this.fb.array([this.areaApprovals]),
      selectAll: this.fb.control({}),
    });
  }
  get areaApprovals(): any {
    return this.fb.group({
      areaId: this.fb.control({ value: '' }),
      area: this.fb.control({ value: '' }),
      approved: this.fb.control({}),
    });
  }
  addItem(): any {
    // this.unitForm.controls.bussinessUnits  as FormArray
    (this.fval.approveAreas as FormArray).push(this.areaApprovals);
  }

  removeItem(index: number): any {
    (this.fval.approveAreas as FormArray).removeAt(index);
  }
  initialiseForm(): any {
    let n: number;
    this.others.getAreasToApprove(this.User.userId).subscribe(
      items => {
        this.areaApproval = items;
        // console.log(this.areaApproval);
        this.areaApproval.forEach((item, i) => {
        this.fval.approveAreas.controls[i].controls.areaId.setValue(item.areaRegionId);
        this.fval.approveAreas.controls[i].controls.area.setValue(item.areaRegionName);
        this.fval.approveAreas.controls[i].controls.approved.setValue(false);
        this.addItem();
        n = i + 1;
      });
        this.loaded = true;
        this.removeItem(n);
      },
      err => console.log(err)
    );
  }
  checkAllItems(val: boolean): any {
    if (val === true) {
      this.areaApproval.forEach((item, i) => {
        this.fval.approveAreas.controls[i].controls.approved.setValue(val);
      });
    } else {
      this.areaApproval.forEach((item, i) => {
        this.fval.approveAreas.controls[i].controls.approved.setValue(false);
      });
    }
  }
  deselectAll(val: number): any {
    // console.log(this.fval.approveAreas["controls"][val]["controls"].approved.value)
    if (this.fval.approveAreas.controls[val].controls.approved.value === true) {
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

  approveItems(): any {
    const itemsApproved = [];
    this.spinner.show();
    this.areaApproval.forEach((item, i) => {
      if (this.fval.approveAreas.controls[i].controls.approved.value === true) {
        itemsApproved.push({
          areaRegionId: item.areaRegionId,
          areaRegionStatus: 2,
          userId: this.User.userId
        });
      }
    });

    // console.log(itemsApproved);
    if (itemsApproved.length > 0) {
      this.others.approveAreas(itemsApproved).subscribe(
        res => {
          if (res) {
            this.posted = true;
            this.alertService.success({
              html: '<b> Areas were approved successfully</b>'
            });
            this.userForm = this.createFormGroup();
            this.fval.selectAll.setValue(false);
            this.initialiseForm();
            this.spinner.hide();
          }
        },
        err => {
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
  rejectItems(): any {
    const itemsRejected = [];
    this.spinner.show();
    this.areaApproval.forEach((item, i) => {
      if (this.fval.approveAreas.controls[i].controls.approved.value === true) {
        itemsRejected.push({
          areaRegionId: item.areaRegionId,
          areaRegionStatus: 3,
          userId: this.User.userId
        });
      }
    });
    // console.log(itemsRejected);
    if (itemsRejected.length > 0) {
      this.others.rejectAreas(itemsRejected).subscribe(
        res => {
          if (res) {
            this.posted = true;
            this.alertService.success({
              html: '<b> Areas were rejected successfully</b>'
            });
            this.userForm = this.createFormGroup();
            this.fval.selectAll.setValue(false);
            this.initialiseForm();
            this.spinner.hide();
          }
        },
        err => {
          this.errored = true;
          this.alertService.danger({
              html: '<b>' + err.error.ststusText + '</b>'
            });
        }
      );
    } else {
      this.errored = true;
      this.alertService.danger({
              html: '<b> Please select something </b>'
            });
      return;
    }
  }
}

