import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from 'src/app/validators/custom-validator';
export interface logininfo {
  userTelNo: number;
  userPasword: number;
  accessRight: string;
  photoUrl: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  submitted: boolean;
  posted: boolean;
  constructor(
    private fb: FormBuilder,
    ) { }

  ngOnInit(): void {
    this.userForm = this.createFormGroup();
  }

  createFormGroup() {
    return this.fb.group({
      user_contact_number: this.fb.control(
        '',
        Validators.compose([
          Validators.required,
          CustomValidator.patternValidator(/\d/, { hasNumber: true }),
          Validators.maxLength(10),
          Validators.minLength(10)
        ])
      ),
      user_password: this.fb.control([
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(4),
          Validators.minLength(4)
        ])
      ])
    });
  };
  login(){

  }
} 
