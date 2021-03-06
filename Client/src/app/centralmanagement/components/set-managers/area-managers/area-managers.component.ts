import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'ngx-alerts';
import { ArrayType } from '@angular/compiler';
import { OthersService } from 'src/app/shared/services/other-services/others.service';
import { CustomValidator } from 'src/app/validators/custom-validator';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
// import { BsModalService } from 'ngx-bootstrap/modal';
// import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-area-managers',
  templateUrl: './area-managers.component.html',
  styleUrls: ['./area-managers.component.scss']
})
export class AreaManagersComponent implements OnInit {
  managersForm: FormGroup;
  posted = false;
  loaded = false;
  showLevels: number;
  actionButton: string;
  errored: boolean;
  serviceErrors: string;
  status: boolean;
  checkedOk: boolean;
  User = this.authService.loggedInUserInfo();
  users: any;
  areasManager: any;
  constructor(
    private others: OthersService,
    private authService: AuthServiceService,
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
      areaManagers: this.fb.array([this.areaManager]),
    });
  }
  get areaManager(): any {
    return this.fb.group({
      areaName: this.fb.control({ value: '' }),
      areaId: this.fb.control({ value: '' }),
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
    (this.fval.areaManagers as FormArray).push(this.areaManager);
  }

  removeItem(index: number): any {
    (this.fval.areaManagers as FormArray).removeAt(index);
  }

  initialiseForm(): any {
    let n: number;
    this.others.getAllTheAreaLocations().subscribe(
      res => {
        this.areasManager = res;
        // console.log(this.areasManager);
        this.areasManager.forEach((item, i) => {
          this.fval.areaManagers.controls[i].controls.areaName.setValue(item.areaRegionName.replace(/_/g, ' ').toUpperCase());
          this.fval.areaManagers.controls[i].controls.areaId.setValue(item.theAreaLocationId);
          this.fval.areaManagers.controls[i].controls.currentManager.setValue(item.userName.toUpperCase());
          this.fval.areaManagers.controls[i].controls.selectedManager.setValue(item.userName.toUpperCase());
          this.addItem();
          n = i + 1;
        });
        this.loaded = true;
        this.removeItem(n);
        // console.log(this.fval.areaManagers);
        this.disableForms();

      },
      err => console.log(err)
    );
  }
revert(): any {
    this.managersForm.reset();
  }

refresh(): any {
    location.reload();
  }

get fval(): any {
    return this.managersForm.controls;
  }

disableForms(): any {
  // console.log(this.approvals);
  this.areasManager.forEach((itm, i) => {
    this.fval.areaManagers.controls[i].disable();
  });
  }

enableEdit(val: number): any {
    this.showLevels = val;
    this.others.getUsersByLocation(this.fval.areaManagers.controls[val].controls.areaId.value).subscribe(
      res => {
        this.users = res;
        // console.log(this.users);
      },
      err => console.log(err)
    );
    this.fval.areaManagers.controls[val].enable();
  }

saveManager(index: any): any {
  if (this.fval.areaManagers.controls[index].valid) {
    const data = {
      theAreaLocationId: this.fval.areaManagers.controls[index].controls.areaId.value,
      userId: null
  };
    // console.log(this.fval.areaManagers.controls[index].controls.selectedManager.value);
    this.users.forEach((item) => {
    if (item.userName.toUpperCase() === this.fval.areaManagers.controls[index].controls.selectedManager.value) {
        data.userId = item.userId;
    } else {
      // console.log(item);
    }
  });
    this.fval.areaManagers.controls[index].disable();
    this.showLevels = null;
    // console.log(data);
    this.others.setAreaManager(data).subscribe(
      res => {
        // console.log(res);
        this.fval.areaManagers.controls[index].controls.currentManager.setValue(
          this.fval.areaManagers.controls[index].controls.selectedManager.value
        );
      },
      err => console.log(err)
    );
    } else {
      return;
    }
  }
}
