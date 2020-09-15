import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Approvals } from '../approval-setup/approval-setup.component';
import { BussinessUnits } from '../bussinessunits/bussinessunits.component';
@Component({
  selector: 'app-admin',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  sideBarChanged = true;
  bussinessUnits: BussinessUnits[] = [
    {unitName: 'Fuel Bussiness'},
    {unitName: 'Hospital Bussiness'},
    {unitName: 'Hospital Bussiness'},
    {unitName: 'Hospital Bussiness'},
    {unitName: 'Hospital Bussiness'},
    {unitName: 'Hospital Bussiness'},
    {unitName: 'Hospital Bussiness'},
    {unitName: 'Hospital Bussiness'}
  ];
  approvals: Approvals[] = [
    {name: "Area Creation", level: 3},
    {name: "Town Creation", level: 1},
    // {name: "Town Creation", level: 1},
    // {name: "Town Creation", level: 1},
    // {name: "Town Creation", level: 1},
    // {name: "Town Creation", level: 1},
    // {name: "Town Creation", level: 1},
    // {name: "Town Creation", level: 1},
    // {name: "Town Creation", level: 1},
    // {name: "Town Creation", level: 1},
    // {name: "Town Creation", level: 1},
    {name: "Stage Creation", level: 2},
    {name: "Station Creation", level: 4},
  ];
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.toggleSideBar();
  }

  toggleSideBar() {
    this.sideBarChanged = !this.sideBarChanged;
    // this.sharedService.emitChange(this.sideBarChanged);
  }
}
