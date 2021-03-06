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
export interface ApproveCentralUsers {
  userID: string;
  userName: string;
  userRole: string;
  userLocation: string;
  status: number;
}

@Component({
  selector: 'app-approve-central-users',
  templateUrl: './approve-central-users.component.html',
  styleUrls: ['./approve-central-users.component.scss'],
})
export class ApproveCentralUsersComponent implements OnInit {
  userForm: FormGroup;
  centralUserApprovals = [];
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
      approveUsers: this.fb.array([this.centralUserApproval]),
      selectAll: this.fb.control({}),
    });
  }
  get centralUserApproval(): any {
    return this.fb.group({
      userID: this.fb.control({ value: '' }),
      userName: this.fb.control({ value: '' }),
      userRole: this.fb.control({ value: '' }),
      userLocation: this.fb.control({ value: '' }),
      approved: this.fb.control({}),
    });
  }
  addItem(): any {
    // this.unitForm.controls.bussinessUnits  as FormArray
    (this.fval.approveUsers as FormArray).push(this.centralUserApproval);
  }

  removeItem(index: number): any {
    (this.fval.approveUsers as FormArray).removeAt(index);
  }
  initialiseForm(): any {
    let n: number;
    this.others.getUsersForApproval().subscribe(
      units => {
        this.centralUserApprovals = units;
        // console.log(this.centralUserApprovals);
        this.centralUserApprovals.forEach((item, i) => {
        this.fval.approveUsers.controls[i].controls.userID.setValue(item.userId);
        this.fval.approveUsers.controls[i].controls.userName.setValue(item.userName.toUpperCase());
        this.fval.approveUsers.controls[i].controls.userRole.setValue(item.roleName.replace(/_/g, ' ').toUpperCase());
        this.fval.approveUsers.controls[i].controls.userLocation.setValue(item.locationName.toUpperCase());
        this.fval.approveUsers.controls[i].controls.approved.setValue(
          false
        );
        this.addItem();
        n = i + 1;
      });
        this.loaded = true;
        this.removeItem(n);
      }
    );
  }
  checkAllItems(val: boolean): any {
    if (val === true) {
      this.centralUserApprovals.forEach((item, i) => {
        this.fval.approveUsers.controls[i].controls.approved.setValue(
          val
        );
      });
    } else {
      this.centralUserApprovals.forEach((item, i) => {
        this.fval.approveUsers.controls[i].controls.approved.setValue(
          false
        );
      });
    }
  }
  deselectAll(val: number): any {
    // console.log(this.fval.approveAreas["controls"][val]["controls"].approved.value)
    if (
      this.fval.approveUsers.controls[val].controls.approved.value === true
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
    this.spinner.show();
    const itemsApproved = [];
    this.centralUserApprovals.forEach((item, i) => {
      if (this.fval.approveUsers.controls[i].controls.approved.value === true) {
        itemsApproved.push({
          userId: item.userId,
          userStatus: 2,
          userIdApprover: this.User.userId
        });
      }
    });

    // console.log(itemsApproved.length);
    if (itemsApproved.length > 0) {
      this.others.approveUsers(itemsApproved).subscribe(
        res => {
          this.posted = true;
          this.alertService.success({
            html: '<b> Users where approved successfully</b>'
          });
          this.userForm = this.createFormGroup();
          this.fval.selectAll.setValue(false);
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
  rejectItems(): any {
    const itemsRejected = [];
    this.spinner.show();
    this.centralUserApprovals.forEach((item, i) => {
      if (this.fval.approveUsers.controls[i].controls.approved.value === true) {
        itemsRejected.push({
            userId: item.userId,
            userStatus: 3,
            userIdApprover: this.User.userId
          });
      }
    });
    // console.log(itemsRejected.length);
    if (itemsRejected.length > 0) {
      this.others.rejectUsers(itemsRejected).subscribe(
        res => {
          this.posted = true;
          this.alertService.success({
            html: '<b> Users where rejected successfully</b>'
          });
          this.userForm = this.createFormGroup();
          this.fval.selectAll.setValue(false);
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
}
