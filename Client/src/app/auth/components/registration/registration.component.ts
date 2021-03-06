import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { CustomValidator } from 'src/app/validators/custom-validator';
import { AlertService } from 'ngx-alerts';
import { FormBuilder } from '@angular/forms';
import { UserRole } from 'src/app/shared/models/user-role';
import { RegisterUser } from 'src/app/shared/models/register';
import { OthersService } from 'src/app/shared/services/other-services/others.service';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

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
  downloadURL: any;
  userIdPhoto: string;

  constructor(
    private authService: AuthServiceService,
    private others: OthersService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private alertService: AlertService,
    private fb: FormBuilder,
    private storage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.getRoles();
    this.getUnits();
    this.others.getAllTheAreaLocations().subscribe(res => this.areas = res);
    this.others.getAllTheTownLocations().subscribe(res => this.towns = res);
    this.others.getAllTheStationLocations().subscribe(res => this.stations = res);
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
          idPhotoUrl: new FormControl('', Validators.compose([])),
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
  setSelectedChanges(selectedChange: any): any {
    switch (selectedChange) {
      case 'Select the ID type':
        this.fval.id_type.setValue('');
        this.fval.id_type.setValidators([Validators.required]);
        break;
      case 'NATIONAL ID':
        this.fval.id_number.setValue('');
        this.fval.id_number.setValidators([
          Validators.required,
          Validators.minLength(14),
          Validators.maxLength(14)
        ]);
        break;
      case 'VILLAGE ID':
        this.fval.id_number.setValue('');
        this.fval.id_number.setValidators([
          Validators.required,
          // Validators.minLength(9),
          // Validators.maxLength(9)
        ]);
        break;
      case 'PASSPORT':
        this.fval.id_number.setValue('');
        this.fval.id_number.setValidators([
          Validators.required,
          // Validators.minLength(20),
          // Validators.maxLength(20)
        ]);
        break;
      case 'DRIVING PERMIT':
        this.fval.id_number.setValue('');
        this.fval.id_number.setValidators([
          Validators.required,
          // Validators.minLength(10),
          // Validators.maxLength(10)
        ]);
        break;
      case 'AREA USER':
        this.fval.area.setValidators([
          Validators.required,
        ]);
        break;
      case 'TOWN USER':
        this.fval.town.setValidators([
          Validators.required,
        ]);
        break;
      case 'STATION USER':
        this.fval.station.setValidators([
          Validators.required,
        ]);
        break;
      case 'CENTRAL USER':
        this.fval.central.setValidators([
          Validators.required,
        ]);
        break;
      }
    }
revert(): any {
    this.userForm.reset();
  }
log(): any{

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
      this.router.navigate(['']);
    }, 2000);
  }
getUnits(): any {
  this.others.getBussinessUnitLocations().subscribe(
    res => {
      this.units = res;
      // console.log(this.units);
  },
    err => console.log(err.statusText)
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
onFileSelected(event): any {
  const n = Date.now();
  const file = event.target.files[0];
  const filePath = `Users/${n}`;
  const fileRef = this.storage.ref(filePath);
  const task = this.storage.upload(`Users/${n}`, file);
  task
  .snapshotChanges()
  .pipe(
    finalize(() => {
      this.downloadURL = fileRef.getDownloadURL();
      this.downloadURL.subscribe(url => {
        if (url) {
          this.userIdPhoto = url;
          // console.log(this.userIdPhoto);
        }
      });
    })
  )
  .subscribe(url => {
    if (url) {
      // console.log(url);
    }
  });
}
register(): any {
    // console.log('hi');
    this.submitted = true;
    this.spinner.show();
    if (this.userForm.invalid === true) {
      this.spinner.hide();
      return;
    }
    else {
      this.roles.forEach(role => {
        if (this.fval.position.value === role.roleName) {
          this.selectedRole = role.accessRightsId;
        }
      });
      if (this.fval.position.value === 'AREA USER'){
        this.areas.forEach(area => {
          if (this.fval.area.value.toLowerCase() === area.areaRegionName.toLowerCase().replace(/_/g, ' ')) {
            this.selectedLocation = area.theAreaLocationId;
          }
        });
      } else  if (this.fval.position.value === 'TOWN USER'){
        this.towns.forEach(town => {
          if (this.fval.town.value.toLowerCase() === town.townName.toLowerCase().replace(/_/g, ' ')) {
            this.selectedLocation = town.theTownLocationId;
          }
        });
      }  else  if (this.fval.position.value === 'STATION USER' ){
        this.stations.forEach(station => {
          if (this.fval.station.value.toLowerCase() === station.stationName.toLowerCase().replace(/_/g, ' ')) {
            this.selectedLocation = station.theStationLocationId;
          }
        });
      } else if (this.fval.position.value === 'ADMIN') {
        this.selectedLocation = 1000;
      } else if (this.fval.position.value === 'CENTRAL USER') {
        this.units.forEach(unit => {
          if (this.fval.central.value.toLowerCase() === unit.bussinessUnitName.toLowerCase().replace(/_/g, ' ')) {
            this.selectedLocation = unit.theBusinessUnitId;
          }
        });
      }
      this.registerUser = {
        userName: this.fval.full_name.value.toUpperCase(),
        userEmail1: this.fval.email.value,
        userPhone1: `${this.fval.user_contact_number.value}`,
        userIdPhotoUrl: this.userIdPhoto,
        userIdType: this.fval.id_type.value,
        userIdNumber: `${this.fval.id_number.value.toUpperCase()}`,
        userDateOfBirth: `${this.fval.date_of_birth.value.getFullYear()}-${this.fval.date_of_birth.value.getMonth() + 1}-${this.fval.date_of_birth.value.getDate()}`,
        userPassword: Number(this.fval.password.value),
        fkAccessRightsIdUser: this.selectedRole,
        locationId: this.selectedLocation
      };
      // console.log(this.registerUser);
      if ( this.registerUser.locationId){
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
                this.revert();
              }
            );
      } else {
        this.spinner.hide();
        this.errored = true;
        this.alertService.danger({
        html: '<b>' + 'No location address was selected' + '</b>' + '<br/>'
        });
      }
      this.spinner.hide();
      this.registered = true;
    }
  }
}

