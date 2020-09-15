import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'ngx-alerts';
import { CustomValidator } from 'src/app/validators/custom-validator';
// import { BsModalService } from 'ngx-bootstrap/modal';
// import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

export interface approvals {
  areaCreation: number;
  townCreation: number;
  stationCreation: number;
  clusterCreation: number;
  stageCreation: number;
  userCreation: number
}

@Component({
  selector: 'app-approval-setup',
  templateUrl: './approval-setup.component.html',
  styleUrls: ['./approval-setup.component.scss']
})
export class ApprovalSetupComponent implements OnInit {
  userForm: FormGroup;
  posted = false;
  actionButton: string;
  errored: boolean;
  serviceErrors: string;
  status: boolean;
  checkedOk: boolean;
  station: string;
  theCompany: string;
  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.station = jwt_decode(this.authService.getJwtToken()).user_station_name;
    this.theCompany = jwt_decode(
      this.authService.getJwtToken()
    ).user_station_company;
    this.userForm = this.createFormGroup();
    this.checkedOk = false;
  }

  createFormGroup() {
    return new FormGroup({
      item_to_create: new FormControl(
        '',
        Validators.compose([
          Validators.required
        ])
      ),

      item_created: new FormControl('',
         Validators.compose([
          Validators.required        ])
      ),
      level: new FormControl('',
         Validators.compose([
          Validators.required        ])
      )
    });
  }

  revert() {
    this.userForm.reset();
  }

  refresh() {
    location.reload();
  }
  revertPetrol() {
    this.userForm.controls.petrol_station.reset();
  }


  get fval() {
    return this.userForm.controls;
  }
  // onKey(event: any) {
  //   // without type info
  //   this.values = event.target.value.replace(/[\D\s\._\-]+/g, '');

  //   this.numberValue = this.values ? parseInt(this.values, 10) : 0;

  //   // tslint:disable-next-line:no-unused-expression
  //   this.values =
  //     this.numberValue === 0 ? '' : this.numberValue.toLocaleString('en-US');

  //   this.userForm.controls.amount_to_borrow.setValue(this.values);
  // }
  // openModal() {
  //   this.modalRef = this.modalServiceb.show(LendDialogComponent, {
  //     initialState: {
  //       title: 'Give Credit',
  //       data: {
  //         number_plate: this.userForm.controls.number_plate.value,
  //         amount_to_borrow: this.userForm.controls.amount_to_borrow.value,
  //         amount_due: this.amountDue,
  //         txn_id: this.txnId
  //       }
  //     }
  //   });
  // }

  // getTheNumberPlates() {
  //   this.pumpService.theNumberPlates(this.station).subscribe(
  //     data => {
  //       this.numberPlates = data;
  //     },

  //     (error: string) => {
  //       this.errored = true;
  //       this.serviceErrors = error;
  //       this.alertService.danger({
  //         html: '<b>' + this.serviceErrors + '</b>' + '<br/>'
  //       });
  //     }
  //   );
  // }

  // checkLoanbility() {
  //   this.pumpService
  //     .checkWhetherTheCLoanable(this.userForm.controls.number_plate.value)
  //     .subscribe(
  //       data => {
  //         this.loanDetails = data[0];
  //         // console.log(this.loanDetails);
  //         this.checkedOk = true;
  //         this.secretPin = this.loanDetails.secret_pin;
  //         this.loanLimit = this.loanDetails.petrol_station_loan_limit;
  //         this.userForm.controls.number_plate.disable();
  //         this.userForm.controls.amount_to_borrow.enable();
  //         this.userForm.controls.pin.enable();
  //       },

  //       (error: string) => {
  //         this.errored = true;
  //         this.serviceErrors = error;
  //         this.alertService.danger({
  //           html: '<b>' + this.serviceErrors + '</b>' + '<br/>'
  //         });
  //       }
  //     );
  // }



  createOrApprove() {

    // this.userForm.patchValue({
    //   amount_to_borrow: parseInt( this.userForm.controls.amount_to_borrow.value.replace(/[\D\s\._\-]+/g, ''), 10 )
    // });

    // // tslint:disable-next-line:triple-equals
    // if (!(this.secretPin == this.userForm.controls.pin.value)) {
    //   this.alertService.danger({
    //     html: '<b>Invalid PIN</b>'
    //   });
    //   return;
    // } else {
    //   if (this.userForm.controls.amount_to_borrow.value > this.loanLimit) {
    //     this.alertService.warning({
    //       html: '<b>Loan Limit Exceeded!!</b>' + '<br/>'
    //     });
    //     return;
    //   } else {
    //     this.userForm.controls.number_plate.enable();
    //     this.userForm.patchValue({
    //       user_station: jwt_decode(this.authService.getJwtToken()).user_station,
    //       user_id: jwt_decode(this.authService.getJwtToken()).user_id
    //     });
    //     // console.log(this.userForm.value);
    //     this.posted = true;
        this.spinner.show();
        // this.pumpService.createLoan(this.userForm).subscribe(
        //   result => {
        //     this.amountDue = result[0].amount_due;
        //     this.txnId = result[0].txn_id;
        //     this.spinner.hide();
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

