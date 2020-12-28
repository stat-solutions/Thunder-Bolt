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
  selector: 'app-town-managers',
  templateUrl: './town-managers.component.html',
  styleUrls: ['./town-managers.component.scss']
})
export class TownManagersComponent implements OnInit {
  managersForm: FormGroup;
  posted = false;
  loaded = false;
  showLevels: number;
  actionButton: string;
  errored: boolean;
  serviceErrors: string;
  status: boolean;
  checkedOk: boolean;
  station: string;
  theCompany: string;
  users: any;
  User = this.authService.loggedInUserInfo();
  townsManager: any;
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
      townManagers: this.fb.array([this.townManager]),
    });
  }
  get townManager(): any {
    return this.fb.group({
      townName: this.fb.control({ value: '' }),
      townId: this.fb.control({ value: '' }),
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
    (this.fval.townManagers as FormArray).push(this.townManager);
  }

  removeItem(index: number): any {
    (this.fval.townManagers as FormArray).removeAt(index);
  }

  initialiseForm(): any {
    let n: number;
    this.others.getAllTheTownLocations().subscribe(
      res => {
        this.townsManager = res;
        // console.log(this.townsManager);
//         theTownLocationId: 1100
// townName: "Maganjo"
// userName: "Baziraked Augustine Googo"
        this.townsManager.forEach((item, i) => {
        this.fval.townManagers.controls[i].controls.townName.setValue(item.townName.replace(/_/g, ' ').toUpperCase());
        this.fval.townManagers.controls[i].controls.townId.setValue(item.theTownLocationId);
        this.fval.townManagers.controls[i].controls.currentManager.setValue(item.userName.toUpperCase());
        this.fval.townManagers.controls[i].controls.selectedManager.setValue(item.userName.toUpperCase());
        this.addItem();
        n = i + 1;
      });
        this.loaded = true;
        this.removeItem(n);
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
  this.townsManager.forEach((itm, i) => {
    this.fval.townManagers.controls[i].disable();
  });
  }

enableEdit(val: number): any {
    this.showLevels = val;
    this.townsManager.forEach((itm, i) => {
      if (i === val) {
        this.fval.townManagers.controls[i].enable();
      }
    });
    this.others.getUsersByLocation(this.fval.townManagers.controls[val].controls.townId.value).subscribe(
      res => {
        this.users = res;
        // console.log(this.users);
      },
      err => console.log(err)
    );
    this.fval.townManagers.controls[val].enable();
  }

saveManager(index: any): any {
  if (this.fval.townManagers.controls[index].valid) {
    const data = {
      theTownLocationId: this.fval.townManagers.controls[index].controls.townId.value,
      userId: null
  };
    // console.log(this.fval.townManagers.controls[index].controls.selectedManager.value);
    this.users.forEach((item) => {
    if (item.userName.toUpperCase() === this.fval.townManagers.controls[index].controls.selectedManager.value) {
        data.userId = item.userId;
    } else {
      // console.log(item);
    }
  });
    this.fval.townManagers.controls[index].disable();
    this.showLevels = null;
    // console.log(data);
    this.others.setTownManager(data).subscribe(
      res => {
        // console.log(res);
        this.fval.townManagers.controls[index].controls.currentManager.setValue(
          this.fval.townManagers.controls[index].controls.selectedManager.value
        );
      },
      err => console.log(err)
    );
    } else {
      return;
    }
  }
}
