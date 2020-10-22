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
// import { BsModalService } from 'ngx-bootstrap/modal';
// import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
export interface ApproveCentralUsers {
  userID: string;
  userName: string;
  userRole: string;
  status: number;
}

@Component({
  selector: 'app-approve-station-users',
  templateUrl: './approve-station-users.component.html',
  styleUrls: ['./approve-station-users.component.scss'],
})
export class ApproveStationUsersComponent implements OnInit {
  userForm: FormGroup;
  centralUserApprovals: ApproveCentralUsers[] = [
    {
      userID: 'TB03492',
      userName: 'Kasule Joseph',
      userRole: 'Central Manager',
      status: 0,
    },
    {
      userID: 'TB03492',
      userName: 'Kasule Joseph',
      userRole: 'Central Manager',
      status: 0,
    },
    {
      userID: 'TB03492',
      userName: 'Kasule Joseph',
      userRole: 'Central Manager',
      status: 0,
    },
    {
      userID: 'TB03492',
      userName: 'Kasule Joseph',
      userRole: 'Central Manager',
      status: 0,
    },
    {
      userID: 'TB03492',
      userName: 'Kasule Joseph',
      userRole: 'Central Manager',
      status: 0,
    },
    {
      userID: 'TB03492',
      userName: 'Kasule Joseph',
      userRole: 'Central Manager',
      status: 0,
    },
    {
      userID: 'TB03492',
      userName: 'Kasule Joseph',
      userRole: 'Central Manager',
      status: 0,
    },
    {
      userID: 'TB03492',
      userName: 'Kasule Joseph',
      userRole: 'Central Manager',
      status: 0,
    },
    {
      userID: 'TB03492',
      userName: 'Kasule Joseph',
      userRole: 'Central Manager',
      status: 0,
    },
    {
      userID: 'TB03492',
      userName: 'Kasule Joseph',
      userRole: 'Central Manager',
      status: 0,
    },
    {
      userID: 'TB03492',
      userName: 'Kasule Joseph',
      userRole: 'Central Manager',
      status: 0,
    },
    {
      userID: 'TB03492',
      userName: 'Kasule Joseph',
      userRole: 'Central Manager',
      status: 0,
    },
    {
      userID: 'TB03492',
      userName: 'Kasule Joseph',
      userRole: 'Central Manager',
      status: 0,
    },
    {
      userID: 'TB03492',
      userName: 'Kasule Joseph',
      userRole: 'Central Manager',
      status: 0,
    },
    {
      userID: 'TB03492',
      userName: 'Kasule Joseph',
      userRole: 'Central Manager',
      status: 0,
    },
    {
      userID: 'TB03492',
      userName: 'Kasule Joseph',
      userRole: 'Central Manager',
      status: 0,
    },
    {
      userID: 'TB03492',
      userName: 'Kasule Joseph',
      userRole: 'Central Manager',
      status: 0,
    },
    {
      userID: 'TB03492',
      userName: 'Kasule Joseph',
      userRole: 'Central Manager',
      status: 0,
    },
    {
      userID: 'TB03492',
      userName: 'Kasule Joseph',
      userRole: 'Central Manager',
      status: 0,
    },
    {
      userID: 'TB03492',
      userName: 'Kasule Joseph',
      userRole: 'Central Manager',
      status: 0,
    },
    {
      userID: 'TB03492',
      userName: 'Kasule Joseph',
      userRole: 'Central Manager',
      status: 0,
    },
    {
      userID: 'TB03492',
      userName: 'Kasule Joseph',
      userRole: 'Central Manager',
      status: 0,
    },
    {
      userID: 'TB03492',
      userName: 'Kasule Joseph',
      userRole: 'Central Manager',
      status: 0,
    },
    {
      userID: 'TB03492',
      userName: 'Kasule Joseph',
      userRole: 'Central Manager',
      status: 0,
    },
    {
      userID: 'TB03492',
      userName: 'Kasule Joseph',
      userRole: 'Central Manager',
      status: 0,
    },
  ];
  posted = false;
  actionButton: string;
  errored: boolean;
  serviceErrors: string;
  status: boolean;
  checkedOk: boolean;
  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
    private fb: FormBuilder
  ) {}
  ngOnInit() {
    this.userForm = this.createFormGroup();
    this.fval.selectAll.setValue(false);
    this.initialiseForm();
  }
  createFormGroup() {
    return this.fb.group({
      approveUsers: this.fb.array([this.centralUserApproval]),
      selectAll: this.fb.control({}),
    });
  }
  get centralUserApproval() {
    return this.fb.group({
      userID: this.fb.control({ value: '' }),
      userName: this.fb.control({ value: '' }),
      userRole: this.fb.control({ value: '' }),
      approved: this.fb.control({}),
    });
  }
  addItem() {
    // this.unitForm.controls.bussinessUnits  as FormArray
    (this.fval.approveUsers as FormArray).push(this.centralUserApproval);
  }

  removeItem(index: number) {
    (this.fval.approveUsers as FormArray).removeAt(index);
  }
  initialiseForm() {
    let n: number;
    // this.others.getBussinessUnits().subscribe(
    //   units => {
    //     this.approvals = units;
    this.centralUserApprovals.forEach((item, i) => {
      // console.log(item.name);
      // console.log(i);
      this.fval.approveUsers['controls'][i]['controls'].userID.setValue(
        item.userID
      );
      this.fval.approveUsers['controls'][i]['controls'].userName.setValue(
        item.userName
      );
      this.fval.approveUsers['controls'][i]['controls'].userRole.setValue(
        item.userRole
      );
      this.fval.approveUsers['controls'][i]['controls'].approved.setValue(
        false
      );
      this.addItem();
      n = i + 1;
    });
    this.removeItem(n);
    // }
    // )
  }
  checkAllItems(val: boolean) {
    if (val == true) {
      this.centralUserApprovals.forEach((item, i) => {
        this.fval.approveUsers['controls'][i]['controls'].approved.setValue(
          val
        );
      });
    } else {
      this.centralUserApprovals.forEach((item, i) => {
        this.fval.approveUsers['controls'][i]['controls'].approved.setValue(
          false
        );
      });
    }
  }
  deselectAll(val: boolean) {
    // console.log(this.fval.approveAreas["controls"][val]["controls"].approved.value)
    if (
      this.fval.approveUsers['controls'][val]['controls'].approved.value == true
    ) {
      this.fval.selectAll.setValue(false);
    }
  }
  revert() {
    this.userForm.reset();
  }

  refresh() {
    location.reload();
  }

  get fval() {
    return this.userForm.controls;
  }

  disableForm() {
    return this.userForm.disable();
  }

  enableEdit() {
    return this.userForm.enable();
  }

  approveItems() {
    const itemsApproved = [];
    this.centralUserApprovals.forEach((item, i) => {
      if (
        this.fval.approveUsers['controls'][i]['controls'].approved.value == true
      ) {
        item.status = 2;
        itemsApproved.push(item);
      }
    });

    console.log(itemsApproved.length);
    if (itemsApproved.length > 0) {
      setTimeout(() => {
        this.router.navigate(['centralmanagement/dashboard']);
      }, 3000);
    } else {
      // alert("Please select something")
      return;
    }
  }
  rejectItems() {
    const itemsRejected = [];
    this.centralUserApprovals.forEach((item, i) => {
      if (
        this.fval.approveUsers['controls'][i]['controls'].approved.value == true
      ) {
        item.status = 1;
        itemsRejected.push(item);
      }
    });
    console.log(itemsRejected.length);
    if (itemsRejected.length > 0) {
      setTimeout(() => {
        this.router.navigate(['stationmanagement/dashboard']);
      }, 3000);
    } else {
      // alert("Please select something")
      return;
    }
  }
}
