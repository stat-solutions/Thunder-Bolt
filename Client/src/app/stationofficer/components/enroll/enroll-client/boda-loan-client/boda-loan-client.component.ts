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

  ngOnInit(): void {
    this.userForm = this.createFormGroup();
    this.stageNames();
  }

  createFormGroup(): any {
    return new FormGroup({
      clientName: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      bodabodaCustomerNumberPlate: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8),
          CustomValidator.patternValidator(
            /^(([U])([A-Z])([A-Z])(\s)([0-9])([0-9])([0-9])([A-Z]))$/,
            { beUgandanNumberPlate: true }
          )
        ])
      ),
      bodabodaCustomerColour: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      bodabodaCustomerModel: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      bodabodaCustomerYearOfManufacture: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      bodabodaCustomerEngineNumber: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      bodabodaCustomerFrontPhotoUrl: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      bodabodaCustomerRearPhotoUrl: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      bodabodaCustomerTheBodabodaRearPhotoUrl: new FormControl(
        '',
        Validators.compose([Validators.required])
      )
    });
  }

  revert(): any {
    this.userForm.reset();
  }

  resetStageNames(): any {
    this.userForm.controls.stage_name.reset();
  }

  get fval(): any {
    return this.userForm.controls;
  }

  stageNames(): any {
  }

  onSubmit(): any {
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
