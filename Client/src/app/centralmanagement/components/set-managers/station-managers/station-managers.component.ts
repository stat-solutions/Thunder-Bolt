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
  User = this.authService.loggedInUserInfo();
  users: any;
  stationsManager: any;
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
    this.others.getAllTheStationLocations().subscribe(
      res => {
        this.stationsManager = res;
        this.stationsManager.forEach((item, i) => {
        this.fval.stationManagers.controls[i].controls.areaName.setValue(item.stationName.replace(/_/g, ' ').toUpperCase());
        this.fval.approvalItems.controls[i].controls.id.setValue(item.theSationLocationId);
        this.fval.stationManagers.controls[i].controls.currentManager.setValue(item.userName.toUpperCase());
        this.fval.stationManagers.controls[i].controls.selectedManager.setValue(item.userName.toUpperCase());
        this.addItem();
        n = i + 1;
      });
        this.removeItem(n);
        this.disableForms();
      },
        error => console.log(error)
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
  this.stationsManager.forEach((itm, i) => {
    this.fval.stationManagers.controls[i].disable();
  });
  }

enableEdit(val: number): any {
    this.showLevels = val;
    this.others.getUsersByLocation(this.fval.staationManagers.controls[val].controls.areaId.value).subscribe(
      res => {
        this.users = res;
        // console.log(this.users);
      },
      err => console.log(err)
    );
    this.fval.stationManagers.controls[val].enable();
  }

saveManager(index: any): any {
  if (this.fval.sationManagers.controls[index].valid) {
    const data = {
      theAreaLocationId: this.fval.sationManagers.controls[index].controls.stationId.value,
      userId: null
  };
    // console.log(this.fval.sationManagers.controls[index].controls.selectedManager.value);
    this.users.forEach((item) => {
    if (item.userName.toUpperCase() === this.fval.sationManagers.controls[index].controls.selectedManager.value) {
        data.userId = item.userId;
    } else {
      // console.log(item);
    }
  });
    this.fval.sationManagers.controls[index].disable();
    this.showLevels = null;
    // console.log(data);
    this.others.setStationManager(data).subscribe(
      res => {
        // console.log(res);
        this.fval.sationManagers.controls[index].controls.currentManager.setValue(
          this.fval.sationManagers.controls[index].controls.selectedManager.value
        );
      },
      err => console.log(err)
    );
    } else {
      return;
    }
  }
}
