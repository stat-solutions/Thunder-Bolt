import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CompanyInfo } from 'src/app/shared/models/company';
import { Approvals } from '../approval-setup/approval-setup.component';
import { BussinessUnits } from '../bussinessunits/bussinessunits.component';

export interface CompanyCreated {
  created: boolean;
}
export interface ApprovalLevelSet {
  set: boolean;
}
export interface BussinessUnitCreated {
  created: boolean;
}
@Component({
  selector: 'app-admin',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  sideBarChanged = true;
  company: CompanyCreated = {created: false};
  setApproval: ApprovalLevelSet = {set: false};
  unit: BussinessUnitCreated = {created: false};
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
  Company: CompanyInfo;
  approvals: Approvals[] = [
    {name: 'Area Creation', level: 3},
    {name: 'Town Creation', level: 1},
    // {name: "Town Creation", level: 1},
    // {name: "Town Creation", level: 1},
    // {name: "Town Creation", level: 1},
    // {name: "Town Creation", level: 1},
    // {name: "Town Creation", level: 1},
    // {name: "Town Creation", level: 1},
    // {name: "Town Creation", level: 1},
    // {name: "Town Creation", level: 1},
    // {name: "Town Creation", level: 1},
    {name: 'Stage Creation', level: 2},
    {name: 'Station Creation', level: 4},
  ];
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.toggleSideBar();
  }

  toggleSideBar(): any {
    this.sideBarChanged = !this.sideBarChanged;
    // this.sharedService.emitChange(this.sideBarChanged);
  }
}
