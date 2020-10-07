import { Component, OnInit, TemplateRef } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'ngx-alerts';
import { CustomValidator } from 'src/app/validators/custom-validator';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-lend',
  templateUrl: './lend.component.html',
  styleUrls: ['./lend.component.scss']
})

export class LendComponent implements OnInit {
  modalRef: BsModalRef;
  userForm: FormGroup;
  posted = false;
  actionButton: string;
  shiftDetails: any;
  errored: boolean;
  serviceErrors: string;
  status: boolean;
  checkedOk: boolean;
  fieldType: boolean;
  station: string;
  theCompany: string;
  closingBal: string;
  numberPlates: Array<string>;
  phoneNumbers: [];
  loanDetails: any;
  loanType: string;
  secretPin: number;
  loanLimit: number;
  amountDue: number;
  txnId: number;
  numberValue: number;
  values: any;
  user = '/../../../assets/img/man.svg';
  clientName: string;

  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.getTheNumberPlates();
    this.userForm = this.createFormGroup();
    this.checkedOk = false;
    console.log(this.numberPlates);
  }

  createFormGroup(): any {
    return new FormGroup({
      loanType: new FormControl(['',
        Validators.required]),
      number_plate: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8)
        ])
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
      amount_to_borrow: new FormControl(
        { value: '', disabled: true },
        Validators.compose([
          Validators.required,
          CustomValidator.patternValidator(/\d/, { hasNumber: true }),
          Validators.maxLength(6),
          Validators.minLength(3)
        ])
      ),
      pin: new FormControl(
        { value: '', disabled: true },
        Validators.compose([
          Validators.required,
          CustomValidator.patternValidator(/\d/, { hasNumber: true }),
          Validators.maxLength(4),
          Validators.minLength(4)
        ])
      )
    });
  }
  checkLoanType(value: string): any{
    // console.log(value);
    this.loanType = value;
  }
  revert(): any {
    this.userForm.reset();
  }

  refresh(): any {
    location.reload();
  }

  get fval(): any {
    return this.userForm.controls;
  }
  onKey(event: any): any {
    // without type info
    this.values = event.target.value.replace(/[\D\s\._\-]+/g, '');

    this.numberValue = this.values ? parseInt(this.values, 10) : 0;

    // tslint:disable-next-line:no-unused-expression
    this.values =
      this.numberValue === 0 ? '' : this.numberValue.toLocaleString('en-US');

    this.userForm.controls.amount_to_borrow.setValue(this.values);
  }

  public openModal(template: TemplateRef<any>): any {
    this.modalRef = this.modalService.show(
      template,
      Object.assign(
        {},
      { class: 'modal-lg modal-dialog-centered' }));

  }

  getTheNumberPlates(): any {
    this.numberPlates = [
      'UAB4566',
      'UAB4555',
      'UAB4564',
      'UAB4345',
      'UAB4999',
      'UAB4577',
      'UAB4334',
      'UAB4098',
      'UAB4453',
      'UAB4123'
    ];
    // this.pumpService.theNumberPlates(this.station).subscribe(
    //   data => {
    //     this.numberPlates = data;
    //   },

    //   (error: string) => {
    //     this.errored = true;
    //     this.serviceErrors = error;
    //     this.alertService.danger({
    //       html: '<b>' + this.serviceErrors + '</b>' + '<br/>'
    //     });
    //   }
    // );
  }

  checkLoanbility(): any {
    // this.pumpService
    //   .checkWhetherTheCLoanable(this.userForm.controls.number_plate.value)
    //   .subscribe(
    //     data => {
    //       this.loanDetails = data[0];
    //       // console.log(this.loanDetails);
    //       this.checkedOk = true;
    //       this.secretPin = this.loanDetails.secret_pin;
    //       this.loanLimit = this.loanDetails.petrol_station_loan_limit;
    //       this.userForm.controls.number_plate.disable();
    //       this.userForm.controls.amount_to_borrow.enable();
    //       this.userForm.controls.pin.enable();
    //     },

    //     (error: string) => {
    //       this.errored = true;
    //       this.serviceErrors = error;
    //       this.alertService.danger({
    //         html: '<b>' + this.serviceErrors + '</b>' + '<br/>'
    //       });
    //     }
    //   );
  }



  lend(): any {

    this.userForm.patchValue({
      amount_to_borrow: parseInt( this.userForm.controls.amount_to_borrow.value.replace(/[\D\s\._\-]+/g, ''), 10 )
    });

    // tslint:disable-next-line:triple-equals
    if (!(this.secretPin == this.userForm.controls.pin.value)) {
      this.alertService.danger({
        html: '<b>Invalid PIN!</b>'
      });
      return;
    } else {
      if (this.userForm.controls.amount_to_borrow.value > this.loanLimit) {
        this.alertService.warning({
          html: '<b>Loan Limit Exceeded!</b>' + '<br/>'
        });
        return;
      } else {
        this.userForm.controls.number_plate.enable();
        this.userForm.patchValue({
          user_station: jwt_decode(this.authService.getJwtToken()).user_station,
          user_id: jwt_decode(this.authService.getJwtToken()).user_id
        });
        // console.log(this.userForm.value);
        this.posted = true;
        this.spinner.show();

      }
    }
  }
}
