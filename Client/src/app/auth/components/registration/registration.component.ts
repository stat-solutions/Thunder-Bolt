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
    "Central Region",
    "Western Region",
    "Southern Region",
    "Northern Region",
    "Eastern Region"
  ];
  towns = [
    {name:"Kampala", area: "Central Region"},
    {name:"Wakiso", area: "Central Region"},
    {name: "Mbale", area: "Eastern Region"},
    {name:"Busia", area: "Eastern Region"},
    {name:"Mbarara", area: "Western Region"},
    {name:"Bushenyi", area: "Western Region"},
    {name:"Kisoro", area: "Western Region"},
    {name:"Kotido", area: "Northern Region"},
    {name:"Moroto", area: "Northern Region"},
    {name:"Arua", area: "Northern Region"},
  ];
  stations = [
    {name: "ndeba", town:"Wakiso"},
    {name: "ndejje", town: "Kampala"},
    {name: "matugga", town:"Wakiso"},
    {name: "kinawa", town:"Kampala"},
    {name: "kitale", town:"Mbarara"},
    {name: "katwe", town:"Kampala"},
    {name: "sogga", town:"Mbale"},
    {name: "kitwee", town:"Wakiso"},
    {name: "busega", town:"Kampala"},
    {name: "mbweera", town:"Arua"},
  ];

  constructor(
    private authService: AuthServiceService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.myDateValue = new Date();
    this.userForm = this.createFormGroup();
    localStorage.setItem("towns", JSON.stringify(this.towns));
    localStorage.setItem("stations", JSON.stringify(this.stations));
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
      )
    });
  }

  revert() {
    this.userForm.reset();
  }

  get fval() {
    return this.userForm.controls;
  }
    //toggle visibility of password field
    toggleFieldType() {
      this.fieldType = !this.fieldType;
    }

  setTownsSelection  (area: string) {
    this.towns = JSON.parse(localStorage.getItem("towns"));
    this.towns = this.towns.filter(town => town.area == area);
  } 
  setStationSelection  (town: string) {
    this.stations = JSON.parse(localStorage.getItem("stations"));
    this.stations = this.stations.filter(station => station.town == town);
  }

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

