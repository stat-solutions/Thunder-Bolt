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
  errored: boolean;
  serviceErrors: string;
  status: boolean;
  checkedOk: boolean;
  areaApproval: any;
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
        // approvalDetailsId: 117
        // areaRegionId: 800
        // areaRegionName: "Albert Region"
        // areaRegionStatus: 1
        // createdBy: 1000000001
        // createdByAt: "2020-10-31T22:38:47.000Z"
        // firstApprovedBy: 1000000000
        // firstApprovedByAt: "2020-10-31T22:38:47.000Z"
        // firstUpdateApprovedBy: 1000000000
        // firstUpdateApprovedByAt: "2020-10-31T22:38:47.000Z"
        // fkApprovalDetailsIdAreaRegion: 117
        // secondApprovedBy: 1000000000
        // secondApprovedByAt: "2020-10-31T22:38:47.000Z"
        // secondUpdateApprovedBy: 1000000000
        // secondUpdateApprovedByAt: "2020-10-31T22:38:47.000Z"
        // thirdApprovedBy: 1000000000
        // thirdApprovedByAt: "2020-10-31T22:38:47.000Z"
        // thirdUpdateApprovedBy: 1000000000
        // thirdUpdateApprovedByAt: "2020-10-31T22:38:47.000Z"
        // updatedBy: 1000000000
        // updatedByAt: "2020-10-31T22:38:47.000Z"
        // console.log(item.name);
        // console.log(i);
        this.fval.approveAreas.controls[i].controls.area.setValue(item.areaRegionName);
        this.fval.approveAreas.controls[i].controls.approved.setValue(false);
        this.addItem();
        n = i + 1;
      });
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
    location.reload();
  }

  get fval(): any {
    return this.userForm.controls;
  }

  disableForm(): any {
    return this.userForm.disable();
  }

  approveItems(): any {
    const itemsApproved = [];
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
            this.initialiseForm();
          }
        },
        err => console.log(err)
      );
    } else {
      alert('Please select something');
      return;
    }
  }
  rejectItems(): any {
    const itemsRejected = [];
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
            this.initialiseForm();
          }
        },
        err => console.log(err)
      );
    } else {
      alert('Please select something');
      return;
    }
  }
}

