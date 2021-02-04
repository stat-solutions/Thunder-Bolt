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
import { OthersService } from 'src/app/shared/services/other-services/others.service';
// import { BsModalService } from 'ngx-bootstrap/modal';
// import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  userForm: FormGroup;
  approvedTowns = [];
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
    // console.log(this.User);
  }
  createFormGroup(): any {
    return this.fb.group({
      selectedTowns: this.fb.array([this.selectTown]),
      selectAll: this.fb.control({}),
    });
  }
  get selectTown(): any {
    return this.fb.group({
      townId: this.fb.control({ value: '' }),
      townName: this.fb.control({ value: '' }),
      approved: this.fb.control({}),
    });
  }
  addItem(): any {
    // this.unitForm.controls.bussinessUnits  as FormArray
    (this.fval.selectedTowns as FormArray).push(this.selectTown);
  }

  removeItem(index: number): any {
    (this.fval.selectedTowns as FormArray).removeAt(index);
  }
  initialiseForm(): any {
    let n: number;
    this.others.getTowns().subscribe(
      units => {
        this.approvedTowns = units;
        this.approvedTowns.forEach((item, i) => {
          // console.log(item.townName);
          // console.log(i);
          this.fval.selectedTowns.controls[i].controls.townId.setValue(
            item.townId
          );
          this.fval.selectedTowns.controls[i].controls.townName.setValue(
            item.townName.toUpperCase()
          );
          this.fval.selectedTowns.controls[i].controls.approved.setValue(
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
      this.approvedTowns.forEach((item, i) => {
        this.fval.selectedTowns.controls[i].controls.approved.setValue(
          val
        );
      });
    } else {
      this.approvedTowns.forEach((item, i) => {
        this.fval.selectedTowns.controls[i].controls.approved.setValue(
          false
        );
      });
    }
  }
  deselectAll(val: any): any {
    // console.log(this.fval.approveAreas["controls"][val]["controls"].approved.value)
    if (
      this.fval.selectedTowns.controls[val].controls.approved.value === true
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
    const townsSelected = [];
    this.approvedTowns.forEach((item, i) => {
      if (this.fval.selectedTowns.controls[i].controls.approved.value === true) {
        townsSelected.push({
            townId: item.townId,
            theAreaLocationId: this.User.userLocationId,
            userId: this.User.userId
        });
      }
    });
    // console.log(townsSelected);
    if (townsSelected.length > 0) {
        this.others.createTheTown(townsSelected).subscribe(
          res => {
            this.posted = true;
            this.alertService.success({
              html: '<b> Towns were  set successfully</b>'
            });
            setTimeout(() => {
              this.userForm = this.createFormGroup();
              this.fval.selectAll.setValue(false);
              this.initialiseForm();
            }, 3000);
          }, err => {
            this.errored = true;
            this.alertService.danger({
              html: '<b>Something went wrong</b>'
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
  cancelSelection(): any {
    this.revert();
    setTimeout(() => {
      this.router.navigate(['areamanagement']);
    }, 3000);
  }
}
