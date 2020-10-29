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

@Component({
  selector: 'app-bussinessunits',
  templateUrl: './bussinessunits.component.html',
  styleUrls: ['./bussinessunits.component.scss'],
})
export class BussinessunitsComponent implements OnInit {
  unitForm: FormGroup;
  User = this.authService.loggedInUserInfo();
  bussinessUnits: any;

  constructor(
    private others: OthersService,
    private authService: AuthServiceService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.unitForm = this.createFormGroup();
    this.initialiseForm();
  }

  createFormGroup(): any {
    return this.fb.group({
      bussinessUnits: this.fb.array([this.unit]),
      bussinessUnitName: this.fb.control(
        '',
        Validators.compose([Validators.minLength(5)])
      ),
    });
  }

  get unit(): any {
    return this.fb.group({
      unitId: this.fb.control({ value: '' }),
      unitName: this.fb.control(
        { value: '' },
        Validators.compose([Validators.required, Validators.minLength(6)])
      ),
    });
  }
  addUnit(): any {
    // this.unitForm.controls.bussinessUnits  as FormArray
    (this.fval.bussinessUnits as FormArray).push(this.unit);
  }

  removeUnit(index: number): any {
    (this.fval.bussinessUnits as FormArray).removeAt(index);
  }

  initialiseForm(): any {
    let n: number;
    this.others.getBussinessUnits().subscribe(
    units => {
    this.bussinessUnits = units;
    this.bussinessUnits.forEach((item, i) => {
    // console.log(item);
    this.fval.bussinessUnits.controls[i].controls.unitId.setValue(item.businnessUnitId);
    this.fval.bussinessUnits.controls[i].controls.unitName.setValue(item.bussinessUnitName);
    this.addUnit();
    n = i + 1;
    });
    this.removeUnit(n);
    this.disableForms();
  },
    err => console.log(err)
    );
  }
  revert(): any {
    this.unitForm.reset();
  }

  refresh(): any {
    location.reload();
  }

  get fval(): any {
    return this.unitForm.controls;
  }

  disableForms(): any {
    this.bussinessUnits.forEach((itm, i) => {
      // console.log(i)
      this.fval.bussinessUnits.controls[i].disable();
    });
  }

  enableEdit(val: number): any {
    this.bussinessUnits.forEach((itm, i) => {
      // console.log(i)
      if (i === val) {
        this.fval.bussinessUnits.controls[i].enable();
      }
    });
  }

  createUnit(): any {
    const data = {
      bussinessUnitName: this.fval.bussinessUnitName.value.toUpperCase(),
      userId: this.User.userId
    };
    console.log(data);
    this.others.setBussinessUnits(data).subscribe(
      res => {
        // console.log(res);
        this.refresh();
      },
      error => {
        //
      }
    );
  }

  editUnit(index: number): any {
    // console.log(index);
    this.enableEdit(index);
  }

  saveUnit(index: number): any {
    this.fval.bussinessUnits.controls[index].disable();
    const data = {
      businnessUnitId: this.fval.bussinessUnits.controls[index].controls.unitId.value,
      bussinessUnitName: this.fval.bussinessUnits.controls[index].controls.unitName.value.toUpperCase(),
      userId: this.User.userId
    };
    // console.log(data);
    this.others.editBussinessUnits(data).subscribe(
      res => {
        // console.log(res);
      },
      error => console.log(error)
    );
  }
}
