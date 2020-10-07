import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'ngx-alerts';

export interface AreaApprovals {
  area: string;
  status: number;
}

@Component({
  selector: 'app-approve-areas',
  templateUrl: './approve-areas.component.html',
  styleUrls: ['./approve-areas.component.scss']
})
export class ApproveAreasComponent implements OnInit {
  userForm: FormGroup;
  posted = false;
  errored: boolean;
  serviceErrors: string;
  status: boolean;
  checkedOk: boolean;
  areaApproval: AreaApprovals[] = [
    { area: 'central', status: 0 },
    { area: 'Eastern', status: 0 },
    { area: 'Western', status: 0 },
    { area: 'Northern', status: 0 },
    { area: 'Nile region', status: 0 },
    { area: 'Albertine', status: 0 }
  ];
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
      approveAreas: this.fb.array([this.areaApprovals]),
      selectAll: this.fb.control({})
    });
  }
  get areaApprovals(): any {
    return this.fb.group({
      area: this.fb.control({value: ''}),
      approved: this.fb.control({})
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
    // this.others.getBussinessUnits().subscribe(
    //   units => {
    //     this.approvals = units;
    this.areaApproval.forEach((item, i) => {
          // console.log(item.name);
          // console.log(i);
          this.fval.approveAreas.controls[i].controls.area.setValue(item.area);
          this.fval.approveAreas.controls[i].controls.approved.setValue(false);
          this.addItem();
          n = i + 1;
        });
    this.removeItem(n);
      // }
    // )
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
      if (
        this.fval.approveAreas.controls[i].controls.approved.value === true
      ) {
        item.status = 2;
        itemsApproved.push(item);
      }
    });

    // console.log(itemsApproved)
    if (itemsApproved.length > 0) {
      setTimeout(() => {
        this.router.navigate([
          'centralmanagement/dashboard'
        ]);
      }, 3000);
    } else {
      // alert("Please select something")
      return;
    }
  }
  rejectItems(): any {
    const itemsRejected = [];
    this.areaApproval.forEach((item, i) => {
      if (
        this.fval.approveAreas.controls[i].controls.approved.value === true
      ) {
        item.status = 1;
        itemsRejected.push(item);
      }
    });
    // console.log(itemsRejected.length)
    if (itemsRejected.length > 0) {
      setTimeout(() => {
        this.router.navigate([
          'centralmanagement/dashboard'
        ]);
      }, 3000);
    } else {
      // alert("Please select something")
      return;
    }
  }

}

