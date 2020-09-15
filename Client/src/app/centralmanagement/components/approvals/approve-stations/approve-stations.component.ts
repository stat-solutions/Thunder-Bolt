import { Component, OnInit } from '@angular/core';
// import * as jwt_decode from 'jwt-decode';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'ngx-alerts';
// import { BsModalService } from 'ngx-bootstrap/modal';
// import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

export interface StationApprovals {
  station: string,
  status: number
}

@Component({
  selector: 'app-approve-stations',
  templateUrl: './approve-stations.component.html',
  styleUrls: ['./approve-stations.component.scss']
})
export class ApproveStationsComponent implements OnInit {
  userForm: FormGroup;
  stationApproval: StationApprovals[] = [
    {station: "ndeeba", status: 1},
    {station: "nakulabye", status: 1},
    {station: "mutundwe", status: 1},
    {station: "busega", status: 1},
    {station: "bwayise", status: 1}
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
      approveStations: this.fb.array([this.stationApprovals]),
      selectAll: this.fb.control({})
    })
  }
  get stationApprovals () {
    return this.fb.group({
      station: this.fb.control({value: ''}),
      approved: this.fb.control({})
    })
  }
  addItem () {
    // this.unitForm.controls.bussinessUnits  as FormArray
    (this.fval.approveStations as FormArray).push(this.stationApprovals)
  }

  removeItem (index: number) {
    (this.fval.approveStations as FormArray).removeAt(index);
  }
  initialiseForm () {
    let n: number;
    // this.others.getBussinessUnits().subscribe(
    //   units => {
    //     this.approvals = units;
        this.stationApproval.forEach((item, i) => {
          // console.log(item.station);
          // console.log(i);
          this.fval.approveStations['controls'][i]['controls'].station.setValue(item.station);
          this.fval.approveStations['controls'][i]['controls'].approved.setValue(false);
          this.addItem();
          n=i + 1;
        })
        this.removeItem(n);
      // }
    // )
  }
  checkAllItems(val: boolean) {
    if(val == true) {
      this.stationApproval.forEach((item, i) => {
        this.fval.approveStations['controls'][i]['controls'].approved.setValue(val);
      }) 
    } else {
      this.stationApproval.forEach((item, i) => {
        this.fval.approveStations['controls'][i]['controls'].approved.setValue(false);
      })
    }
  }
  deselectAll(val: boolean){
    // console.log(this.fval.approveAreas["controls"][val]["controls"].approved.value)
    if(this.fval.approveStations["controls"][val]["controls"].approved.value == true) {
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
    this.stationApproval.forEach((item, i) => {
      if(
        this.fval.approveStations['controls'][i]['controls'].approved.value == true
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
    this.stationApproval.forEach((item, i) => {
      if(
        this.fval.approveStations['controls'][i]['controls'].approved.value == true
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

