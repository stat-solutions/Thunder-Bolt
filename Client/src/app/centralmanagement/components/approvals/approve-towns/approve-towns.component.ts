import { Component, OnInit } from '@angular/core';
// import * as jwt_decode from 'jwt-decode';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'ngx-alerts';
import { OthersService } from 'src/app/shared/services/other-services/others.service';
// import { BsModalService } from 'ngx-bootstrap/modal';
// import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

export interface TownApprovals {
  town: string;
  status: number;
}

@Component({
  selector: 'app-approve-towns',
  templateUrl: './approve-towns.component.html',
  styleUrls: ['./approve-towns.component.scss']
})
export class ApproveTownsComponent implements OnInit {
  userForm: FormGroup;
  townApprovals: any;
  posted = false;
  actionButton: string;
  errored: boolean;
  serviceErrors: string;
  status: boolean;
  checkedOk: boolean;
  User = this.authService.loggedInUserInfo();
  constructor(
    private others: OthersService,
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
      approveTowns: this.fb.array([this.townApproval]),
      selectAll: this.fb.control({})
    });
  }
  get townApproval(): any {
    return this.fb.group({
      town: this.fb.control({value: ''}),
      approved: this.fb.control({})
    });
  }
  addItem(): any {
    // this.unitForm.controls.bussinessUnits  as FormArray
    (this.fval.approveTowns as FormArray).push(this.townApproval);
  }

  removeItem(index: number): any {
    (this.fval.approveTowns as FormArray).removeAt(index);
  }
  initialiseForm(): any {
    let n: number;
    this.others.getAreasToApprove(this.User.userId).subscribe(
      items => {
        this.townApprovals = items;
        console.log(this.townApprovals);
        this.townApprovals.forEach((item, i) => {
              // console.log(item.town);
              // console.log(i);
              // this.fval.approveTowns.controls[i].controls.town.setValue(item.town);
              this.fval.approveTowns.controls[i].controls.approved.setValue(false);
              this.addItem();
              n = i + 1;
            });
        this.removeItem(n);
      }
    );
  }

  checkAllItems(val: boolean): any {
    if (val === true) {
      this.townApprovals.forEach((item, i) => {
        this.fval.approveTowns.controls[i].controls.approved.setValue(val);
      });
    } else {
      this.townApprovals.forEach((item, i) => {
        this.fval.approveTowns.controls[i].controls.approved.setValue(false);
      });
    }
  }
  deselectAll(val: number): any {
    // console.log(this.fval.approveAreas["controls"][val]["controls"].approved.value)
    if (this.fval.approveTowns.controls[val].controls.approved.value === true) {
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
    this.townApprovals.forEach((item, i) => {
      if (this.fval.approveTowns.controls[i].controls.approved.value === true) {
        itemsApproved.push({
          // areaRegionId: item.areaRegionId,
          areaRegionStatus: 2,
          userId: this.User.userId
        });
      }
    });

    // console.log(itemsApproved)
    if (itemsApproved.length > 0) {
      this.others.approveTowns(itemsApproved).subscribe(
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
    this.townApprovals.forEach((item, i) => {
      if (this.fval.approveTowns.controls[i].controls.approved.value === true) {
        itemsRejected.push({
          // areaRegionId: item.areaRegionId,
          areaRegionStatus: 3,
          userId: this.User.userId
        });
      }
    });
    // console.log(itemsRejected.length)
    if (itemsRejected.length > 0) {
      this.others.rejectTowns(itemsRejected).subscribe(
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


