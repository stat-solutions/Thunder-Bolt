import { Component, OnInit } from '@angular/core';
export interface company {
  name: string;
  
}
@Component({
  selector: 'app-company-setup',
  templateUrl: './company-setup.component.html',
  styleUrls: ['./company-setup.component.scss']
})
export class CompanySetupComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
