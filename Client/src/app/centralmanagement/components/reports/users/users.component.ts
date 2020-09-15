import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface userInfo {
  userId: number,
  userName: string,
  userPosition: string,
  userContact: number,
  userLocation: Array<string>;
  userStatus: string,
  userLoginStatus: string,
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  userform: FormGroup;
  users: userInfo; 
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userform = this.createFormGroup();
  }
  createFormGroup () {
    return this.fb.group({
      userType: this.fb.control(
        '',
        Validators.compose([])
      ),
      arealocation: this.fb.control(
        '',
        Validators.compose([])
      ),
      townlocation: this.fb.control(
        '',
        Validators.compose([])
      ),
      stationLocation: this.fb.control(
        '',
        Validators.compose([])
      )
    })
  }
}
