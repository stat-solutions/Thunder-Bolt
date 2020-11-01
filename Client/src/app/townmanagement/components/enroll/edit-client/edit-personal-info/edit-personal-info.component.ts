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
  selector: 'app-edit-personal-info',
  templateUrl: './edit-personal-info.component.html',
  styleUrls: ['./edit-personal-info.component.scss']
})
export class EditPersonalInfoComponent implements OnInit {
 registered = false;
  submitted = false;
  errored = false;
  posted = false;
  userForm: FormGroup;
  bodaClientForm: FormGroup;
  taxiClientForm: FormGroup;
  microClientForm: FormGroup;
  showPersonalForm = true;
  showBodaForm = false;
  showTaxiForm = false;
  showMicroForm = false;
  // showSubmitForm = false;
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
    this.bodaClientForm = this.bodaClientFormGroup();
    this.taxiClientForm = this.taxiClientFormGroup();
    this.microClientForm = this.microLientFormGroup();
    this.stageNames();
  }

  createFormGroup(): any {
    return new FormGroup({
      customer_name: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      main_contact_number1: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          CustomValidator.patternValidator(
            /^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/,
            { hasNumber: true }
          ),
        ])
      ),
      main_contact_number2: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          CustomValidator.patternValidator(
            /^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/,
            { hasNumber: true }
          ),
        ])
      ),
      id_type: new FormControl('', Validators.compose([Validators.required])),
      id_number: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          CustomValidator.patternValidator(
            /^(([a-zA-Z])([a-zA-Z])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([a-zA-Z])([a-zA-Z])([a-zA-Z])([a-zA-Z])([a-zA-Z]))$/,
            { nationalIdCheck: true }
          ),
        ])
      ),
      homeDetails: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      clientPhotoUrl: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      idPhotoUrl: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      secretPin: new FormControl(
        '',
        Validators.compose([
          // 1. Password Field is Required

          Validators.required,

          // 2. check whether the entered password has a number
          CustomValidator.patternValidator(/^(([0-9])([0-9])([0-9])([0-9]))$/, {
            hasNumber: true,
          }),
          // 3. check whether the entered password has upper case letter
          // CustomValidatorInitialCompanySetup.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
          // 4. check whether the entered password has a lower-case letter
          // CustomValidatorInitialCompanySetup.patternValidator(/[a-z]/, { hasSmallCase: true }),
          // 5. check whether the entered password has a special character
          // CustomValidatorInitialCompanySetup.
          //   patternValidator(/[!@#$%^&*_+-=;':"|,.<>/?/<mailto:!@#$%^&*_+-=;':"|,.<>/?]/, { hasSpecialCharacters: true }),

          // 6. Has a length of exactly 4 digits
          Validators.minLength(4),
          Validators.maxLength(4),
        ])
      ),
      clientComment: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      // number_plate: new FormControl(
      //   '',
      //   Validators.compose([
      //     Validators.required,
      //     Validators.minLength(8),
      //     Validators.maxLength(8),
      //     CustomValidator.patternValidator(
      //       /^(([U])([A-Z])([A-Z])(\s)([0-9])([0-9])([0-9])([A-Z]))$/,
      //       { beUgandanNumberPlate: true }
      //     )
      //   ])
      // )
    });
  }
  bodaClientFormGroup(): any {
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
  taxiClientFormGroup(): any {
    return new FormGroup({
      clientName: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
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
  microLientFormGroup(): any {
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
  // toggle visibility of password field
  toggleFieldType(): any {
    this.fieldType = !this.fieldType;
  }

  revert(): any {
    this.userForm.reset();
  }

  resetStageNames(): any {
    this.userForm.controls.stage_name.reset();
    this.revert();
  }

  get fval(): any {
    return this.userForm.controls;
  }
  get bodaFval(): any {
    return this.bodaClientForm.controls;
  }
  get taxiFval(): any {
    return this.taxiClientForm.controls;
  }
  get microFval(): any {
    return this.microClientForm.controls;
  }
  personalNext(): any{
    this.showPersonalForm = false;
    this.showBodaForm = true;
    this.bodaFval.clientName.value = this.fval.customer_name.value.toUpperCase();
    this.bodaFval.clientName.disable();
  }
  bodaNext(): any{
    this.showBodaForm = false;
    this.showTaxiForm = true;
    this.taxiFval.clientName.value = this.fval.customer_name.value.toUpperCase();
    this.taxiFval.clientName.disable();
  }
  bodaBack(): any{
    this.showPersonalForm = true;
    this.showBodaForm = false;
  }
  taxiNext(): any{
    this.showTaxiForm = false;
    this.showMicroForm = true;
    this.microFval.clientName.value = this.fval.customer_name.value.toUpperCase();
    this.microFval.clientName.disable();
  }
  taxiBack(): any{
    this.showTaxiForm = false;
    this.showBodaForm = true;
  }
  microBack(): any{
    this.showMicroForm = false;
    this.showTaxiForm = true;
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
