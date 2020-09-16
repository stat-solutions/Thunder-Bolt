import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { CustomValidator } from 'src/app/validators/custom-validator';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { AlertService } from 'ngx-alerts';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { Observable } from 'rxjs';
// import { BootstrapAlertService, BootstrapAlert } from 'ngx-bootstrap-alert';
@Component({
  selector: 'app-change-password',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
  registered: boolean;
  submitted: boolean;
  errored: boolean;
  posted: boolean;
  whiteListedContact: boolean;
  userForm: FormGroup;
  loginStatus: string;
  fieldType: boolean;
  value: string;
  stationBalanceExits: boolean;
  mySubscription: any;

  serviceErrors: any = {};


  constructor(
    private authService: AuthServiceService,

    private router: Router,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private layoutService: LayoutService,
private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.userForm = this.createFormGroup();
  }




  createFormGroup() {
    return this.fb.group({
      code: new FormControl(
        '',
        Validators.compose([
          // 1. Password Field is Required

          Validators.required
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([
          // 1. Password Field is Required

          Validators.required,

          // 2. check whether the entered password has a number
          CustomValidator.patternValidator(/^(([1-9])([1-9])([1-9])([0-9]))$/, {
            hasNumber: true
          }),
          // 3. check whether the entered password has upper case letter
          // CustomValidatorInitialCompanySetup.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
          // 4. check whether the entered password has a lower-case letter
          // CustomValidatorInitialCompanySetup.patternValidator(/[a-z]/, { hasSmallCase: true }),
          // 5. check whether the entered password has a special character
          // CustomValidatorInitialCompanySetup.
          //   patternValidator(/[!@#$%^&*_+-=;':"|,.<>/?/<mailto:!@#$%^&*_+-=;':"|,.<>/?]/, { hasSpecialCharacters: true }),

          // 6. Has a minimum length of 8 characters
          Validators.minLength(4),
          Validators.maxLength(4)
        ])
      ),
      confirmPassword: new FormControl(
        '',
        Validators.compose([
          // 1. Password Field is Required

          Validators.required,

          // 2. check whether the entered password has a number
          CustomValidator.patternValidator(
            /^(([0-9])([0-9])([0-9])([0-9]))$/,
            {
              hasNumber: true,
            }
          ),
          // 6. Has a length of exactly 4 digits
          Validators.minLength(4),
          Validators.maxLength(4),
        ])
      )
    }, {validator: CustomValidator.passwordMatchValidator}
    );
  }


  revert() {
    this.userForm.reset();
  }
//method for canceling action
  returnHome() {
    this.spinner.hide();
    this.revert();

    setTimeout(() => {
      this.router.navigate(['authpage/login']);
    }, 2000);
  }

  get fval() {
    return this.userForm.controls;
  }

//toggle visibility of password field
    toggleFieldType() {
      this.fieldType = !this.fieldType;
    }



        changePassword() {
    this.submitted = true;

    this.spinner.show();

    if (this.userForm.invalid === true) {
      return;
    } else {
      this.authService
        .changePIN(this.userForm)

        .subscribe(
          (success: boolean) => {
            if (success) {
              this.posted = true;
              if (
                jwt_decode(this.authService.getJwtToken()).user_status ===
                'Approved'
              ) {
                if (
                  jwt_decode(this.authService.getJwtToken()).user_role === 1000
                ) {
                  this.alertService.success({
                    html: '<strong>PIN Changed Successfully</strong>'
                  });
                  this.spinner.hide();
                  setTimeout(() => {
                    this.spinner.hide();

                    this.router.navigate(['authpage/login']);
                    location.reload();
                  }, 1000);

                } else {
                  this.alertService.danger({
                    html: '<strong>Check the Code provided and try again</strong>'
                  });
                  this.spinner.hide();
                }
              } else if (
                jwt_decode(this.authService.getJwtToken()).user_status ===
                'Deactivated'
              ) {
                this.alertService.danger({
                  html:
                    '<strong>This account has been deactivated!, please contact system admin!</strong>'
                });
                this.spinner.hide();
                return;
              }
            } else {
              this.spinner.hide();
              this.errored = true;
            }
          },

          (error: string) => {
            this.spinner.hide();
            this.errored = true;
            this.loginStatus = error;
            // this.alertService.danger(this.loginStatus);
            this.alertService.danger({
              html: '<b>' + this.loginStatus + '</b>' + '<br/>'
            });
            // this.alertService.warning({html: '<b>Signed In Successfully</b>'});
            if (
              this.loginStatus === 'Action Failed!!'
            ) {
              setTimeout(() => {
                this.router.navigate(['authpage/login']);
              }, 1000);
            }
            this.spinner.hide();

          }
        );
    }
  }



}


