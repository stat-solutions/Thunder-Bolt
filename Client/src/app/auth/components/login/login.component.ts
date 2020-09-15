import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
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
    private layoutService: LayoutService
  ) {}

  ngOnInit() {
    this.userForm = this.createFormGroup();
  }




  createFormGroup() {
    return new FormGroup({

      user_contact_number: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          CustomValidator.patternValidator(/\d/, { hasNumber: true }),
          Validators.maxLength(10),
          Validators.minLength(10)
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([
          // 1. Password Field is Required
          CustomValidator.patternValidator(/\d/, { hasNumber: true }),
          Validators.maxLength(4),
          Validators.minLength(4),
          Validators.required
        ])
      )
    });
  }

  get fval() {
    return this.userForm.controls;
  }

//toggle visibility of password field
    toggleFieldType() {
      this.fieldType = !this.fieldType;
    }

    login() {
    this.submitted = true;

    this.spinner.show();

    if (this.userForm.invalid === true) {
      return;
    } else {
      this.authService
        .loginNormalUser(this.userForm)

        .subscribe(
          (success: boolean) => {
            if (success) {
              this.posted = true;
            if (
                jwt_decode(this.authService.getJwtToken()).user_status ===
                'Approved'
              ) {
                if (
                  jwt_decode(this.authService.getJwtToken()).user_role === "admin"
                ) {
                  this.alertService.success({
                    html: '<strong>Signed In Successfully</strong>'
                  });
                  this.spinner.hide();
                  setTimeout(() => {
                    this.spinner.hide();
                    // this.layoutService.emitChangePumpUser(true);
                    // this.layoutService.emitLoginLogout(true);
                    this.router.navigate(['admin']);
                  }, 1000);
                } else if (
                  jwt_decode(this.authService.getJwtToken()).user_role === "Central User"
                ) {
                  this.spinner.hide();
                  setTimeout(() => {
                    this.router.navigate(['centralmanagement']);
                  }, 1000);
                } else if (
                  jwt_decode(this.authService.getJwtToken()).user_role === "Area Manager"
                ) {
                  this.spinner.hide();
                  setTimeout(() => {
                    this.router.navigate(['areamanagement']);
                  }, 1000);
                } else if (
                  jwt_decode(this.authService.getJwtToken()).user_role === "Station Manager"
                ) {
                  this.spinner.hide();
                  setTimeout(() => {
                    this.router.navigate(['stationmanagement']);
                  }, 1000);
                } else if (
                  jwt_decode(this.authService.getJwtToken()).user_role === "Station Officer"
                ) {
                  this.spinner.hide();
                  setTimeout(() => {
                    this.router.navigate(['stationofficer']);
                  }, 1000);
                }
                 else {
                  this.alertService.danger({
                    html: '<strong>No User found with these details, Please register</strong>'
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
              this.loginStatus === 'Authorisation Failed! User Not Registered'
            ) {
              setTimeout(() => {
                this.router.navigate(['authpage/register']);
              }, 1000);
            }
            this.spinner.hide();

          }
        );
    }
  }



}


