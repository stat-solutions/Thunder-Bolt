import { Component, OnInit } from '@angular/core';

export interface approvals {
  areaCreatian: number;
  townCreation: number;
  stationCreation: number;
  clusterCreation: number;
  stageCreaton: number;
  userCreation: number
}
@Component({
  selector: 'app-approval-setup',
  templateUrl: './approval-setup.component.html',
  styleUrls: ['./approval-setup.component.scss']
})
export class ApprovalSetupComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
