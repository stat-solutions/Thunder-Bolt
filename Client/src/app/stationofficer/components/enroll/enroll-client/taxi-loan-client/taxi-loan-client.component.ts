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
  selector: 'app-taxi-loan-client',
  templateUrl: './taxi-loan-client.component.html',
  styleUrls: ['./taxi-loan-client.component.scss']
})
export class TaxiLoanClientComponent implements OnInit {
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
      taxiCustomerNumberPlate: new FormControl(
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
      taxiCustomerColour: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      taxiCustomerModel: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      taxiCustomerYearOfManufacture: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      taxiCustomerEngineNumber: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      taxiCustomerFrontPhotoUrl: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      taxiCustomerRearPhotoUrl: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      taxiCustomerTheBodabodaRearPhotoUrl: new FormControl(
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
    // this.adminUserService.getStageNames(jwt_decode(this.authService.getJwtToken()).user_station).subscribe(
    //   data => {
    //     this.userForm.controls.stage_name.reset();
    //     this.theStageNames = data;
    //     // this.alertService.success({ html: '<b> User Roles Updated</b>' + '<br/>' });
    //   },

    //   (error: string) => {
    //     this.errored = true;
    //     this.serviceErrors = error;
    //     this.alertService.danger({
    //       html: '<b>' + this.serviceErrors + '</b>' + '<br/>'
    //     });
    //   }
    // );
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

      // this.adminUserService.registerCustomer(this.userForm).subscribe(
      //   () => {
      //     this.posted = true;
      //     this.spinner.hide();

      //     // tslint:disable-next-line:max-line-length
      //     this.alertService.success({
      //       html:
      //         '<b>Customer Registration was Successful!!</b>' +
      //         '</br>' +
      //         'Please proceed to lend him'
      //     });
      //     this.revert();
      //     setTimeout(() => {
      //       this.router.navigate(['dashboarduser/loans']);
      //     }, 2000);
      //   },

      //   (error: string) => {
      //     this.errored = true;
      //     this.serviceErrors = error;
      //     this.alertService.danger({
      //       html: '<b>' + this.serviceErrors + '</b>' + '<br/>'
      //     });
      //     this.spinner.hide();
      //   }
      // );
    }
  }
}
