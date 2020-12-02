import { Component, OnInit, TemplateRef } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'ngx-alerts';
import { CustomValidator } from 'src/app/validators/custom-validator';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-write-off',
  templateUrl: './write-off.component.html',
  styleUrls: ['./write-off.component.scss'],
})
export class WriteOffComponent implements OnInit {
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
  numberPlates: [];
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
  checkedClient: {
    name: string;
    photoUrl: string;
    phone: any;
    plate: any;
    loanAmount: number;
    loanLimit: number;
    loanPaid: number;
    loanBalance: number;
    loanStatus: string;
    comment: string;
  };

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
  }

  createFormGroup(): any {
    return new FormGroup({
      loanType: new FormControl(['', Validators.required]),
      number_plate: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8),
        ])
      ),
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
      amount: new FormControl(
        { value: '', disabled: true },
        Validators.compose([
          Validators.required,
          CustomValidator.patternValidator(/\d/, { hasNumber: true }),
          Validators.maxLength(6),
          Validators.minLength(3),
        ])
      ),
      pin: new FormControl(
        { value: '', disabled: true },
        Validators.compose([
          Validators.required,
          CustomValidator.patternValidator(/\d/, { hasNumber: true }),
          Validators.maxLength(4),
          Validators.minLength(4),
        ])
      ),
    });
  }
  checkLoanType(value: string): any {
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

    this.userForm.controls.amount_to_pay.setValue(this.values);
  }

  public openModal(template: TemplateRef<any>): any {
    //  FIRST SEARCH THE CLIENT DETAILS USING THE PASSED IN USERID A
    // ND ASSIGN IT TO THE CHECKED CLIENT
    console.log(this.fval.number_plate.value);
    this.checkedClient = {
      name: 'Mukwaya',
      photoUrl: this.user,
      phone: '0788883887',
      plate: 'UAB456Z',
      loanAmount: 50000,
      loanLimit: 58000,
      loanPaid: 7000,
      loanBalance: 4500,
      loanStatus: 'RUNNING',
      comment: 'User promised to pay',
    };
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-lg modal-dialog-centered' })
    );
  }

  getTheNumberPlates(): any {
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

  // toggle visibility of password field
  toggleFieldType(): any {
    this.fieldType = !this.fieldType;
  }

  writeOff(): any {
    this.userForm.patchValue({
      amount_to_pay: parseInt(
        this.userForm.controls.amount_to_pay.value.replace(/[\D\s\._\-]+/g, ''),
        10
      ),
    });

    // tslint:disable-next-line:triple-equals
    if (!(this.secretPin == this.userForm.controls.pin.value)) {
      this.alertService.danger({
        html: '<b>Invalid PIN!</b>',
      });
      return;
    } else {
      if (this.userForm.controls.amount_to_pay.value > this.loanLimit) {
        this.alertService.warning({
          html: '<b>Loan Limit Exceeded!</b>' + '<br/>',
        });
        return;
      } else {
        this.userForm.controls.number_plate.enable();
        this.userForm.patchValue({
          user_station: jwt_decode(this.authService.getJwtToken()).user_station,
          user_id: jwt_decode(this.authService.getJwtToken()).user_id,
        });
        // console.log(this.userForm.value);
        this.posted = true;
        this.spinner.show();
        // this.pumpService.createLoan(this.userForm).subscribe(
        //   result => {
        //     this.amountDue = result[0].amount_due;
        //     this.txnId = result[0].txn_id;
        //     this.spinner.hide();
        //     this.openModal();
        //     this.router.navigate(['dashboardpump/shiftmanagement']);
        //     setTimeout(() => {
        //       location.reload();
        //     }, 3000);
        //   },

        //   (error: string) => {
        //     this.spinner.hide();
        //     this.errored = true;
        //     this.serviceErrors = error;
        //     this.alertService.danger({
        //       html: '<b>' + this.serviceErrors + '</b>' + '<br/>'
        //     });
        //   }
        // );
      }
    }
  }
}
