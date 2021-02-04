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

export interface StationApprovals {
  station: string;
  status: number;
}

@Component({
  selector: 'app-approve-stations',
  templateUrl: './approve-stations.component.html',
  styleUrls: ['./approve-stations.component.scss']
})
export class ApproveStationsComponent implements OnInit {
  userForm: FormGroup;
  stationApproval = [];
  posted = false;
  loaded = false;
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
      approveStations: this.fb.array([this.stationApprovals]),
      selectAll: this.fb.control({})
    });
  }
  get stationApprovals(): any {
    return this.fb.group({
      station: this.fb.control({value: ''}),
      approved: this.fb.control({})
    });
  }
  addItem(): any {
    // this.unitForm.controls.bussinessUnits  as FormArray
    (this.fval.approveStations as FormArray).push(this.stationApprovals);
  }

  removeItem(index: number): any {
    (this.fval.approveStations as FormArray).removeAt(index);
  }
  initialiseForm(): any {
    let n: number;
    this.others.getStationsToApprove(this.User.userId).subscribe(
      items => {
        this.stationApproval = items;
        // console.log(this.stationApproval);
        this.stationApproval.forEach((item, i) => {
              this.fval.approveStations.controls[i].controls.station.setValue(item.stationName);
              this.fval.approveStations.controls[i].controls.approved.setValue(false);
              this.addItem();
              n = i + 1;
            });
        this.loaded =  true;
        this.removeItem(n);
      }
    );
  }
  checkAllItems(val: boolean): any {
    if (val === true) {
      this.stationApproval.forEach((item, i) => {
        this.fval.approveStations.controls[i].controls.approved.setValue(val);
      });
    } else {
      this.stationApproval.forEach((item, i) => {
        this.fval.approveStations.controls[i].controls.approved.setValue(false);
      });
    }
  }
  deselectAll(val: number): any{
    // console.log(this.fval.approveAreas["controls"][val]["controls"].approved.value)
    if (this.fval.approveStations.controls[val].controls.approved.value === true) {
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
    this.stationApproval.forEach((item, i) => {
      if (this.fval.approveStations.controls[i].controls.approved.value === true) {
        itemsApproved.push({
          stationId: item.stationId,
          stationStatus: 2,
          userId: this.User.userId
        });
      }
    });

    // console.log(itemsApproved)
    if (itemsApproved.length > 0) {
      this.others.approveStations(itemsApproved).subscribe(
        res => {
          if (res) {
            this.posted = true;
            this.alertService.success({
              html: '<b> Stations were approved successfully</b>'
            });
            setTimeout(() => {
              this.userForm = this.createFormGroup();
              this.fval.selectAll.setValue(false);
              this.initialiseForm();
            }, 3000);
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
  rejectItems(): any {
    const itemsRejected = [];
    this.stationApproval.forEach((item, i) => {
      if (this.fval.approveStations.controls[i].controls.approved.value === true) {
        itemsRejected.push({
          stationId: item.stationId,
          stationStatus: 3,
          userId: this.User.userId
        });
      }
    });
    // console.log(itemsRejected.length)
    if (itemsRejected.length > 0) {
      this.others.rejectStations(itemsRejected).subscribe(
        res => {
          if (res) {
            this.posted = true;
            this.alertService.success({
              html: '<b> Stations were rejected successfully</b>'
            });
            setTimeout(() => {
              this.userForm = this.createFormGroup();
              this.fval.selectAll.setValue(false);
              this.initialiseForm();
            }, 3000);
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

