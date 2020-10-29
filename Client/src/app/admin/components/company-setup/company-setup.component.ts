import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { CustomValidator } from 'src/app/validators/custom-validator';
import { AlertService } from 'ngx-alerts';
import { OthersService } from 'src/app/shared/services/other-services/others.service';
import { CompanyInfo } from 'src/app/shared/models/company';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-company-setup',
  templateUrl: './company-setup.component.html',
  styleUrls: ['./company-setup.component.scss']
})
export class CompanySetupComponent implements OnInit {
  companyCreated = false;
  submitted = false;
  errored = false;
  posted = false;
  companyForm: FormGroup;
  serviceErrors: any = {};
  value: string;
  fieldType: boolean;
  mySubscription: any;
  myDateValue: Date;
  // companyInfo: CompanyInfo;
  User = this.authService.loggedInUserInfo();
  constructor(
    private others: OthersService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private alertService: AlertService,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.companyForm = this.createFormGroup();
    this.setCompanyValues();
    this.disableForm();
  }

  createFormGroup(): any {
    return new FormGroup({
      companyName: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      companyEmail1: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ])
      ),
      companyEmail2: new FormControl(
        '',
        Validators.compose([
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ])
      ),
      companyBoxNumber: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          // // 2. check whether the entered box number has a number
          // CustomValidator.patternValidator(
          //   /^([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])$/,
          //   {
          //     hasNumber: true,
          //   }
          // ),
          // 6. Has a length of exactly 4 digits
          // Validators.minLength(4),
          // Validators.maxLength(7),
        ])
      ),
    companyCityLocation: new FormControl(
      '',
        Validators.compose([Validators.required])
      ),
      companyCountryLocation: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      companyRegionLocation: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      companyOfficeFloor: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      companyPlotNumber: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      companyStreetBuilding: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      companyPhoneContact1: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          CustomValidator.patternValidator(
            /^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/,
            { hasNumber: true }
          )
        ])
      ),
      companyPhoneContact2: new FormControl(
        '',
        Validators.compose([
          CustomValidator.patternValidator(
            /^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/,
            { hasNumber: true }
          )
        ])
      ),
      // companyLogo: new FormControl(
      //   '',
      //   Validators.compose([
      //     Validators.required
      //   ])
      // ),
      companyStreetName: new FormControl(
        '',
        Validators.compose([
          // Validators.required
        ])
      )
    });
  }

  revert(): any {
    this.companyForm.reset();
  }

  get fval(): any {
    return this.companyForm.controls;
  }

  // toggle visibility of password field
    toggleFieldType(): any {
      this.fieldType = !this.fieldType;
    }

  returnHome(): any {
    this.spinner.hide();
    this.revert();

    setTimeout(() => {
      this.router.navigate(['admin/dashboard']);
    }, 2000);
  }

  disableForm(): any {
    return this.companyForm.disable();
  }

  enableEdit(): any {
    return this.companyForm.enable();
  }

  setCompanyValues(): any {

      this.others.getCompanyInfo().subscribe(
        item => {
          // this.companyCreated = true;
          console.log(item);
          // this.companyForm.value = item[0];
          this.fval.companyName.setValue(item[0].companyName);
          this.fval.companyBoxNumber.setValue(item[0].companyBoxNumber);
          this.fval.companyCityLocation.setValue(item[0].companyCityLocation);
          this.fval.companyCountryLocation.setValue(item[0].companyCountryLocation);
          this.fval.companyRegionLocation.setValue(item[0].companyRegionLocation);
          this.fval.companyOfficeFloor.setValue(item[0].companyOfficeFloor);
          this.fval.companyPlotNumber.setValue(item[0].companyPlotNumber);
          this.fval.companyStreetBuilding.setValue(item[0].companyStreetBuilding);
          this.fval.companyEmail1.setValue(item[0].companyEmail1);
          this.fval.companyEmail2.setValue(item[0].companyEmail2);
          this.fval.companyPhoneContact1.setValue(item[0].companyPhoneContact1);
          this.fval.companyPhoneContact2.setValue(item[0].companyPhoneContact2);
        },
        (error: string) => {
          //
        }
      );
  }

  createCompany(): any {
    this.submitted = true;
    this.spinner.show();

    if (this.companyForm.invalid === true) {
      return;
    } else {
      // have to edit
      const companyDetails = {
        companyName: this.fval.companyName.value.toUpperCase(),
        companyBoxNumber: this.fval.companyBoxNumber.value.toUpperCase(),
        companyCityLocation: this.fval.companyCityLocation.value.toUpperCase(),
        companyCountryLocation: this.fval.companyCountryLocation.value.toUpperCase(),
        companyRegionLocation: this.fval.companyRegionLocation.value.toUpperCase(),
        companyOfficeFloor: this.fval.companyOfficeFloor.value.toUpperCase(),
        companyPlotNumber: this.fval.companyPlotNumber.value.toUpperCase(),
        companyStreetBuilding: this.fval.companyStreetBuilding.value.toUpperCase(),
        companyEmail1: this.fval.companyEmail1.value,
        companyEmail2: this.fval.companyEmail2.value,
        companyPhoneContact1: this.fval.companyPhoneContact1.value,
        companyPhoneContact2: this.fval.companyPhoneContact2.value,
        userId: this.User.userId,
      };
      console.log(companyDetails);
      this.others.createCompany(companyDetails).subscribe(
        () => {
          this.posted = true;
          this.spinner.hide();

          this.alertService.success({
            html:
              '<b>User Company setup was Successful</b>' +
              '</br>'
          });
          setTimeout(() => {
            this.router.navigate(['admin/dashboard']);
          }, 3000);
        },

        (error: string) => {
          this.spinner.hide();
          this.serviceErrors = error;
          this.alertService.danger({
            html: '<b>' + this.serviceErrors + '</b>' + '<br/>'
          });
          // setTimeout(() => {
          //         location.reload();
          //       }, 3000);
          console.log(error);
          this.spinner.hide();
        }
      );
      this.spinner.hide();
      this.companyCreated = true;
    }
  }
}
