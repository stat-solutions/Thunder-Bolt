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
  selector: 'app-get-loan',
  templateUrl: './get-loan.component.html',
  styleUrls: ['./get-loan.component.scss']
})
export class GetLoanComponent implements OnInit {
  registered = false;
  submitted = false;
  errored = false;
  posted = false;
  showFinalBtn = false;
  showcompleteBtn = true;
  userForm: FormGroup;
  garantorsForm: FormGroup;
  securityForm: FormGroup;
  state: string;
  header: string;
  showUserForm = true;
  showGarantorForm = false;
  showSecurityForm = false;
  nextGarantorForm = false;
  nextSecurityForm = false;
  serviceErrors: any = {};
  value: string;
  fieldType: boolean;
  User = this.authService.loggedInUserInfo();
  guarantors = [];
  securities = [];
  data = [];
  txns: any;
  phoneNumbers: Array<string> = [];
  garantorsPhotoUrl: string;
  securityPhotoUrl: string;
  securityTypes: any;
  customers: any;
  checkedClient: any;
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
    this.header = 'Get Loan';
    this.userForm = this.createFormGroup();
    this.garantorsForm = this.garantorsFormGroup();
    this.securityForm = this.securityFormGroup();
    this.others.getSecurityType().subscribe(
      res => {
        this.securityTypes = res;
      },
      err => {
        this.errored = true;
        this.alertService.danger({
          html: '<b>' + err.error.error.message + '</b>'
        });
      }
    );
    this.others.getTxnDetails().subscribe(
      res => {
        this.txns = res;
        // console.log(res);
      },
      err => {
        this.errored = true;
        this.alertService.danger({
          html: '<b>' + err.error.error.message + '</b>'
        });
      }
    );
    this.others.getMicroCustomers().subscribe(
      res => {
        if (res.length > 0){
          this.customers = res;
          this.phoneNumbers = [];
          this.checkedClient = {};
          this.customers.forEach((customer) => {
            this.phoneNumbers.push(customer.customerPhone1);
          });
        } else {
          this.errored = true;
          this.showUserForm = false;
          this.showGarantorForm = false;
          this.showSecurityForm = false;
          this.alertService.danger({
            html: '<b>There are no Micro Loan customers registered</b>'
          });
        }
      },
      err => {
        this.errored = true;
        console.log(err);
        this.alertService.danger({
          html: '<b>' + err.error.error.message + '</b>'
        });
      }
  );
  }
  createFormGroup(): any {
    return new FormGroup({
      user_contact_number: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          CustomValidator.patternValidator(
            /^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/,
            { hasNumber: true }
          ),
        ])
      ),
      loanpurpose: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      amount_to_pay: new FormControl(
        { value: '', disabled: false },
        Validators.compose([
          Validators.required,
          CustomValidator.patternValidator(/\d/, { hasNumber: true }),
          Validators.maxLength(6),
          Validators.minLength(3),
        ])
      ),
      pin: new FormControl(
        { value: '', disabled: false },
        Validators.compose([
          Validators.required,
          CustomValidator.patternValidator(/\d/, { hasNumber: true }),
          Validators.maxLength(4),
          Validators.minLength(4),
        ])
      ),
    });
  }
  garantorsFormGroup(): any {
    return new FormGroup({
      name: new FormControl(
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
          CustomValidator.patternValidator(
            /^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/,
            { hasNumber: true }
          ),
        ])
      ),
      url: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      currentResidence: new FormControl(
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
      )
    });
  }
  securityFormGroup(): any {
    return new FormGroup({
      type: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      name: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      location: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      url: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
    });
  }

  refresh(): any {
    location.reload();
  }

  checkLoanbility(value: any): any {
    if (value !== ''){
        let microCustomers =  [...this.customers];
        microCustomers = microCustomers.filter((customer) => customer.customerPhone1 === value);
        if (microCustomers.length === 1){
          this.checkedClient = microCustomers[0];
        } else {
          this.errored = true;
          this.alertService.danger({
            html: '<b> client does not exist</b>'
          });
          this.fval.user_contact_number.setValue('');
        }
        // this.openModal(template);
    }
  }
  onFileSelected(event): any {
    // console.log(event.target.id);
    let folder: string;
    switch (event.target.id) {
      case 'guarantorUrl':
        folder = 'clientImages/microLoan/guarantors';
        this.upload(event.target.id, event.target.files[0], folder);
        break;
      case 'securityUrl':
        folder = 'clientImages/microLoan/securities';
        this.upload(event.target.id, event.target.files[0], folder);
        break;
    }
  }
  upload(inputType: string, getfile: any, path: any): any {
    const n = Date.now();
    const file = getfile;
    const filePath = `${path}/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    const result = task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          const downloadURL = fileRef.getDownloadURL();
          downloadURL.subscribe(url => {
            if (url) {
              switch (inputType) {
                case 'guarantorUrl':
                  this.garantorsPhotoUrl = url;
                  // console.log(this.garantorsPhotoUrl);
                  break;
                case 'securityUrl':
                  this.securityPhotoUrl = url;
                  // console.log(this.securityPhotoUrl);
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

  goBack(): any{
    this.fval.productCode.setValue(this.fval.productCode.value);
    this.showFinalBtn = false;
    this.showcompleteBtn = true;
    this.errored = false;
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
  get garantorFval(): any {
    return this.garantorsForm.controls;
  }
  get securityFval(): any {
    return this.securityForm.controls;
  }

  assignTxnId(familyName: string, typeName: string): number{
    for (const txn of this.txns){
      if (txn.txnDetailsFamilyName.toUpperCase() === familyName && txn.txnDetailsTypeName.toUpperCase() === typeName){
        return txn.txnDetailsId;
      }
    }
  }

  getSecurityTypeCode(typeName: string): number{
    for (const item of this.securityTypes){
      if (item.securityTypeName === typeName){
        return item.securityTypeCode;
      }
    }
  }

  saveAndNew(): any{
    if (this.showUserForm){
      if (Number(this.fval.pin.value) === this.checkedClient.customerSecretPin){
        const txn = {
          txnAmount:  parseInt(this.fval.amount_to_pay.value.replace(/[\D\s\._\-]+/g, ''), 10),
                customerId: this.checkedClient.customerId,
                txnDetailsId: this.assignTxnId('MICROLOAN', 'LOANDISBURSEMENT'),
                userId: this.User.userId,
                productCode: 400,
                microLoanPurpose: this.fval.loanpurpose.value.toUpperCase(),
                theStationLocationId: this.User.userLocationId
        };
        if (txn.txnDetailsId){
          this.data.push(txn);
          // console.log(this.data);
          this.posted = true;
          this.alertService.success({
            html: '<b> Saved successfully</b>'
          });
          this.showUserForm = false;
          this.showGarantorForm =  true;
        } else {
          return;
        }
      } else {
        this.errored = true;
        this.alertService.danger({
          html: '<b>Secret pin does not much</b>'
        });
      }
    } else if (this.showGarantorForm){
      setTimeout(() => {
        this.guarantors.push({
          microLoanGuarantorName: this.garantorFval.name.value.toUpperCase(),
          microLoanGuarantorPhone1: this.garantorFval.main_contact_number1.value.toUpperCase(),
          microLoanGuarantorPhone2: this.garantorFval.main_contact_number2.value === '' ? this.garantorFval.main_contact_number1.value :
                                   this.garantorFval.main_contact_number2.value,
          microLoanGuarantorPlaceOfResidense: this.garantorFval.currentResidence.value.toUpperCase(),
          microLoanGuarantorTypeOfBusiness: this.garantorFval.currentBusinesstype.value.toUpperCase(),
          microLoanGuarantorBusinessLocation: this.garantorFval.businessLocation.value.toUpperCase(),
          microLoanGuarantorPhotoUrl: this.garantorsPhotoUrl
        });
        // console.log(this.guarantors);
        this.posted = true;
        this.alertService.success({
          html: '<b> Saved successfully</b>'
        });
        this.garantorsForm = this.garantorsFormGroup();
      }, 1000);
    } else if (this.showSecurityForm){
      setTimeout(() => {
        const security = {
          securityTypeCode: this.getSecurityTypeCode(this.securityFval.type.value.toUpperCase()),
          microLoanSecurityName: this.securityFval.name.value.toUpperCase(),
          microLoanSecurityLocation: this.securityFval.location.value.toUpperCase(),
          microLoanSecurityPhotoUrl: this.securityPhotoUrl
        };
        if (security.securityTypeCode){
          this.securities.push(security);
          // console.log(this.securities);
          this.posted = true;
          this.alertService.success({
            html: '<b> Saved successfully</b>'
          });
          this.securityForm = this.securityFormGroup();
        } else {
          this.errored = true;
          this.alertService.danger({
            html: '<b> The security Type chosen does not exist</b>'
          });
        }
      }, 3000);
    }
  }
  saveAndNext(): any{
    if (this.showGarantorForm){
      setTimeout(() => {
        this.guarantors.push({
          microLoanGuarantorName: this.garantorFval.name.value.toUpperCase(),
          microLoanGuarantorPhone1: this.garantorFval.main_contact_number1.value.toUpperCase(),
          microLoanGuarantorPhone2: this.garantorFval.main_contact_number2.value === '' ? this.garantorFval.main_contact_number1.value :
                                   this.garantorFval.main_contact_number2.value,
          microLoanGuarantorPlaceOfResidense: this.garantorFval.currentResidence.value.toUpperCase(),
          microLoanGuarantorTypeOfBusiness: this.garantorFval.currentBusinesstype.value.toUpperCase(),
          microLoanGuarantorBusinessLocation: this.garantorFval.businessLocation.value.toUpperCase(),
          microLoanGuarantorPhotoUrl: this.garantorsPhotoUrl
        });
        // console.log(this.guarantors);
        this.posted = true;
        this.alertService.success({
          html: '<b> Saved successfully</b>'
        });
        this.showGarantorForm = false;
        this.showSecurityForm = true;
      }, 1000);
    } else if (this.showSecurityForm){
      setTimeout(() => {
        const security = {
          securityTypeCode: this.getSecurityTypeCode(this.securityFval.type.value.toUpperCase()),
          microLoanSecurityName: this.securityFval.name.value.toUpperCase(),
          microLoanSecurityLocation: this.securityFval.location.value.toUpperCase(),
          microLoanSecurityPhotoUrl: this.securityPhotoUrl
        };
        if (security.securityTypeCode){
          this.securities.push(security);
          // console.log(this.securities);
          this.postLoan();
        } else {
          this.errored = true;
          this.alertService.danger({
            html: '<b> The security Type chosen does not exist</b>'
          });
        }
      }, 3000);
    }
  }
  skip(): any{
    if (this.showGarantorForm){
        this.showGarantorForm = false;
        this.showSecurityForm = true;
    } else if (this.showSecurityForm){
      this.postLoan();
    }
  }
  postLoan(): any {
    this.data.push([this.guarantors, this.securities]);
    // console.log(this.data);
    this.others.createMicroLoan(this.data).subscribe(
          res => {
            if (res){
              this.posted = true;
              this.alertService.success({
                html: '<b> Loan was initiated successfully, wait for approval and confirm</b>'
              });
              setTimeout(() => {
                this.router.navigate(['/townmanagement/microloan/confirm']);
              }, 3000);
            }
          },
          err => {
            this.errored = true;
            if (err.error.error.status === 500) {
              this.alertService.danger({
                html: '<b> Sever Could Not handle this request</b>'
              });
            } else {
              this.alertService.danger({
                html: '<b>' + err.error.error.message + '</b>'
              });
            }
          }
        );
      }
    }
