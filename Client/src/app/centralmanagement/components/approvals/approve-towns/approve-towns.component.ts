import { Component, OnInit } from '@angular/core';
// import * as jwt_decode from 'jwt-decode';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'ngx-alerts';
// import { BsModalService } from 'ngx-bootstrap/modal';
// import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

export interface TownApprovals {
  town: string,
  status: number
}

@Component({
  selector: 'app-approve-towns',
  templateUrl: './approve-towns.component.html',
  styleUrls: ['./approve-towns.component.scss']
})
export class ApproveTownsComponent implements OnInit {
  userForm: FormGroup;
  townApprovals: TownApprovals[] = [
    {town: "kampala", status: 1},
    {town: "mbale", status: 1},
    {town: "masaka", status: 1},
    {town: "kawempe", status: 1},
    {town: "jinja", status: 1}
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
      approveTowns: this.fb.array([this.townApproval]),
      selectAll: this.fb.control({})
    })
  }
  get townApproval () {
    return this.fb.group({
      town: this.fb.control({value: ''}),
      approved: this.fb.control({})
    })
  }
  addItem () {
    // this.unitForm.controls.bussinessUnits  as FormArray
    (this.fval.approveTowns as FormArray).push(this.townApproval)
  }

  removeItem (index: number) {
    (this.fval.approveTowns as FormArray).removeAt(index);
  }
  initialiseForm () {
    let n: number;
    // this.others.getBussinessUnits().subscribe(
    //   units => {
    //     this.approvals = units;
        this.townApprovals.forEach((item, i) => {
          // console.log(item.town);
          // console.log(i);
          this.fval.approveTowns['controls'][i]['controls'].town.setValue(item.town);
          this.fval.approveTowns['controls'][i]['controls'].approved.setValue(false);
          this.addItem();
          n=i + 1;
        })
        this.removeItem(n);
      // }
    // )
  }

  checkAllItems(val: boolean) {
    if(val == true) {
      this.townApprovals.forEach((item, i) => {
        this.fval.approveTowns['controls'][i]['controls'].approved.setValue(val);
      }) 
    } else {
      this.townApprovals.forEach((item, i) => {
        this.fval.approveTowns['controls'][i]['controls'].approved.setValue(false);
      })
    }
  }
  deselectAll(val: boolean){
    // console.log(this.fval.approveAreas["controls"][val]["controls"].approved.value)
    if(this.fval.approveTowns["controls"][val]["controls"].approved.value == true) {
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
  approveItems () {
    const itemsApproved = [];
    this.townApprovals.forEach((item, i) => {
      if(
        this.fval.approveTowns['controls'][i]['controls'].approved.value == true
      ) {
        item.status = 2;
        itemsApproved.push(item)
      }
    })

    // console.log(itemsApproved)
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
    this.townApprovals.forEach((item, i) => {
      if(
        this.fval.approveTowns['controls'][i]['controls'].approved.value == true
      ) {
        item.status = 1;
        itemsRejected.push(item)
      }
    })
    // console.log(itemsRejected.length)
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

