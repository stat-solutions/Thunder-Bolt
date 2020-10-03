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
  companyInfo: CompanyInfo[];

  constructor(
    private others: OthersService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private alertService: AlertService,
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
        Validators.compose([Validators.required])
      ),
      companyEmail2: new FormControl(
        '',
        Validators.compose([])
      ),
      companyBoxNumber: new FormControl(
        '',
        Validators.compose([
          Validators.required,

          // 2. check whether the entered box number has a number
          CustomValidator.patternValidator(
            /^([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])$/,
            {
              hasNumber: true,
            }
          ),
          // 6. Has a length of exactly 4 digits
          Validators.minLength(4),
          Validators.maxLength(7),
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
      companyLogo: new FormControl(
        '',
        Validators.compose([
          Validators.required
        ])
      ),
      companyStreetName: new FormControl(
        '',
        Validators.compose([
          Validators.required
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

      // this.others.getCompanyInfo().subscribe(
      //   item => {
      //     this.companyInfo = item;
      //     this.companyForm.get('companyName').setValue('thunder Bolt');
      //   },
      //   (error: string) => {
      //     //
      //   }
      // );
  }

  createCompany(): any {
    this.submitted = true;
    this.spinner.show();

    if (this.companyForm.invalid === true) {
      return;
    } else {
      // have to edit
      this.others.createCompany(this.companyForm).subscribe(
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
          setTimeout(() => {
                  location.reload();
                }, 3000);
          console.log(error);
          this.spinner.hide();
        }
      );

      this.companyCreated = true;
    }
  }
}
