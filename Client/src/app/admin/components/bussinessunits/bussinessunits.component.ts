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

export interface BussinessUnits {
  unitName: string
}

@Component({
  selector: 'app-bussinessunits',
  templateUrl: './bussinessunits.component.html',
  styleUrls: ['./bussinessunits.component.scss']
})
export class BussinessunitsComponent implements OnInit {
  unitForm: FormGroup;
  bussinessUnits: BussinessUnits[] = [
    {unitName: "fuel busiinesss"},
    {unitName: "hospital busiinesss"},
    {unitName: "furniture busiinesss"}
  ];
  constructor(
    private others: OthersService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
    private fb: FormBuilder
  ) {}
  ngOnInit() {
    this.unitForm = this.createFormGroup();
    this.initialiseForm();
    this.disableForms();
  }

  createFormGroup() {
    return this.fb.group({
      bussinessUnits: this.fb.array([this.unit]),
      bussinessUnitName: this.fb.control('', Validators.compose([
        Validators.minLength(5)
      ]))
    })
  }

  get unit () {
    return this.fb.group({
      unitName: this.fb.control({value: ''}, Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ]))
    })
  }
  addUnit () {
    // this.unitForm.controls.bussinessUnits  as FormArray
    (this.fval.bussinessUnits as FormArray).push(this.unit)
  }

  removeUnit (index: number) {
    (this.fval.bussinessUnits as FormArray).removeAt(index);
  }

  initialiseForm () {
    let n: number;
    // this.others.getBussinessUnits().subscribe(
      // units => {
        // this.bussinessUnits = units;
        this.bussinessUnits.forEach((item, i) => {
          this.fval.bussinessUnits['controls'][i]['controls'].unitName.setValue(item.unitName);
          this.addUnit();
          n=i + 1;
        })
        this.removeUnit(n);
      // }
    // )
  }
  revert() {
    this.unitForm.reset();
  }

  refresh() {
    location.reload();
  }

  get fval() {
    return this.unitForm.controls;
  }
  
  disableForms () {
    this.bussinessUnits.forEach((itm, i) =>{
      // console.log(i)
     this.fval.bussinessUnits["controls"][i].disable();    
    })
  }

  enableEdit(val: number) {
    this.bussinessUnits.forEach((itm, i) =>{
      // console.log(i)
      if(i == val) {
        this.fval.bussinessUnits["controls"][i].enable(); 
      }   
    })
  }
  
  createUnit() {
    
    }

  editUnit (index: number) {
    console.log(index);
    this.enableEdit(index);
  }

  saveUnit(index: number) {
    this.fval.bussinessUnits["controls"][index].disable();
  }
}