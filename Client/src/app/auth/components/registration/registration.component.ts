import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { CustomValidator } from 'src/app/validators/custom-validator';
import { AlertService } from 'ngx-alerts';
// import { UserRole } from 'src/app/models/user-role';
// import { CompanyPetroStations } from 'src/app/models/company-petro-stations';
// import { TheStations } from 'src/app/models/the-stations';

export interface AccountTypes {
  accountType: string;
}

export interface Areas {
  area: string;
}

export interface Towns {
  town: string;
}
export interface Stations {
  station: string;
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registered = false;
  submitted = false;
  errored = false;
  posted = false;
  userForm: FormGroup;
  serviceErrors: any = {};
  value: string;
  fieldType: boolean;
  mySubscription: any;
  myDateValue: Date;
  // userRoleInfo: UserRole[];
  // theCompanyStations: CompanyPetroStations[];
  // thePetrolStations: TheStations[];

  constructor(
    private authService: AuthServiceService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.myDateValue = new Date();
    this.userForm = this.createFormGroup();
  }

  createFormGroup() {
    return new FormGroup({
      full_name: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      email: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      user_contact_number: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          CustomValidator.patternValidator(
            /^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/,
            { hasNumber: true }
          )
        ])
      ),

      position: new FormControl(
        '',
        Validators.compose([
          Validators.required
        ])
      ),
      central: new FormControl(
        '',
        Validators.compose([
          Validators.required
        ])
      ),
      area: new FormControl(
        '',
        Validators.compose([
          Validators.required
        ])
      ),
      town: new FormControl(
        '',
        Validators.compose([
          Validators.required
        ])
      ),
      station: new FormControl(
        '',
        Validators.compose([
          Validators.required
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
          )
        ])
    ),
      date_of_birth: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      // user_image: new FormControl('', Validators.compose([Validators.required])),
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
      )
    });
  }

  revert() {
    this.userForm.reset();
  }

  revertPetrol() {
    this.userForm.controls.petrol_station.reset();
  }

  get fval() {
    return this.userForm.controls;
  }

  // updateThePetrolStations(event) {
  //   // console.log(event.target.value);
  //   this.thePetrolSations(event.target.value);
  // }

    //toggle visibility of password field
    toggleFieldType() {
      this.fieldType = !this.fieldType;
    }



  // userRoleData() {

  //   this.authService.getUserRoles().subscribe(
  //     data => {
  //       this.userRoleInfo = data;
  //       this.alertService.success({
  //         html: '<b> User Roles Updated</b>' + '<br/>'
  //       });
  //     },

  //     (error: string) => {
  //       this.errored = true;
  //       this.serviceErrors = error;
  //       this.alertService.danger({
  //         html: '<b>' + this.serviceErrors + '</b>' + '<br/>'
  //       });
  //     }
  //   );
  // }

  // companyPetrolStations() {
  //   this.authService.getCompanyPetrolStations().subscribe(
  //     data => {
  //       // console.log(data);
  //       this.theCompanyStations = data;
  //       this.alertService.success({
  //         html: 'Company Petrol Stations Updated' + '<br/>'
  //       });
  //     },

  //     (error: string) => {
  //       this.errored = true;
  //       this.serviceErrors = error;
  //       this.alertService.danger({
  //         html: '<b>' + this.serviceErrors + '</b>' + '<br/>'
  //       });
  //     }
  //   );



  // thePetrolSations(theCompanyStation: string) {
  //   this.revertPetrol();

  //   this.authService.getThePetrolStations(theCompanyStation).subscribe(
  //     data => {
  //       this.thePetrolStations = data;

  //       // console.log(this.thePetrolStations);

  //       this.alertService.success({
  //         html: '<b> The petrol stations were updated!!</b>' + '<br/>'
  //       });
  //     },

  //     (error: string) => {
  //       this.errored = true;
  //       this.serviceErrors = error;
  //       this.alertService.danger({
  //         html: '<b>' + this.serviceErrors + '</b>' + '<br/>'
  //       });
  //     }
  //   );
  // }

  returnHome() {
    this.spinner.hide();
    this.revert();

    setTimeout(() => {
      this.router.navigate(['authpage/loginpage']);
    }, 2000);
  }

  register(){
    this.submitted = true;
    this.spinner.show();

    if (this.userForm.invalid === true) {
      return;
    } else {
      this.authService.registerUser(this.userForm).subscribe(
        () => {
          this.posted = true;
          this.spinner.hide();

          this.alertService.success({
            html:
              '<b>User Registration was Successful</b>' +
              '</br>' +
              'Please proceed to the login page'
          });

          setTimeout(() => {
            this.router.navigate(['authpage/login']);
          }, 3000);
        },

        (error: string) => {
          //       this.spinner.hide();
          this.errored = true;
          this.serviceErrors = error;
          this.alertService.danger({
            html: '<b>' + this.serviceErrors + '</b>' + '<br/>'
          });
                setTimeout(() => {

                  location.reload();

                }, 3000);
          console.log(error);
          this.spinner.hide();
        }
      );

        this.registered = true;
    }
  }
}

