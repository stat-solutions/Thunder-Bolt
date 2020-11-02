import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { CustomValidator } from 'src/app/validators/custom-validator';
import { AlertService } from 'ngx-alerts';
import { FormBuilder } from '@angular/forms';
import { UserRole } from 'src/app/shared/models/user-role';
import { RegisterUser } from 'src/app/shared/models/register';
import { OthersService } from 'src/app/shared/services/other-services/others.service';

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
  positionValue: string;
  areas: any;
  towns: any;
  stations: any;
  roles: UserRole[];
  units: any;
  selectedRole: any;
  selectedLocation: any;
  registerUser: RegisterUser;

  constructor(
    private authService: AuthServiceService,
    private others: OthersService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private alertService: AlertService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getRoles();
    this.getUnits();
    this.others.getAllTheAreaLocations().subscribe(res => console.log(res));
    this.others.getAllTheTownLocations().subscribe(res => console.log(res));
    this.others.getAllTheStationLocations().subscribe(res => console.log(res));
    this.userForm = this.createFormGroup();
    this.myDateValue = new Date();
  }
  createFormGroup(): any {
    return this.fb.group(
      {
          full_name: new FormControl(
            '',
            Validators.compose([
              Validators.required,
            ])
          ),
          email: new FormControl(
            '',
            Validators.compose([
              Validators.required,
              Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
            ]),
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
          central: new FormControl(''),
          area: new FormControl(''),
          town: new FormControl(''),
          station: new FormControl(''),
          id_type: new FormControl('', Validators.compose([Validators.required])),
          id_number: new FormControl(
            '',
            Validators.compose([
              Validators.required,
            ])
        ),
          date_of_birth: new FormControl(
            '',
            Validators.compose([Validators.required])
          ),
          password: new FormControl(
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
              Validators.minLength(4),
              Validators.maxLength(4),
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
          ),
      },
    { validator: CustomValidator.passwordMatchValidator }
    );
  }

revert(): any {
    this.userForm.reset();
  }
log(): any{
  // console.log(this.fval.central.value);
  // console.log(this.units);
  // this.units.forEach(unit => {
  //   if (this.fval.central.value === unit.bussinessUnitName) {
  //   console.log(unit);
  //     this.selectedLocation = unit.businnessUnitId;
  //     console.log(unit.businnessUnitId);
  //     console.log(this.selectedLocation);
  //   }
  // });
  // console.log(this.selectedLocation);
}
get fval(): any {
    return this.userForm.controls;
  }
    // toggle visibility of password field
toggleFieldType(): any {
      this.fieldType = !this.fieldType;
    }

returnHome(): any {
    this.spinner.hide();
    this.revert();

    setTimeout(() => {
      this.router.navigate(['authpage/loginpage']);
    }, 2000);
  }
getUnits(): any {
  this.others.getBussinessUnitLocations().subscribe(
    res => {
      this.units = res;
      console.log(this.units);
  },
    err => console.log(err)
  );
}
getRoles(): any{
  this.authService.getRoles().subscribe(
    x => {
      this.roles = x;
      // tslint:disable-next-line: only-arrow-functions
      this.roles = this.roles.map(function(role: any): any {
                    return {
                      accessRightsId: role.accessRightsId,
                      roleName: role.roleName.replace(/_/g, ' ')
                    };
          });
     }
  );
}
register(): any {
    this.submitted = true;
    this.spinner.show();
    if (this.userForm.invalid === true) {
      return;
    } else if (this.fval.position.value === 'AREA MANAGER' && this.fval.area === ''){
      this.alertService.success({
        html:
          '<b>Area was not selected</b>'
      });
      return;
    } else if (this.fval.position.value === 'TOWN USER' && this.fval.town === ''){
      this.alertService.success({
        html:
          '<b>Town was not selected</b>'
      });
      return;
    } else if (
        (this.fval.position.value === 'STATION USER')
        && this.fval.station === ''
      ){
      this.alertService.success({
        html:
          '<b>Station was not selected</b>'
      });
      return;
    } else {
      this.roles.forEach(role => {
        if (this.fval.position.value === role.roleName) {
          this.selectedRole = role.accessRightsId;
        }
      });
      if (this.fval.position.value === 'AREA USER'){
        this.selectedLocation = 1000;
      } else  if (this.fval.position.value === 'TOWN USER'){
        this.selectedLocation = 1500;
      }  else  if (this.fval.position.value === 'STATION USER' ){
        this.selectedLocation = 2000;
      } else if (this.fval.position.value === 'ADMIN') {
        this.selectedLocation = 10000;
      } else if (this.fval.position.value === 'CENTRAL USER') {
        this.units.forEach(unit => {
          if (this.fval.central.value.toString() === unit.bussinessUnitName) {
            this.selectedLocation = unit.theBusinessUnitId;
            console.log(this.selectedLocation);
          }
        });
      }
      this.registerUser = {
        userName: this.fval.full_name.value,
        userEmail1: this.fval.email.value,
        userPhone1: `${this.fval.user_contact_number.value}`,
        userIdType: this.fval.id_type.value,
        userIdNumber: `${this.fval.id_number.value.toUpperCase()}`,
        userDateOfBirth: `${this.fval.date_of_birth.value.getFullYear()}-${this.fval.date_of_birth.value.getMonth() + 1}-${this.fval.date_of_birth.value.getDate()}`,
        userPassword: Number(this.fval.password.value),
        fkAccessRightsIdUser: this.selectedRole,
        locationId: this.selectedLocation
      };

      // console.log(this.registerUser);
      this.authService.registerUser(this.registerUser).subscribe(
        () => {
          this.posted = true;
          this.spinner.hide();
          this.alertService.success({
            html:
              '<b>User Registration Was Successful</b>' +
              '</br>' +
              'Wait for verification'
          });
          setTimeout(() => {
            this.router.navigate(['authpage/login']);
          }, 3000);
        },
        (error: string) => {
          this.spinner.hide();
          this.errored = true;
          this.serviceErrors = error;
          this.alertService.danger({
            html: '<b>' + this.serviceErrors + '</b>' + '<br/>'
          });
          setTimeout(() => {
            // location.reload();
          }, 5000);
          console.log(error);
        }
      );
      this.spinner.hide();
      this.registered = true;
    }
  }
}

