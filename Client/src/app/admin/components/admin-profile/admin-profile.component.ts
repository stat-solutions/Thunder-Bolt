import { Component, OnInit } from '@angular/core';

export interface adminInfo {
  name: string;
  email: string;
  email2: string;
  tel: string;
  tel2: string;
}
@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
