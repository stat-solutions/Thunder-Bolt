import { Component, OnInit } from '@angular/core';
// import * as jwt_decode from 'jwt-decode';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'ngx-alerts';
// import { BsModalService } from 'ngx-bootstrap/modal';
// import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

export interface FloatApprovals {
  station: string,
  type: string,
  ammount: number,
  status: number
}

@Component({
  selector: 'app-float-approval',
  templateUrl: './float-approval.component.html',
  styleUrls: ['./float-approval.component.scss']
})
export class FloatApprovalComponent implements OnInit {
  userForm: FormGroup;
  floatApprovals: FloatApprovals[] = [
    {station: "ndeeba", type: "withdraw", ammount: 405000, status: 0},
    {station: "kibuye", type: "deposit", ammount: 4000000, status: 0},
    {station: "matugga", type: "deposit", ammount: 6000000, status: 0},
    {station: "ndejje", type: "withdraw", ammount: 300000, status: 0},
    {station: "gabba", type: "deposit", ammount: 700000, status: 0},
    {station: "nansans", type: "withdraw", ammount: 600000, status: 0}
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
      approveFloat: this.fb.array([this.floatApproval]),
      selectAll: this.fb.control({})
    })
  }
  get floatApproval () {
    return this.fb.group({
      station: this.fb.control({value: ''}),
      floattype: this.fb.control({value: ''}),
      ammount: this.fb.control({value: ''}),
      approved: this.fb.control({})
    })
  }
  addItem () {
    // this.unitForm.controls.bussinessUnits  as FormArray
    (this.fval.approveFloat as FormArray).push(this.floatApproval)
  }

  removeItem (index: number) {
    (this.fval.approveFloat as FormArray).removeAt(index);
  }
  initialiseForm () {
    let n: number;
    // this.others.getBussinessUnits().subscribe(
    //   units => {
    //     this.approvals = units;
        this.floatApprovals.forEach((item, i) => {
          // console.log(item.name);
          // console.log(i);
          this.fval.approveFloat['controls'][i]['controls'].station.setValue(item.station);
          this.fval.approveFloat['controls'][i]['controls'].floattype.setValue(item.type);
          this.fval.approveFloat['controls'][i]['controls'].ammount.setValue(item.ammount);
          this.fval.approveFloat['controls'][i]['controls'].approved.setValue(false);
          this.addItem();
          n=i + 1;
        })
        this.removeItem(n);
      // }
    // )
  }
  checkAllItems(val: boolean) {
    if(val == true) {
      this.floatApprovals.forEach((item, i) => {
        this.fval.approveFloat['controls'][i]['controls'].approved.setValue(val);
      })
    } else {
      this.floatApprovals.forEach((item, i) => {
        this.fval.approveFloat['controls'][i]['controls'].approved.setValue(false);
      })
    }
  }
  deselectAll(val: boolean){
    // console.log(this.fval.approveAreas["controls"][val]["controls"].approved.value)
    if(this.fval.approveFloat["controls"][val]["controls"].approved.value == true) {
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

  disableForm () {
    return this.userForm.disable()
  }

  enableEdit() {
    return this.userForm.enable()
  }

  approveItems () {
    const itemsApproved = [];
    this.floatApprovals.forEach((item, i) => {
      if(
        this.fval.approveFloat['controls'][i]['controls'].approved.value == true
      ) {
        item.status = 2;
        itemsApproved.push(item)
      }
    })

    console.log(itemsApproved.length)
    if(itemsApproved.length > 0) {
      setTimeout(() => {
        this.router.navigate([
          'centralmanagement/dashboard'
        ]);
      }, 3000);
    } else {
      // alert("Please select something")
      return
    }
  }
  rejectItems () {
    const itemsRejected = [];
    this.floatApprovals.forEach((item, i) => {
      if(
        this.fval.approveFloat['controls'][i]['controls'].approved.value == true
      ) {
        item.status = 1;
        itemsRejected.push(item)
      }
    })
    console.log(itemsRejected.length)
    if(itemsRejected.length > 0) {
      setTimeout(() => {
        this.router.navigate([
          'centralmanagement/dashboard'
        ]);
      }, 3000);
    } else {
      // alert("Please select something")
      return
    }
  }
}

