import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { CustomValidator } from 'src/app/validators/custom-validator';
import { OthersService } from 'src/app/shared/services/other-services/others.service';
import * as jwt_decode from 'jwt-decode';
import { NgTranscludeDirective } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {
  registered = false;
  submitted = false;
  errored = false;
  posted = false;
  showFinalBtn = false;
  showcompleteBtn = true;
  userForm: FormGroup;
  bodaClientForm: FormGroup;
  taxiClientForm: FormGroup;
  microClientForm: FormGroup;
  savingsClientForm: FormGroup;
  showPersonalForm = true;
  showBodaForm = false;
  showTaxiForm = false;
  showMicroForm = false;
  showSaveForm = false;
  currentForm = [];
  // showSubmitForm = false;
  serviceErrors: any = {};
  value: string;
  fieldType: boolean;
  products: any;
  theStageNames: any;
  User = this.authService.loggedInUserInfo();
  taxiStages: any;
  bodaStages: any;
  data = [];
  constructor(
    private authService: AuthServiceService,
    private others: OthersService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.errored = false;
    this.posted = false;
    this.userForm = this.createFormGroup();
    this.bodaClientForm = this.bodaClientFormGroup();
    this.taxiClientForm = this.taxiClientFormGroup();
    this.microClientForm = this.microClientFormGroup();
    this.savingsClientForm = this.savingsClientFormGroup();
    this.others.getProducts().subscribe(
      res => {
        this.products = res;
      // tslint:disable-next-line: only-arrow-functions
        this.products = this.products.map(function(pdt: any): any {
          return {
            productCode: pdt.productCode,
            productName: pdt.productName.replace(/_/g, ' ').toUpperCase()
          };
        });
      },
      err => console.log(err.statusText)
    );
    this.others.getBodaStages().subscribe(
      res => {
        this.bodaStages = res;
        this.bodaStages = this.bodaStages.filter(bodaStage => bodaStage.bodabodaStageName != null);
      },
      err => console.log(err.statusText)
    );
    this.others.getTaxiStages().subscribe(
      res => {
        this.taxiStages = res;
        this.taxiStages = this.taxiStages.filter(taxiStage => taxiStage.taxiStageName != null);
      },
      err => console.log(err.statusText)
    );
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
          // Validators.required,
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
          // CustomValidator.patternValidator(
          //   /^(([a-zA-Z])([a-zA-Z])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([a-zA-Z])
          // ([a-zA-Z])([a-zA-Z])([a-zA-Z])([a-zA-Z]))$/,
          //   { nationalIdCheck: true }
          // ),
        ])
      ),
      dateOfBirth: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      productCode: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      homeDetails: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      clientComment: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
    });
  }
  bodaClientFormGroup(): any {
    return new FormGroup({
      clientName: new FormControl(
        '',
      ),
      bodabodaCustomerNumberPlate: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8),
          // CustomValidator.patternValidator(
          //   /^(([U])([A-Z])([A-Z])(\s)([0-9])([0-9])([0-9])([A-Z]))$/,
          //   { beUgandanNumberPlate: true }
          // )
        ])
      ),
      bodaMakeorType: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      bodaInsuarance: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      bodaStage: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      dateOfJoiningStage: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      ownershipStatus: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      ownersName: new FormControl(
        '',
        // Validators.compose([Validators.required])
      ),
      ownersPhoneNumber: new FormControl(
        '',
        Validators.compose([
          // Validators.required
          CustomValidator.patternValidator(
            /^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/,
            { hasNumber: true }
          ),
        ])
      )
    });
  }
  taxiClientFormGroup(): any {
    return new FormGroup({
      clientName: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      drivingPermit: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      taxiCustomerNumberPlate: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(7),
          // CustomValidator.patternValidator(
          //   /^(([U])([A-Z])([A-Z])(\s)([0-9])([0-9])([0-9])([A-Z]))$/,
          //   { beUgandanNumberPlate: true }
          // )
        ])
      ),
      taxiMakeorType: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      taxiInsuarance: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      taxiStage: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      dateOfJoiningStage: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      ownershipStatus: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      ownersName: new FormControl(
        '',
        // Validators.compose([Validators.required])
      ),
      ownersPhoneNumber: new FormControl(
        '',
        Validators.compose([
          // Validators.required
          CustomValidator.patternValidator(
            /^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/,
            { hasNumber: true }
          ),
        ])
      )
    });
  }
  microClientFormGroup(): any {
    return new FormGroup({
      clientName: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      loanpurpose: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      currentBusinesstype: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      businessLocation: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      averageDailyExpenses: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(8),
          Validators.minLength(3),
          CustomValidator.patternValidator(/\d/, { hasNumber: true }),
        ])
      ),
      averageDailyIncome: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(8),
          Validators.minLength(3),
          CustomValidator.patternValidator(/\d/, { hasNumber: true }),
        ])
      ),
      currentResidence: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      residenceStatus: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      numberOfDependants: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
    });
  }
  savingsClientFormGroup(): any {
    return new FormGroup({
      clientName: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      monthlyIncome: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(8),
          Validators.minLength(3),
          CustomValidator.patternValidator(/\d/, { hasNumber: true }),
        ])
      ),
      withdrawFreequency: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      customerTarget: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
    });
  }
  setSelectedChanges(selectedChange: any): any {
    switch (selectedChange) {
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
          Validators.minLength(9),
          Validators.maxLength(9)
        ]);
        break;
      case 'PASSPORT':
        this.fval.id_number.setValue('');
        this.fval.id_number.setValidators([
          Validators.required,
          Validators.minLength(20),
          Validators.maxLength(20)
        ]);
        break;
      case 'DRIVING PERMIT':
        this.fval.id_number.setValue('');
        this.fval.id_number.setValidators([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10)
        ]);
        break;
      case 'ONLOAN':
          this.bodaFval.ownersName.setValidators([Validators.required]);
          this.bodaFval.ownersPhoneNumber.setValidators([Validators.required]);
          this.taxiFval.ownersName.setValidators([Validators.required]);
          this.taxiFval.ownersPhoneNumber.setValidators([Validators.required]);
          break;
      case 'HIREDOUT':
          this.bodaFval.ownersName.setValidators([Validators.required]);
          this.bodaFval.ownersPhoneNumber.setValidators([Validators.required]);
          this.taxiFval.ownersName.setValidators([Validators.required]);
          this.taxiFval.ownersPhoneNumber.setValidators([Validators.required]);
          break;
    }
  }

  completeForm(): any {
    if (this.fval.productCode.value){
     this.data.push({
      customerName: this.fval.customer_name.value.toUpperCase(),
      customerPhone1: this.fval.main_contact_number1.value,
      customerPhone2: this.fval.main_contact_number2.value === '' ?
                      this.fval.main_contact_number1.value :
                      this.fval.main_contact_number2.value,
      customerIdType: this.fval.id_type.value.toUpperCase(),
      customerDateOfBirth: `${this.fval.dateOfBirth.value.getFullYear()}-${this.fval.dateOfBirth.value.getMonth() + 1}-${this.fval.dateOfBirth.value.getDate()}`,
      customerIdNumber: this.fval.id_number.value,
      customerHomeAreaDetails: this.fval.homeDetails.value.toUpperCase(),
      customerComment: this.fval.clientComment.value.toUpperCase(),
      theStationLocationId: this.User.userLocationId,
      userId: this.User.userId,
      productCode: null
     });
     this.products.forEach(pdt => {
       if (pdt.productName === this.fval.productCode.value){
        this.data[0].productCode = pdt.productCode;
       }
     });
     if (this.fval.productCode.value === 'BODABODA LOAN PRODUCT'){
      this.showPersonalForm = false;
      this.showBodaForm = true;
      this.showFinalBtn = true;
      this.showcompleteBtn = false;
      this.bodaFval.clientName.setValue(this.fval.customer_name.value.toUpperCase());
      this.bodaFval.clientName.disable();
     }
     else if (this.fval.productCode.value === 'MICROLOAN PRODUCT'){
      this.showPersonalForm = false;
      this.showMicroForm = true;
      this.showFinalBtn = true;
      this.showcompleteBtn = false;
      this.microFval.clientName.setValue(this.fval.customer_name.value.toUpperCase());
      this.microFval.clientName.disable();
      this.microFval.currentResidence.setValue(this.fval.homeDetails.value.toUpperCase());
      this.microFval.currentResidence.disable();

     }
     else if (this.fval.productCode.value === 'TAXI LOAN PRODUCT'){
      this.showPersonalForm = false;
      this.showFinalBtn = true;
      this.showTaxiForm = true;
      this.showcompleteBtn = false;
      this.taxiFval.clientName.setValue(this.fval.customer_name.value.toUpperCase());
      this.taxiFval.clientName.disable();
     }
     else if (this.fval.productCode.value === 'SAVINGS PRODUCT'){
      this.fval.productCode.setValue(' ');
      this.showPersonalForm = false;
      this.showFinalBtn = true;
      this.showSaveForm = true;
      this.showcompleteBtn = false;
      this.savFval.clientName.setValue(this.fval.customer_name.value.toUpperCase());
      this.savFval.clientName.disable();
     }
    }
  }

  goBack(): any{
    this.showPersonalForm = true;
    this.showBodaForm = false;
    this.showTaxiForm = false;
    this.showMicroForm = false;
    this.showSaveForm = false;
    this.showFinalBtn = false;
    this.showcompleteBtn = true;
    this.errored = false;
    this.data = [];
  }
  // toggle visibility of password field
  toggleFieldType(): any {
    this.fieldType = !this.fieldType;
  }

  revert(): any {
    this.userForm.reset();
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
  get savFval(): any {
    return this.savingsClientForm.controls;
  }

  saveClientAndPdt(): any {
    if (this.showBodaForm){
      if (this.bodaClientForm.valid) {
        if (
          this.bodaFval.ownershipStatus.value.toUpperCase() !== 'PAIDOUT'
          && (this.bodaFval.ownersName.value === '' ||
              this.bodaFval.ownersPhoneNumber.value === '')){
              this.errored = true;
              this.alertService.danger({
                html: '<strong>The ownership details are missing</strong>'
            });
        }
        else {
          this.data.push({
            bodabodaCustomerNumberPlate: this.bodaFval.bodabodaCustomerNumberPlate.value.toUpperCase(),
            bodabodaCustomerMakeOrType:  this.bodaFval.bodaMakeorType.value.toUpperCase(),
            bodabodaCustomerInsurance: this.bodaFval.bodaInsuarance.value.toUpperCase() === 'NONE' ?
                                        1 : this.bodaFval.bodaInsuarance.value.toUpperCase() === 'REGULAR' ?
                                        2 : 3,
            bodabodaCustomerDateOfJoinStage: `${this.bodaFval.dateOfJoiningStage.value.getFullYear()}-${this.bodaFval.dateOfJoiningStage.value.getMonth() + 1}-${this.bodaFval.dateOfJoiningStage.value.getDate()}`,
            bodabodaOwnershipStatus: this.bodaFval.ownershipStatus.value.toUpperCase() === 'ONLOAN' ?
                                        1 : this.bodaFval.ownershipStatus.value.toUpperCase() === 'PAIDOUT' ?
                                        2 : 3,
            bodabodaCustomerOwnersName: this.bodaFval.ownersName.value.toUpperCase(),
            bodabodaCustomerOwnersPhone1: this.bodaFval.ownersPhoneNumber.value,
            // customerId: 400000000,
            bodabodaStageId: null,
            productCode: this.data[0].productCode
          });
          this.bodaStages.forEach(bodaStage => {
            if (bodaStage.bodabodaStageName.toUpperCase() === this.bodaFval.bodaStage.value){
              this.data[1].bodabodaStageId = bodaStage.bodabodaStageId;
            }
          });
          console.log(this.data);
          this.others.createCustomer(this.data).subscribe(
            res => {
              this.posted = true;
              this.data = [];
              this.alertService.success({
                html: '<b> customer was created succsefully <b>'
              });
              this.revert();
              this.bodaClientForm.reset();
              setTimeout(() => {
                  location.reload();
                }, 3000);
            },
            err => {
              this.data = [];
              console.log(err.statusText);
            }
          );
      }
    }
    else {
        this.errored = true;
        this.alertService.danger({
            html: '<strong>some form fields where not filled</strong>'
        });
      }
    }
    else if (this.showTaxiForm){
      if (this.taxiClientForm.valid) {
        if (
          this.taxiFval.ownershipStatus.value.toUpperCase() !== 'PAIDOUT'
          && (this.taxiFval.ownersName.value === '' ||
              this.taxiFval.ownersPhoneNumber.value === '')){
              this.errored = true;
              this.alertService.danger({
                html: '<strong>The ownership details are missing</strong>'
            });
        }
        else {
          this.data.push({
            taxiCustomerNumberPlate: this.taxiFval.taxiCustomerNumberPlate.value.toUpperCase(),
            taxiCustomerDrivingPermitNumber: this.taxiFval.drivingPermit.value,
            taxiCustomerMakeOrType:  this.taxiFval.taxiMakeorType.value.toUpperCase(),
            taxiCustomerInsurance: this.taxiFval.taxiInsuarance.value.toUpperCase() === 'NONE' ?
                                        1 : this.taxiFval.taxiInsuarance.value.toUpperCase() === 'REGULAR' ?
                                        2 : 3,
            taxiCustomerDateOfJoinStage: `${this.taxiFval.dateOfJoiningStage.value.getFullYear()}-${this.taxiFval.dateOfJoiningStage.value.getMonth() + 1}-${this.taxiFval.dateOfJoiningStage.value.getDate()}`,
            taxiCustomerOwnershipStatus: this.taxiFval.ownershipStatus.value.toUpperCase() === 'ONLOAN' ?
                                        1 : this.taxiFval.ownershipStatus.value.toUpperCase() === 'PAIDOUT' ?
                                        2 : 3,
            taxiCustomerOwnersName: this.taxiFval.ownersName.value.toUpperCase(),
            taxiCustomerOwnersPhone: this.taxiFval.ownersPhoneNumber.value,
            // customerId: 400000000,
            taxiStageId: null,
            productCode: this.data[0].productCode
          });
          this.taxiStages.forEach(taxiStage => {
            if (taxiStage.taxiStageName.toUpperCase() === this.taxiFval.taxiStage.value){
              this.data[1].taxiStageId = taxiStage.taxiStageId;
            }
          });
          console.log(this.data);
          this.others.createCustomer(this.data).subscribe(
            res => {
              this.posted = true;
              this.data = [];
              this.alertService.success({
                html: '<b> customer was created succsefully <b>'
              });
              this.revert();
              this.taxiClientForm.reset();
              setTimeout(() => {
                  location.reload();
                }, 3000);
            },
            err => {
              this.data = [];
              console.log(err.statusText);
            }
          );
        }
      } else {
        this.errored = true;
        this.alertService.danger({
            html: '<strong>some form fields where not filled</strong>'
        });
      }
    }
    else if (this.showMicroForm){
      if (this.microClientForm.valid) {
        this.data.push({
          microloanCustomerLoanPurpose: this.microFval.loanpurpose.value.toUpperCase(),
          microloanCustomerCurrentBusinessType: this.microFval.currentBusinesstype.value.toUpperCase(),
          microloanCustomerCurrentBusinessLocation: this.microFval.businessLocation.value.toUpperCase(),
          microloanCustomerAverageDailyExpenses: this.microFval.averageDailyExpenses.value,
          microloanCustomerAverageDailyIncome: this.microFval.averageDailyIncome.value.toUpperCase(),
          microloanCustomerCurrentResidence: this.microFval.currentResidence.value.toUpperCase(),
          microloanCustomerResidenceStatus: this.microFval.residenceStatus.value.toUpperCase(),
          microloanCustomerNumberOfDependants: this.microFval.numberOfDependants.value,
      //  customerId: 400000000,
         productCode: this.data[0].productCode
        });
        console.log(this.data);
        this.others.createCustomer(this.data).subscribe(
          res => {
            this.posted = true;
            this.data = [];
            this.alertService.success({
              html: '<b> customer was created succsefully <b>'
            });
            this.revert();
            this.microClientForm.reset();
            setTimeout(() => {
                location.reload();
              }, 3000);
          },
          err => {
            this.data = [];
            console.log(err.statusText);
          }
        );
      } else {
        this.errored = true;
        this.alertService.danger({
            html: '<strong>some form fields where not filled</strong>'
        });
      }
    }
    else if (this.showSaveForm){
      if (this.savingsClientForm.valid) {
        this.data.push({
          savingsCustomerMonthlyIncome: this.savFval.monthlyIncome.value,
          savingsCustomerWithdrawFreequency: this.savFval.withdrawFreequency.value.toUpperCase(),
          savingsCustomerTarget: this.savFval.customerTarget.value.toUpperCase(),
          // customerId: 400000000,
          productCode: this.data[0].productCode
        });
        console.log(this.data);
        this.others.createCustomer(this.data).subscribe(
          res => {
            this.posted = true;
            this.data = [];
            this.alertService.success({
              html: '<b> customer was created succsefully <b>'
            });
            this.revert();
            this.savingsClientForm.reset();
            setTimeout(() => {
                location.reload();
              }, 3000);
          },
          err => {
            this.data = [];
            console.log(err.statusText);
          }
        );
      } else {
        this.errored = true;
        this.alertService.danger({
            html: '<strong>some form fields where not filled</strong>'
        });
      }
    }
  }
}
