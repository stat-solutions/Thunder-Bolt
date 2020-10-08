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
  selector: 'app-edit-micro-client-info',
  templateUrl: './edit-micro-client-info.component.html',
  styleUrls: ['./edit-micro-client-info.component.scss']
})
export class EditMicroClientInfoComponent implements OnInit {
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
      clientName: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
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
