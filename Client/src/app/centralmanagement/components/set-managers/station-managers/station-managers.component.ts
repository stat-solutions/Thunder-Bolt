import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'ngx-alerts';
import { ArrayType } from '@angular/compiler';
import { OthersService } from 'src/app/shared/services/other-services/others.service';
import { CustomValidator } from 'src/app/validators/custom-validator';
// import { BsModalService } from 'ngx-bootstrap/modal';
// import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


export interface Approvals {
  name: string;
  level: number;
}

@Component({
  selector: 'app-station-managers',
  templateUrl: './station-managers.component.html',
  styleUrls: ['./station-managers.component.scss']
})
export class StationManagersComponent implements OnInit {
  managersForm: FormGroup;
  posted = false;
  showLevels: number;
  actionButton: string;
  errored: boolean;
  serviceErrors: string;
  status: boolean;
  checkedOk: boolean;
  station: string;
  theCompany: string;
  managers =
  [
    { areaName: 'Don Petrol', manager: 'mukwaya' },
    { areaName: 'Wes gas', manager: 'matugga' },
  ];
  constructor(
    private others: OthersService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.managersForm = this.createFormGroup();
    this.initialiseForm();
  }
  createFormGroup(): any {
    return this.fb.group({
      stationManagers: this.fb.array([this.stationManager]),
    });
  }
  get stationManager(): any {
    return this.fb.group({
      areaName: this.fb.control({ value: '' }),
      id: this.fb.control({ value: '' }),
      currentManager: this.fb.control({ value: '' }),
      selectedManager: this.fb.control(
        {value: ''},
        Validators.compose([
          Validators.required,
        ])
      ),
    });
  }
  addItem(): any {
    (this.fval.stationManagers as FormArray).push(this.stationManager);
  }

  removeItem(index: number): any {
    (this.fval.stationManagers as FormArray).removeAt(index);
  }

  initialiseForm(): any {
    let n: number;
    this.managers.forEach((item, i) => {
    this.fval.stationManagers.controls[i].controls.areaName.setValue(item.areaName.replace(/_/g, ' ').toUpperCase());
    // this.fval.approvalItems.controls[i].controls.id.setValue(item.itemRequiringApprovalId);
    this.fval.stationManagers.controls[i].controls.currentManager.setValue(item.manager.toUpperCase());
    this.fval.stationManagers.controls[i].controls.selectedManager.setValue(item.manager.toUpperCase());
    this.addItem();
    n = i + 1;
  });
    this.removeItem(n);
    this.disableForms();
    //       },
    //       error => console.log(error)
    //     );
    //   },
    //   err => console.log(err)
    // );
  }
revert(): any {
    this.managersForm.reset();
  }

  // revert() {
  //   this.approvalForm.reset();
  // }

refresh(): any {
    location.reload();
  }

get fval(): any {
    return this.managersForm.controls;
  }

disableForms(): any {
  // console.log(this.approvals);
  this.managers.forEach((itm, i) => {
    this.fval.stationManagers.controls[i].disable();
  });
  }

enableEdit(val: number): any {
    this.showLevels = val;
    this.managers.forEach((itm, i) => {
      if (i === val) {
        this.fval.stationManagers.controls[i].enable();
      }
    });
  }

saveLevel(index: any): any {

  }
}
