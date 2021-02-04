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
import { OthersService } from 'src/app/shared/services/other-services/others.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss'],
})
export class WithdrawComponent implements OnInit {
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
  customers: any;
  loanType: string;
  amountBorrowed: number;
  canLend = false;
  user = '/../../../assets/img/man.svg';
  checkedClient: any;
  phoneNumbers: Array<string> = [];
  User = this.authService.loggedInUserInfo();
  txns: any;

  constructor(
    private authService: AuthServiceService,
    private others: OthersService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.userForm = this.createFormGroup();
    this.checkedOk = false;
    this.others.getSavingsCustomers().subscribe(
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
              this.alertService.danger({
                html: '<b>There are no Savings customers registered</b>'
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
    this.others.getTxnDetails().subscribe(
        res => {
          this.txns = res;
          // console.log(res);
        },
        err => {
          console.log(err.error.statusText);
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
  checkLoanbility(value: any, template: any): any {
    if (value !== ''){
        let savingsCustomers =  [...this.customers];
        savingsCustomers = savingsCustomers.filter((customer) => customer.customerPhone1 === value);
        this.checkedClient = savingsCustomers[0];
        this.openModal(template);
    }
  }

  revert(): any {
    this.userForm.reset();
  }

  refresh(): any {
    location.reload();
  }
  assignTxnId(familyName: string, typeName: string): number{
    for (const txn of this.txns){
      if (txn.txnDetailsFamilyName.toUpperCase() === familyName && txn.txnDetailsTypeName.toUpperCase() === typeName){
        return txn.txnDetailsId;
      }
    }
  }

  get fval(): any {
    return this.userForm.controls;
  }


  public openModal(template: TemplateRef<any>): any {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-lg modal-dialog-centered' })
    );
  }

  // toggle visibility of password field
  toggleFieldType(): any {
    this.fieldType = !this.fieldType;
  }

  withdraw(): any {
    if (this.userForm.valid){
      if (Number(this.fval.pin.value) === this.checkedClient.customerSecretPin){
        const data = {
          txnAmount: parseInt(this.fval.amount_to_pay.value.replace(/[\D\s\._\-]+/g, ''), 10),
          customerId: this.checkedClient.customerId,
          txnDetailsId: this.assignTxnId('INDIVIDUALSAVING', 'SAVINGWITHDRAWAL'),
          userId: this.User.userId,
          productCode: 100,
          theStationLocationId: this.User.userLocationId
        };
        this.others.putTxnCustomerApproval(data).subscribe(
          res => {
            if (res){
              this.posted = true;
              this.alertService.success({
                html: '<b>Withdraw was initiated successfully, please wait for approval</b>'
              });
              setTimeout(() => {
                this.userForm = this.createFormGroup();
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
      } else {
        this.errored = true;
        this.alertService.danger({
          html: '<b>Secret pin does not match</b>'
        });
      }
    }
  }
}
