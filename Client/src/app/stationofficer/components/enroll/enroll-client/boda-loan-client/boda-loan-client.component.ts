import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { CustomValidator } from 'src/app/validators/custom-validator';
// import { DashboardUserService } from 'src/app/services/dashboard-user.service';
// import { StageNames } from 'src/app/models/stage-names';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-boda-loan-client',
  templateUrl: './boda-loan-client.component.html',
  styleUrls: ['./boda-loan-client.component.scss']
})
export class BodaLoanClientComponent implements OnInit {
  registered = false;
  submitted = false;
  errored = false;
  posted = false;
  userForm: FormGroup;
  serviceErrors: any = {};
  value: string;
  fieldType: boolean;
  theStageNames: [];
  // theStageNames: StageNames[];

  constructor(
    private authService: AuthServiceService,
    // private adminUserService: DashboardUserService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.userForm = this.createFormGroup();
    this.stageNames();
  }

  createFormGroup() {
    return new FormGroup({
      microloanCustomerGaurantor1: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      microloanCustomerGaurantor2: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      microloanCustomerGaurantor3: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      microloanCustomerSecurity1: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      microloanCustomerSecurity2: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      microloanCustomerSecurityLocation1: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      microloanCustomerSecurityLocation2: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      microloanCustomerSecurity1PhotoUrl: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      microloanCustomerSecurity2PhotoUrl: new FormControl(
        '',
        Validators.compose([Validators.required])
      )
    });
  }

  revert() {
    this.userForm.reset();
  }

  resetStageNames() {
    this.userForm.controls.stage_name.reset();
  }

  get fval() {
    return this.userForm.controls;
  }

  stageNames() {
    
  }

  onSubmit() {
    this.submitted = true;
    this.spinner.show();

    if (this.userForm.invalid === true) {
      return;
    } else {
      this.userForm.patchValue({
        user_station: jwt_decode(this.authService.getJwtToken()).user_station,
        user_id: jwt_decode(this.authService.getJwtToken()).user_id
      });

    }
  }
}
