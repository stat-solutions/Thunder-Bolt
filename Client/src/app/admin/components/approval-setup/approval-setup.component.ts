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
  selector: 'app-approval-setup',
  templateUrl: './approval-setup.component.html',
  styleUrls: ['./approval-setup.component.scss']
})
export class ApprovalSetupComponent implements OnInit {
  approvalForm: FormGroup;
  posted = false;
  actionButton: string;
  errored: boolean;
  serviceErrors: string;
  status: boolean;
  checkedOk: boolean;
  station: string;
  theCompany: string;
  approvals: Approvals[] =[
    {name: "Area Creation", level: 3},
    {name: "Town Creation", level: 1},
    {name: "Stage Creation", level: 2},
    {name: "Station Creation", level: 4},
    {name: "Station Creation", level: 4}
  ];
  constructor(
    private others: OthersService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
    private fb: FormBuilder
  ) {}
ngOnInit () {
    this.approvalForm = this.createFormGroup();
    this.initialiseForm();
    this.disableForms();
  }
  createFormGroup() {
    return this.fb.group({
      approvalItems: this.fb.array([this.approvalItem]),
    })
  }
  get approvalItem () {
    return this.fb.group({
      name: this.fb.control({value: ''}),
      level: this.fb.control(
        '',
        Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(1),
        CustomValidator.maxValue(5),
        CustomValidator.minValue(0)
          ])
        )
    })
  }
  addItem () {
    (this.fval.approvalItems as FormArray).push(this.approvalItem)
  }

  removeItem (index: number) {
    (this.fval.approvalItems as FormArray).removeAt(index);
  }

  initialiseForm () {
    let n: number;
    // this.others.getBussinessUnits().subscribe(
    //   units => {
    //     this.approvals = units;
        this.approvals.forEach((item, i) => {
          // console.log(item.name);
          // console.log(i);
          this.fval.approvalItems['controls'][i]['controls'].name.setValue(item.name);
          this.fval.approvalItems['controls'][i]['controls'].level.setValue(item.level);
          this.addItem();
          n=i + 1;
        })
        this.removeItem(n);
      // }
    // )
  }
  revert() {
    this.approvalForm.reset();
  }

  // revert() {
  //   this.approvalForm.reset();
  // }

  refresh() {
    location.reload();
  }

  get fval() {
    return this.approvalForm.controls;
  }

  disableForms () {
    this.approvals.forEach((itm, i) =>{
     this.fval.approvalItems["controls"][i].disable();
    })
  }

  enableEdit(val: number) {
    this.approvals.forEach((itm, i) =>{
      if(i == val) {
        this.fval.approvalItems["controls"][i].enable();
      }
    })
  }
  saveLevel(index: any) {
    if(this.fval.approvalItems["controls"][index]) {
        this.fval.approvalItems["controls"][index].disable();
      } else {
        return;
    }
  }
}
