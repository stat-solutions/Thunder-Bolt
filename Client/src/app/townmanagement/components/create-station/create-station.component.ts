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
  selector: 'app-create-station',
  templateUrl: './create-station.component.html',
  styleUrls: ['./create-station.component.scss']
})
export class CreateStationComponent implements OnInit {
  userForm: FormGroup;
  approvedStations: any;
  posted = false;
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
      selectedStations: this.fb.array([this.selectStation]),
      selectAll: this.fb.control({}),
    });
  }
  get selectStation(): any {
    return this.fb.group({
      stationId: this.fb.control({ value: '' }),
      stationName: this.fb.control({ value: '' }),
      approved: this.fb.control({}),
    });
  }
  addItem(): any {
    // this.unitForm.controls.bussinessUnits  as FormArray
    (this.fval.selectedStations as FormArray).push(this.selectStation);
  }

  removeItem(index: number): any {
    (this.fval.selectedStations as FormArray).removeAt(index);
  }
  initialiseForm(): any {
    let n: number;
    this.others.getAreas().subscribe(
      units => {
        this.approvedStations = units;
        // console.log(this.approvedStations)
        this.approvedStations.forEach((item, i) => {
          // console.log(item.areaName);
          // console.log(i);
          // this.fval.selectedStations.controls[i].controls.areaId.setValue(
          //   item.areaRegionId
          // );
          // this.fval.selectedStations.controls[i].controls.areaName.setValue(
          //   item.areaName
          // );
          this.fval.selectedStations.controls[i].controls.approved.setValue(
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
      this.approvedStations.forEach((item, i) => {
        this.fval.selectedStations.controls[i].controls.approved.setValue(
          val
        );
      });
    } else {
      this.approvedStations.forEach((item, i) => {
        this.fval.selectedStations.controls[i].controls.approved.setValue(
          false
        );
      });
    }
  }
  deselectAll(val: any): any {
    // console.log(this.fval.approveAreas["controls"][val]["controls"].approved.value)
    if (
      this.fval.selectedStations.controls[val].controls.approved.value === true
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
    const areasSelected = [];
    this.approvedStations.forEach((item, i) => {
      if (this.fval.selectedStations.controls[i].controls.approved.value === true) {
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
            setTimeout(() => {
              this.refresh();
            }, 3000);
          }, err => console.log(err)
        );
    } else {
      alert('Please select something');
      return;
    }
  }
  cancelSelection(): any {
    this.revert();
    setTimeout(() => {
      this.router.navigate(['townmanagement']);
    }, 3000);
  }
}
