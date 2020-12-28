import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { CustomValidator } from 'src/app/validators/custom-validator';
import { OthersService } from 'src/app/shared/services/other-services/others.service';
import * as jwt_decode from 'jwt-decode';
import { NgTranscludeDirective } from 'ngx-bootstrap/tabs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-pay-loan',
  templateUrl: './pay-loan.component.html',
  styleUrls: ['./pay-loan.component.scss']
})
export class PayLoanComponent implements OnInit {
  registered = false;
  submitted = false;
  errored = false;
  posted = false;
  userForm: FormGroup;
  fieldType: boolean;
  products: any;
  User = this.authService.loggedInUserInfo();
  phoneNumbers: Array<string>;

  constructor(
    private authService: AuthServiceService,
    private others: OthersService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private alertService: AlertService,
    private storage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.errored = false;
    this.posted = false;
    this.userForm = this.createFormGroup();
  }
  createFormGroup(): any {
    return new FormGroup({
      user_contact_number: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          CustomValidator.patternValidator(
            /^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/,
            { hasNumber: true }
          ),
        ])
      ),
      amount_to_pay: new FormControl(
        { value: '', disabled: false },
        Validators.compose([
          Validators.required,
          CustomValidator.patternValidator(/\d/, { hasNumber: true }),
          Validators.maxLength(6),
          Validators.minLength(3),
        ])
      ),
      pin: new FormControl(
        { value: '', disabled: false },
        Validators.compose([
          Validators.required,
          CustomValidator.patternValidator(/\d/, { hasNumber: true }),
          Validators.maxLength(4),
          Validators.minLength(4),
        ])
      ),
    });
  }

  // toggle visibility of password field
  toggleFieldType(): any {
    this.fieldType = !this.fieldType;
  }

  revert(): any {
    this.userForm.reset();
  }

  get fval(): any {
    return this.userForm.controls;
  }

  pay(): any {

  }
}
