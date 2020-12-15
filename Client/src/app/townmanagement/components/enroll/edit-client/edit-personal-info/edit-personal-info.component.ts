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
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-edit-personal-info',
  templateUrl: './edit-personal-info.component.html',
  styleUrls: ['./edit-personal-info.component.scss']
})
export class EditPersonalInfoComponent implements OnInit {
  errored = false;
  posted = false;
  userForm: FormGroup;
  bodaClientForm: FormGroup;
  taxiClientForm: FormGroup;
  microClientForm: FormGroup;
  savingsClientForm: FormGroup;
  searchForm: FormGroup;
  addProduct = false;
  showAddPdtBtn: boolean;
  showPersonalForm = true;
  showBodaForm = false;
  showTaxiForm = false;
  showMicroForm = false;
  showSaveForm = false;
  serviceErrors: any = {};
  value: string;
  fieldType: boolean;
  products: any;
  customers: any;
  User = this.authService.loggedInUserInfo();
  taxiStages: any;
  bodaStages: any;
  stations: any;
  clientPhotoUrl: string;
  clientIdUrl: string;
  bodaFrontUrl: string;
  bodaSideUrl: string;
  bodaRearUrl: string;
  taxiFrontUrl: string;
  taxiSideUrl: string;
  taxiRearUrl: string;
  currentCustomer: any;
  currentCustomerId: number;
  taxiCustomerId: number;
  bodaCustomerId: number;
  microCustomerId: number;
  savingsCustomerId: number;
  bodabodaCustomerId: number;
  microloanCustomerId: number;
  thereCustomers = false;
  noCustomers = true;
  constructor(
    private authService: AuthServiceService,
    private others: OthersService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private alertService: AlertService,
    private storage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.errored = false;
    this.posted = false;
    this.searchForm = (function searchStation(): any{
      return new FormGroup({
        getCustomers: new FormControl(
          '',
          Validators.compose([Validators.required])
        ),
      });
    })();
    this.userForm = this.createFormGroup();
    this.bodaClientForm = this.bodaClientFormGroup();
    this.taxiClientForm = this.taxiClientFormGroup();
    this.microClientForm = this.microClientFormGroup();
    this.savingsClientForm = this.savingsClientFormGroup();
    this.others.getAllTheStationLocationsByTown(this.User.userLocationId).subscribe(
      res => {
        this.stations = res;
      // tslint:disable-next-line: only-arrow-functions
      },
      err => console.log(err.statusText)
    );
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
      station: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
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
      clientPhotoUrl: new FormControl(
        '',
        // Validators.compose([Validators.required])
      ),
      idPhotoUrl: new FormControl(
        '',
        // Validators.compose([Validators.required])
      ),

      productCode: new FormControl(
        '',
        // Validators.compose([Validators.required])
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
          Validators.minLength(7),
          Validators.maxLength(7),
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
      bodabodaCustomerFrontPhotoUrl: new FormControl(
        '',
        // Validators.compose([Validators.required])
      ),
      bodabodaCustomerSidePhotoUrl: new FormControl(
        '',
        // Validators.compose([Validators.required])
      ),
      bodabodaCustomerRearPhotoUrl: new FormControl(
        '',
        // Validators.compose([Validators.required])
      ),
      ownershipStatus: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      ownersName: new FormControl(
        '',
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
      taxiCustomerFrontPhotoUrl: new FormControl(
        '',
        // Validators.compose([Validators.required])
      ),
      taxiCustomerSidePhotoUrl: new FormControl(
        '',
        // Validators.compose([Validators.required])
      ),
      taxiCustomerRearPhotoUrl: new FormControl(
        '',
        // Validators.compose([Validators.required])
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
        Validators.compose([Validators.required])
      ),
      averageDailyIncome: new FormControl(
        '',
        Validators.compose([Validators.required])
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
        Validators.compose([Validators.required])
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
  console(val: any): any {
    return console.log(val);
  }
  getCustomers(val: any): any{
    let theStationLocationId = null;
    for (const station of this.stations){
      if (station.stationName.toUpperCase() === val.toUpperCase()){
        theStationLocationId = station.theStationLocationId;
       }
    }
    if (theStationLocationId === null){
       this.errored = true;
       this.alertService.danger({
        html: '<b> The station chosen does not exist!</b>'
       });
       return;
    } else {
        this.others.getCustomersByStation(theStationLocationId).subscribe(
          res => {
            this.customers = res;
            this.revert();
            this.currentCustomerId = null;
            if (this.customers.length > 0) {
              this.thereCustomers = true;
              this.noCustomers = true;
            } else {
              this.noCustomers = false;
              this.thereCustomers = false;
            }
          },
          err => {
            this.errored = true;
            this.alertService.danger({
              html: '<b>' + err.statusText + '</b>'
            });
          }
        );
      }
    }

  onFileSelected(event): any {
    // console.log(event.target.id);
    let folder: string;
    switch (event.target.id) {
      case 'clientPhotoUrl':
        folder = 'clientImages/photos-and-ids';
        this.upload(event.target.id, event.target.files[0], folder);
        break;
      case 'idPhotoUrl':
        folder = 'clientImages/photos-and-ids';
        this.upload(event.target.id, event.target.files[0], folder);
        break;
      case 'bodabodaCustomerFrontPhotoUrl':
        folder = 'clientImages/bodaboda';
        this.upload(event.target.id, event.target.files[0], folder);
        break;
      case 'bodabodaCustomerSidePhotoUrl':
        folder = 'clientImages/bodaboda';
        this.upload(event.target.id, event.target.files[0], folder);
        break;
      case 'bodabodaCustomerRearPhotoUrl':
        folder = 'clientImages/bodaboda';
        this.upload(event.target.id, event.target.files[0], folder);
        break;
      case 'taxiCustomerFrontPhotoUrl':
        folder = 'clientImages/taxi';
        this.upload(event.target.id, event.target.files[0], folder);
        break;
      case 'taxiCustomerSidePhotoUrl':
        folder = 'clientImages/taxi';
        this.upload(event.target.id, event.target.files[0], folder);
        break;
      case 'taxiCustomerRearPhotoUrl':
        folder = 'clientImages/taxi';
        this.upload(event.target.id, event.target.files[0], folder);
        break;
    }
  }

  upload(inputType: string, getfile: any, path: any): any {
    const n = Date.now();
    const file = getfile;
    const filePath = `${path}/${n}`;
    // file ? console.log('true') : console.log('false');
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    const result = task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          const downloadURL = fileRef.getDownloadURL();
          downloadURL.subscribe(url => {
            if (url) {
              // console.log(url);
              switch (inputType) {
                case 'clientPhotoUrl':
                  this.clientPhotoUrl = url;
                  // console.log(this.clientPhotoUrl);
                  break;
                case 'idPhotoUrl':
                  this.clientIdUrl = url;
                  // console.log(this.clientIdUrl);
                  break;
                case 'bodabodaCustomerFrontPhotoUrl':
                  this.bodaFrontUrl = url;
                  break;
                case 'bodabodaCustomerSidePhotoUrl':
                  this.bodaSideUrl = url;
                  break;
                case 'bodabodaCustomerRearPhotoUrl':
                  this.bodaRearUrl = url;
                  break;
                case 'taxiCustomerFrontPhotoUrl':
                  this.taxiFrontUrl = url;
                  break;
                case 'taxiCustomerSidePhotoUrl':
                  this.taxiSideUrl = url;
                  break;
                case 'taxiCustomerRearPhotoUrl':
                  this.taxiRearUrl = url;
                  break;
              }
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
      case 'ONLOAN':
          this.bodaFval.ownersName.setValidators([Validators.required]);
          this.bodaFval.ownersPhoneNumber.setValidators([
            Validators.required,
            CustomValidator.patternValidator(
              /^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/,
              { hasNumber: true }
            ),
          ]);
          this.taxiFval.ownersName.setValidators([Validators.required]);
          this.taxiFval.ownersPhoneNumber.setValidators([
            Validators.required,
            CustomValidator.patternValidator(
              /^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/,
              { hasNumber: true }
            ),
          ]);
          break;
      case 'HIREDOUT':
          this.bodaFval.ownersName.setValidators([Validators.required]);
          this.bodaFval.ownersPhoneNumber.setValidators([
            Validators.required,
            CustomValidator.patternValidator(
              /^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/,
              { hasNumber: true }
            ),
           ]);
          this.taxiFval.ownersName.setValidators([Validators.required]);
          this.taxiFval.ownersPhoneNumber.setValidators([
            Validators.required,
            CustomValidator.patternValidator(
              /^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/,
              { hasNumber: true }
            ),
           ]);
          break;
      case 'BODABODA LOAN PRODUCT':
          this.bodaForm();
          break;
      case 'TAXI LOAN PRODUCT':
          this.taxiForm();
          break;
      case 'MICROLOAN PRODUCT':
          this.microForm();
          break;
      case 'SAVINGS PRODUCT':
          this.savingForm();
          break;
    }
  }

  bodaForm(): any{
    if (this.currentCustomer.productCodes.includes(200)){
      this.others.getBodaCustomer(this.currentCustomerId).subscribe(
        res => {
          const customer = res[0];
          this.bodabodaCustomerId = customer.bodabodaCustomerId;
          this.bodaFval.bodabodaCustomerNumberPlate.setValue(customer.bodabodaCustomerNumberPlate.replace(/\s/g, ''));
          this.bodaFval.bodabodaCustomerNumberPlate.disable();
          this.bodaFval.bodaMakeorType.setValue(customer.bodabodaCustomerMakeOrType);
          this.bodaFval.bodaInsuarance.setValue(customer.bodabodaCustomerInsurance === 1 ?
                                            'NONE' : customer.bodabodaCustomerInsurance === 2 ?
                                            'REGULAR' : 'COMPREHENSIVE');
          this.bodaFval.dateOfJoiningStage.setValue(new Date(customer.bodabodaCustomerDateOfJoinStage));
          this.bodaFval.ownershipStatus.setValue(customer.bodabodaOwnershipStatus === 1 ?
                                            'ONLOAN' : customer.bodabodaOwnershipStatus === 2 ?
                                            'PAIDOUT' : 'HIREDOUT');
          this.bodaFval.ownersName.setValue(customer.bodabodaCustomerOwnersName);
          this.bodaFval.ownersPhoneNumber.setValue(customer.bodabodaCustomerOwnersPhone);
          this.bodaFrontUrl = customer.bodabodaCustomerFrontPhotoUrl;
          this.bodaSideUrl = customer.bodabodaCustomerSidePhotoUrl;
          this.bodaRearUrl = customer.bodabodaCustomerRearPhotoUrl;
          this.bodaStages.forEach(bodaStage => {
            if (bodaStage.bodabodaStageId === customer.fkBodabodaStageIdBodabodaCustomer){
              this.bodaFval.bodaStage.setValue(bodaStage.bodabodaStageName.toUpperCase());
            }
          });
        },
        err => {
          this.errored = true;
          console.log(err.statusText);
          this.alertService.danger({
              html: '<b>' + err.statusText + '</b>'
            });
        }
      );
    }
    this.showPersonalForm = false;
    this.showBodaForm = true;
    this.bodaFval.clientName.setValue(this.fval.customer_name.value.toUpperCase());
    this.bodaFval.clientName.disable();
  }
  taxiForm(): any{
    if (this.currentCustomer.productCodes.includes(300)){
      this.others.getTaxiCustomer(this.currentCustomerId).subscribe(
        res => {
          const customer = res[0];
          this.taxiCustomerId = customer.taxiCustomerId;
          this.taxiFval.taxiCustomerNumberPlate.setValue(customer.taxiCustomerNumberPlate.replace(/\s/g, ''));
          this.taxiFval.taxiCustomerNumberPlate.disable();
          this.taxiFval.drivingPermit.setValue(customer.taxiCustomerDrivingPermitNumber);
          this.taxiFval.taxiMakeorType.setValue(customer.taxiCustomerMakeOrType);
          this.taxiFval.taxiInsuarance.setValue(customer.taxiCustomerInsurance === 1 ?
                                          'NONE' : customer.taxiCustomerInsurance === 2 ?
                                          'REGULAR' : 'COMPREHENSIVE');
          this.taxiFval.dateOfJoiningStage.setValue(new Date(customer.taxiCustomerDateOfJoinStage));
          this.taxiFval.ownershipStatus.setValue(customer.taxiOwnershipStatus === 1 ?
                                          'ONLOAN' : customer.taxiOwnershipStatus === 2 ?
                                          'PAIDOUT' : 'HIREDOUT');
          this.taxiFval.ownersName.setValue(customer.taxiCustomerOwnersName);
          this.taxiFval.ownersPhoneNumber.setValue(customer.taxiCustomerOwnersPhone);
          this.taxiFrontUrl = customer.taxiCustomerFrontPhotoUrl;
          this.taxiSideUrl = customer.taxiCustomerSidePhotoUrl;
          this.taxiRearUrl = customer.taxiCustomerRearPhotoUrl;
          for (const stage of this.taxiStages){
            if (stage.taxiStageId === customer.fkTaxiStageIdTaxiCustomer){
              this.taxiFval.taxiStage.setValue(stage.taxiStageName.toUpperCase());
            }
          }
        },
        err => {
          this.errored = true;
          console.log(err.statusText);
          this.alertService.danger({
              html: '<b>' + err.statusText + '</b>'
            });
        }
      );
    }
    this.showPersonalForm = false;
    this.showTaxiForm = true;
    this.taxiFval.clientName.setValue(this.fval.customer_name.value.toUpperCase());
    this.taxiFval.clientName.disable();
  }
  microForm(): any{
    if (this.currentCustomer.productCodes.includes(400)){
      this.others.getMicroCustomer(this.currentCustomerId).subscribe(
        res => {
          const customer = res[0];
          this.microloanCustomerId = customer.microloanCustomerId;
          this.microFval.loanpurpose.setValue(customer.microloanCustomerLoanPurpose);
          this.microFval.currentBusinesstype.setValue(customer.microloanCustomerCurrentBusinessType);
          this.microFval.businessLocation.setValue(customer.microloanCustomerCurrentBusinessLocation);
          this.microFval.averageDailyExpenses.setValue(customer.microloanCustomerAverageDailyExpenses);
          this.microFval.averageDailyIncome.setValue(customer.microloanCustomerAverageDailyIncome);
          this.microFval.currentResidence.setValue(customer.microloanCustomerCurrentResidence);
          this.microFval.residenceStatus.setValue(customer.microloanCustomerResidenceStatus);
          this.microFval.numberOfDependants.setValue(customer.microloanCustomerNumberOfDependants);
        },
        err => {
          this.errored = true;
          console.log(err.statusText);
          this.alertService.danger({
              html: '<b>' + err.statusText + '</b>'
            });
        }
      );
    }
    this.showPersonalForm = false;
    this.showMicroForm = true;
    this.microFval.clientName.setValue(this.fval.customer_name.value.toUpperCase());
    this.microFval.clientName.disable();
    this.microFval.currentResidence.setValue(this.fval.homeDetails.value.toUpperCase());
    this.microFval.currentResidence.disable();
  }
  savingForm(): any{
    if (this.currentCustomer.productCodes.includes(100)){
      this.others.getSavingsCustomer(this.currentCustomerId).subscribe(
        res => {
          const customer = res[0];
          this.savingsCustomerId = customer.savingsCustomerId;
          this.savFval.monthlyIncome.setValue(customer.savingsCustomerMonthlyIncome);
          this.savFval.withdrawFreequency.setValue(customer.savingsCustomerWithdrawFreequency);
          this.savFval.customerTarget.setValue(customer.savingsCustomerTarget);
        },
        err => {
          this.errored = true;
          console.log(err.statusText);
          this.alertService.danger({
              html: '<b>' + err.statusText + '</b>'
            });
        }
      );
    }
    this.fval.productCode.setValue(' ');
    this.showPersonalForm = false;
    this.showSaveForm = true;
    this.savFval.clientName.setValue(this.fval.customer_name.value.toUpperCase());
    this.savFval.clientName.disable();
  }

  onCustomerNameChange(val: string): any{
    this.customers.forEach(customer => {
      if (customer.customerName.toUpperCase() === val.toUpperCase()) {
          this.currentCustomer = customer;
          this.showAddPdtBtn = this.currentCustomer.productCodes.length >= 20 ? false : true;
          this.currentCustomerId = customer.customerId;
          this.fval.main_contact_number1.setValue(customer.customerPhone1);
          this.fval.main_contact_number2.setValue(customer.customerPhone2);
          this.fval.id_type.setValue(customer.customerIdType);
          this.fval.id_number.setValue(customer.customerIdNumber);
          this.fval.dateOfBirth.setValue(new Date(customer.customerDateOfBirth));
          this.fval.homeDetails.setValue(customer.customerHomeAreaDetails);
          this.fval.clientComment.setValue(customer.customerComment);
          for (const station of this.stations){
            if (station.theStationLocationId === customer.fktheStationLocationIdCustomer){
              this.fval.station.setValue(station.stationName.toUpperCase());
            }
          }
          this.clientPhotoUrl = customer.customerPhotoUrl;
          this.clientIdUrl = customer.customerIdPhotoUrl;
      }
    });
}

  goBack(): any{
    this.showPersonalForm = true;
    this.showBodaForm = false;
    this.showTaxiForm = false;
    this.showMicroForm = false;
    this.showSaveForm = false;
    this.errored = false;
  }
  // toggle visibility of password field
  toggleFieldType(): any {
    this.fieldType = !this.fieldType;
  }

  revert(): any {
    this.userForm.reset();
  }
  refresh(): any {
    // location.reload();
    this.router.navigate(['townmanagement']);
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

  updateCustomerDetails(): any {
    if (this.userForm.valid){
      setTimeout(() =>
      {
          const data  = {
            customerId: this.currentCustomerId,
            customerName: this.fval.customer_name.value.toUpperCase(),
            customerPhone1: this.fval.main_contact_number1.value,
            customerPhone2: this.fval.main_contact_number2.value === '' ?
                            this.fval.main_contact_number1.value :
                            this.fval.main_contact_number2.value,
            customerIdType: this.fval.id_type.value.toUpperCase(),
            customerIdPhotoUrl: this.clientIdUrl,
      customerPhotoUrl: this.clientPhotoUrl,
            customerDateOfBirth: `${this.fval.dateOfBirth.value.getFullYear()}-${this.fval.dateOfBirth.value.getMonth() + 1}-${this.fval.dateOfBirth.value.getDate()}`,
            customerIdNumber: this.fval.id_number.value.toUpperCase(),
            customerHomeAreaDetails: this.fval.homeDetails.value.toUpperCase(),
            customerComment: this.fval.clientComment.value.toUpperCase(),
            theStationLocationId: null,
            userId: this.User.userId,
         };
          for (const station of this.stations){
          if (station.stationName.toUpperCase() === this.fval.station.value.toUpperCase()){
            data.theStationLocationId = station.theStationLocationId;
           }
        }
          if (data.theStationLocationId === null){
           this.errored = true;
           this.alertService.danger({
            html: '<b> The station chosen does not exist!</b>'
           });
          //  this.errored = false;
           return;
         } else if (!this.currentCustomerId){
            this.errored = true;
            this.alertService.danger({
            html: '<b> The customer chosen does not exist!</b>'
            });
         } else {
              // console.log(data);
              this.others.updateCustomer(data).subscribe(
                res => {
                  this.posted = true;
                  this.alertService.success({
                    html: '<b> Customer was updated successfully <b>'
                  });
                  this.revert();
                  this.bodaClientForm.reset();
                  setTimeout(() => {
                    this.router.navigate(['townmanagement']);
                    }, 3000);
                },
                err => {
                  this.errored = true;
                  console.log(err.statusText);
                  this.alertService.danger({
                      html: '<b>' + err.statusText + '</b>'
                    });
                }
              );
        }
      }, 2000);
    } else {
      this.errored = true;
      this.alertService.danger({
       html: '<b> Some fields of the form have invalid values!</b>'
      });
    }
  }

  save(): any{
    if (this.showBodaForm){
      setTimeout(this.bodaCustomer(), 2000);
    }else if (this.showTaxiForm){
      setTimeout(this.taxiCustomer(), 2000);
    } else if (this.showMicroForm) {
      setTimeout(this.microCustomer(), 2000);
    } else if (this.showSaveForm) {
      setTimeout(this.savingsCustomer(), 2000);
    }
  }
  bodaCustomer(): any {
    if (this.bodaClientForm.valid) {
      if (
        this.bodaFval.ownershipStatus.value.toUpperCase() !== 'PAIDOUT'
        && (this.bodaFval.ownersName.value === '' ||
            this.bodaFval.ownersPhoneNumber.value === '')){
            this.errored = true;
            this.alertService.danger({
              html: '<strong>The ownership details are missing!</strong>'
          });
      }
      else {
        let data = {
          bodabodaCustomerNumberPlate: this.bodaFval.bodabodaCustomerNumberPlate.value.toUpperCase().substring( 0, 3 ) +
                                       ' ' + this.bodaFval.bodabodaCustomerNumberPlate.value.toUpperCase().substring(
                                         3, this.bodaFval.bodabodaCustomerNumberPlate.value.toUpperCase().length),
          bodabodaCustomerMakeOrType:  this.bodaFval.bodaMakeorType.value.toUpperCase(),
          bodabodaCustomerInsurance: this.bodaFval.bodaInsuarance.value.toUpperCase() === 'NONE' ?
                                      1 : this.bodaFval.bodaInsuarance.value.toUpperCase() === 'REGULAR' ?
                                      2 : 3,
          bodabodaCustomerDateOfJoinStage: `${this.bodaFval.dateOfJoiningStage.value.getFullYear()}-${this.bodaFval.dateOfJoiningStage.value.getMonth() + 1}-${this.bodaFval.dateOfJoiningStage.value.getDate()}`,
          bodabodaOwnershipStatus: this.bodaFval.ownershipStatus.value.toUpperCase() === 'ONLOAN' ?
                                      1 : this.bodaFval.ownershipStatus.value.toUpperCase() === 'PAIDOUT' ?
                                      2 : 3,
          bodabodaCustomerOwnersName: this.bodaFval.ownersName.value.toUpperCase(),
          bodabodaCustomerOwnersPhone1: this.bodaFval.ownershipStatus.value.toUpperCase() === 'PAIDOUT' ? '' :
                                        this.bodaFval.ownersPhoneNumber.value,
          bodabodaCustomerFrontPhotoUrl: this.bodaFval.ownershipStatus.value.toUpperCase() === 'PAIDOUT' ? '' : this.bodaFrontUrl,
          bodabodaCustomerSidePhotoUrl: this.bodaSideUrl,
          bodabodaCustomerRearPhotoUrl: this.bodaRearUrl,
          customerId: this.currentCustomerId,
          bodabodaStageId: null,
          productCode: 200
        };
        this.bodaStages.forEach(bodaStage => {
          if (bodaStage.bodabodaStageName.toUpperCase() === this.bodaFval.bodaStage.value){
            data.bodabodaStageId = bodaStage.bodabodaStageId;
          }
        });
        // console.log(data);
        if (data.bodabodaStageId  === null) {
          this.errored = true;
          this.alertService.danger({
            html: '<b> Bodaboda stage selected was not found! </b>'
          });
          return;
      } else {
        if (this.currentCustomer.productCodes.includes(200)){
          data = Object.assign({bodabodaCustomerId: this.bodabodaCustomerId}, data);
          this.others.updateBodaCustomer(data).subscribe(
            res => {
              this.posted = true;
              this.alertService.success({
                html: '<b> Customer bodaboda product was updated successfully <b>'
              });
              this.revert();
              this.bodaClientForm.reset();
              setTimeout(() => {
                this.router.navigate(['townmanagement']);
                }, 3000);
            },
            err => {
              this.errored = true;
              console.log(err.statusText);
              this.alertService.danger({
                  html: '<b>' + err.error.error.message + '</b>'
                });
            }
          );
        } else {
          this.others.createBodaCustomer(data).subscribe(
            res => {
              this.posted = true;
              this.alertService.success({
                html: '<b> BodaBoda product was added successfully <b>'
              });
              this.revert();
              this.bodaClientForm.reset();
              setTimeout(() => {
                this.router.navigate(['townmanagement']);
                }, 3000);
            },
            err => {
              this.errored = true;
              console.log(err.statusText);
              this.alertService.danger({
                  html: '<b>' + err.error.error.message + '</b>'
                });
            }
          );
        }
      }
    }
  }
  else {
      this.errored = true;
      this.alertService.danger({
          html: '<strong>Some form fields where not filled!</strong>'
      });
    }
  }
  taxiCustomer(): any {
    if (this.taxiClientForm.valid) {
      if (
        this.taxiFval.ownershipStatus.value.toUpperCase() !== 'PAIDOUT'
        && (this.taxiFval.ownersName.value === '' ||
            this.taxiFval.ownersPhoneNumber.value === '')){
            this.errored = true;
            this.alertService.danger({
              html: '<strong>The ownership details are missing!</strong>'
          });
      }
      else {
        let data = {
          taxiCustomerNumberPlate: this.taxiFval.taxiCustomerNumberPlate.value.toUpperCase().substring( 0, 3 ) +
                                  ' ' + this.taxiFval.taxiCustomerNumberPlate.value.toUpperCase().substring(
                                    3, this.taxiFval.taxiCustomerNumberPlate.value.toUpperCase().length),
          taxiCustomerDrivingPermitNumber: this.taxiFval.drivingPermit.value,
          taxiCustomerMakeOrType:  this.taxiFval.taxiMakeorType.value.toUpperCase(),
          taxiCustomerInsurance: this.taxiFval.taxiInsuarance.value.toUpperCase() === 'NONE' ?
                                      1 : this.taxiFval.taxiInsuarance.value.toUpperCase() === 'REGULAR' ?
                                      2 : 3,
          taxiCustomerDateOfJoinStage: `${this.taxiFval.dateOfJoiningStage.value.getFullYear()}-${this.taxiFval.dateOfJoiningStage.value.getMonth() + 1}-${this.taxiFval.dateOfJoiningStage.value.getDate()}`,
          taxiCustomerOwnershipStatus: this.taxiFval.ownershipStatus.value.toUpperCase() === 'ONLOAN' ?
                                      1 : this.taxiFval.ownershipStatus.value.toUpperCase() === 'PAIDOUT' ?
                                      2 : 3,
          taxiCustomerOwnersName: this.taxiFval.ownershipStatus.value.toUpperCase() === 'PAIDOUT' ? '' :
                                  this.taxiFval.ownersName.value.toUpperCase(),
          taxiCustomerOwnersPhone: this.taxiFval.ownershipStatus.value.toUpperCase() === 'PAIDOUT' ? '' :
                                  this.taxiFval.ownersPhoneNumber.value,
          taxiCustomerFrontPhotoUrl: this.taxiFrontUrl,
          taxiCustomerSidePhotoUrl: this.taxiSideUrl,
          taxiCustomerRearPhotoUrl: this.taxiRearUrl,
          customerId: this.currentCustomerId,
          taxiStageId: null,
          productCode: 300
        };
        this.taxiStages.forEach(taxiStage => {
          if (taxiStage.taxiStageName.toUpperCase() === this.taxiFval.taxiStage.value){
            data.taxiStageId = taxiStage.taxiStageId;
          }
        });
        // console.log(data);
        if (data.taxiStageId === null) {
            this.errored = true;
            this.alertService.danger({
              html: '<b> Taxi stage selected was not found! </b>'
            });
            return;
        } else {
          if (this.currentCustomer.productCodes.includes(300)){
            data = Object.assign({taxiCustomerId: this.taxiCustomerId}, data);
            this.others.updateTaxiCustomer(data).subscribe(
              res => {
                this.posted = true;
                this.alertService.success({
                  html: '<b> Customer taxi fuel product was updated successfully <b>'
                });
                this.revert();
                this.taxiClientForm.reset();
                setTimeout(() => {
                    this.router.navigate(['townmanagement']);
                  }, 3000);
              },
              err => {
                console.log(err.statusText);
                this.alertService.danger({
                    html: '<b>' + err.error.error.message + '</b>'
                  });
              }
            );
          } else {
            this.others.createTaxiCustomer(data).subscribe(
              res => {
                this.posted = true;
                this.alertService.success({
                  html: '<b>Taxi fuel product was added successfully <b>'
                });
                this.revert();
                this.taxiClientForm.reset();
                setTimeout(() => {
                    this.router.navigate(['townmanagement']);
                  }, 3000);
              },
              err => {
                console.log(err.statusText);
                this.alertService.danger({
                    html: '<b>' + err.error.statusText + '</b>'
                  });
              }
            );
          }
        }
      }
    } else {
      this.errored = true;
      this.alertService.danger({
          html: '<strong>Some form fields where not filled!</strong>'
      });
    }
  }
  microCustomer(): any {
    if (this.microClientForm.valid) {
      let data = {
        microloanCustomerLoanPurpose: this.microFval.loanpurpose.value.toUpperCase(),
        microloanCustomerCurrentBusinessType: this.microFval.currentBusinesstype.value.toUpperCase(),
        microloanCustomerCurrentBusinessLocation: this.microFval.businessLocation.value.toUpperCase(),
        microloanCustomerAverageDailyExpenses: this.microFval.averageDailyExpenses.value,
        microloanCustomerAverageDailyIncome: this.microFval.averageDailyIncome.value,
        microloanCustomerCurrentResidence: this.microFval.currentResidence.value.toUpperCase(),
        microloanCustomerResidenceStatus: this.microFval.residenceStatus.value.toUpperCase(),
        microloanCustomerNumberOfDependants: this.microFval.numberOfDependants.value,
        customerId: this.currentCustomerId,
        productCode: 400
      };
      // console.log(data);
      if (this.currentCustomer.productCodes.includes(400)){
        data = Object.assign({microloanCustomerId: this.microloanCustomerId}, data);
        this.others.updateMicroloanCustomer(data).subscribe(
          res => {
            this.posted = true;
            this.alertService.success({
              html: '<b> Customer micro-loan product was updated successfully <b>',
            });
            this.revert();
            this.microClientForm.reset();
            setTimeout(() => {
              this.router.navigate(['townmanagement']);
                }, 3000);
          },
          err => {
            console.log(err.statusText);
            this.alertService.danger({
                  html: '<b>' + err.error.error.message + '</b>'
                });
          }
        );
      } else {
        this.others.createMicroloanCustomer(data).subscribe(
          res => {
            this.posted = true;
            this.alertService.success({
              html: '<b> Micro-loan product was added successfully <b>',
            });
            this.revert();
            this.microClientForm.reset();
            setTimeout(() => {
              this.router.navigate(['townmanagement']);
                }, 3000);
          },
          err => {
            console.log(err.statusText);
            this.alertService.danger({
                  html: '<b>' + err.error.error.message + '</b>'
                });
          }
        );
      }
    } else {
      this.errored = true;
      this.alertService.danger({
          html: '<strong>Some form fields where not filled!</strong>'
      });
    }
  }
  savingsCustomer(): any {
    if (this.savingsClientForm.valid) {
      let data = {
        savingsCustomerMonthlyIncome: this.savFval.monthlyIncome.value,
        savingsCustomerWithdrawFreequency: this.savFval.withdrawFreequency.value.toUpperCase(),
        savingsCustomerTarget: this.savFval.customerTarget.value.toUpperCase(),
        customerId: this.currentCustomerId,
        productCode: 100
      };
      // console.log(data);
      if (this.currentCustomer.productCodes.includes(100)){
        data = Object.assign({savingsCustomerId: this.savingsCustomerId}, data);
        this.others.updateSavingsCustomer(data).subscribe(
          res => {
            this.posted = true;
            this.alertService.success({
              html: '<b> Customer savings product was updated successfully <b>',
            });
            this.revert();
            this.microClientForm.reset();
            setTimeout(() => {
              this.router.navigate(['townmanagement']);
                }, 3000);
          },
          err => {
            console.log(err.statusText);
            this.alertService.danger({
                  html: '<b>' + err.error.error.message + '</b>'
                });
          }
        );
      } else {
        this.others.createSavingsCustomer(data).subscribe(
          res => {
            this.posted = true;
            this.alertService.success({
              html: '<b> Savings product was added successfully <b>',
            });
            this.revert();
            this.microClientForm.reset();
            setTimeout(() => {
              this.router.navigate(['townmanagement']);
                }, 3000);
          },
          err => {
            console.log(err.statusText);
            this.alertService.danger({
                  html: '<b>' + err.error.error.message + '</b>'
                });
          }
        );
      }
    } else {
      this.errored = true;
      this.alertService.danger({
          html: '<strong>Some form fields where not filled!</strong>'
      });
    }
  }
}
