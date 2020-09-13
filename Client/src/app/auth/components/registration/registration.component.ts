import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from 'src/app/validators/custom-validator';

export interface AccountTypes {
  name: string;
  DOB: string;
  email: string;
  tel: string;
  userRegIdType: string;
  userRegId: string;
  homeAddress: string;
  position: string;
  area: string;
  town: string;
  station: string;
}
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
userForm:  FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.createFormGroup();
  }

  createFormGroup() {
    return this.fb.group({

      user_full_name: this.fb.control(
        '',
        Validators.compose([
          Validators.required,
        ])
      ),
      user_DOB: this.fb.control(
        '',
        Validators.compose([
          Validators.required,
        ])
      ),
      user_email: this.fb.control(
        '',
        Validators.compose([
          Validators.required,
        ])
      ),
      user_contact_number: this.fb.control(
        '',
        Validators.compose([
          Validators.required,
          CustomValidator.patternValidator(/\d/, { hasNumber: true }),
          Validators.maxLength(10),
          Validators.minLength(10)
        ])
      ),
      user_ID_type: this.fb.control(
        '',
        Validators.compose([
          Validators.required,
        ])
      ),
      user_ID: this.fb.control(
        '',
        Validators.compose([
          Validators.required,
        ])
      ),
      user_home_area: this.fb.control(
        '',
        Validators.compose([
          Validators.required,
        ])
      ),
      position: this.fb.control(
        '',
        Validators.compose([
          Validators.required,
        ])
      ),
      area_manager: this.fb.control(
        '',
        Validators.compose([
          Validators.required,
        ])
      ),
      town_manager: this.fb.control(
        '',
        Validators.compose([
          Validators.required,
        ])
      ),
      station_manager: this.fb.control(
        '',
        Validators.compose([
          Validators.required,
        ])
      )
    });
  }

  register() {

  }
}

