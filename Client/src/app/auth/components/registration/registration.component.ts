import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { CustomValidator } from 'src/app/validators/custom-validator';
import { AlertService } from 'ngx-alerts';
import { FormBuilder } from '@angular/forms';
// import { UserRole } from 'src/app/models/user-role';
// import { CompanyPetroStations } from 'src/app/models/company-petro-stations';
// import { TheStations } from 'src/app/models/the-stations';
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
  areas: Array<string> = [
    'Central Region',
    'Western Region',
    'Southern Region',
    'Northern Region',
    'Eastern Region'
  ];
  towns = [
    {name: 'Kampala', area: 'Central Region'},
    {name: 'Wakiso', area: 'Central Region'},
    {name: 'Mbale', area: 'Eastern Region'},
    {name: 'Busia', area: 'Eastern Region'},
    {name: 'Mbarara', area: 'Western Region'},
    {name: 'Bushenyi', area: 'Western Region'},
    {name: 'Kisoro', area: 'Western Region'},
    {name: 'Kotido', area: 'Northern Region'},
    {name: 'Moroto', area: 'Northern Region'},
    {name: 'Arua', area: 'Northern Region'},
  ];
  stations = [
    {name: 'ndeba', town: 'Wakiso'},
    {name: 'ndejje', town: 'Kampala'},
    {name: 'matugga', town: 'Wakiso'},
    {name: 'kinawa', town: 'Kampala'},
    {name: 'kitale', town: 'Mbarara'},
    {name: 'katwe', town: 'Kampala'},
    {name: 'sogga', town: 'Mbale'},
    {name: 'kitwee', town: 'Wakiso'},
    {name: 'busega', town: 'Kampala'},
    {name: 'mbweera', town: 'Arua'},
  ];

  constructor(
    private authService: AuthServiceService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private alertService: AlertService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.myDateValue = new Date();
    this.userForm = this.createFormGroup();
    localStorage.setItem('towns', JSON.stringify(this.towns));
    localStorage.setItem('stations', JSON.stringify(this.stations));
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

register(): any {
    this.submitted = true;
    this.spinner.show();
    if (this.userForm.invalid === true) {
      return;
    } else {
      if (
        this.fval.position.value === 'stationOfficer'
        && this.fval.station.value === ''
        && this.fval.town.value === ''
        && this.fval.area.value === ''
        ){
          this.alertService.danger({
            html:
                '<b>Please choose area, town and station</b>'
          });
        }
      this.authService.registerUser(this.userForm).subscribe(
        () => {
          this.posted = true;
          this.spinner.hide();
          this.alertService.success({
            html:
              '<b>User Registration Was Successful</b>' +
              '</br>' +
              'Your Can Login'
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
            location.reload();
          }, 3000);
          console.log(error);
        }
      );

      this.registered = true;
    }
  }
}

