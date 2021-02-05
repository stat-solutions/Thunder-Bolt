import { Component, OnInit, TemplateRef,  ElementRef } from '@angular/core';
// import * as jwt_decode from 'jwt-decode';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'ngx-alerts';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { OthersService } from 'src/app/shared/services/other-services/others.service';
@Component({
  selector: 'app-verify-client',
  templateUrl: './verify-client.component.html',
  styleUrls: ['./verify-client.component.scss'],
})
export class VerifyClientComponent implements OnInit {
  public modalRef: BsModalRef;
  userForm: FormGroup;
  customers = [];
  posted = false;
  actionButton: string;
  errored: boolean;
  serviceErrors: string;
  status: boolean;
  checkedOk: boolean;
  showCustomers = false;
  User = this.authService.loggedInUserInfo();
  currentCustomer: string;
  stations: any;
  imageUrl: string;
  data: any;
  bodaStages: any;
  taxiStages: any;
  constructor(
    private modalService: BsModalService,
    private others: OthersService,
    private authService: AuthServiceService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.errored = false;
    this.posted = false;
    this.userForm = this.createFormGroup();
    this.fval.selectAll.setValue(false);
    // this.User.userLocationId
    this.others.getAllTheStationLocationsByArea(this.User.userLocationId).subscribe(
      res => {
        this.stations = res;
        this.getBodaCustomers();
      },
      err => {
        this.errored = true;
        this.alertService.danger({
          html: '<b>' + err.error.statusText + '</b>'
        });
      }
    );
    this.others.getBodaStages().subscribe(
      res => {
        this.bodaStages = res;
        this.bodaStages = this.bodaStages.filter(bodaStage => bodaStage.bodabodaStageName != null);
      },
      err =>  {
        this.errored = true;
        this.alertService.danger({
          html: '<b>' + err.error.statusText + '</b>'
        });
      }
    );
    this.others.getTaxiStages().subscribe(
      res => {
        this.taxiStages = res;
        this.taxiStages = this.taxiStages.filter(taxiStage => taxiStage.taxiStageName != null);
      },
      err =>  {
        this.errored = true;
        this.alertService.danger({
          html: '<b>' + err.error.statusText + '</b>'
        });
      }
    );
  }
  createFormGroup(): any {
    return this.fb.group({
      customers: this.fb.array([this.customer]),
      selectAll: this.fb.control({}),
    });
  }
  get customer(): any {
    return this.fb.group({
      customerId: this.fb.control({ value: '' }),
      customerName: this.fb.control({ value: '' }),
      station: this.fb.control({ value: '' }),
      customerPhone1: this.fb.control({ value: '' }),
      customerPhotoUrl: this.fb.control({ value: '' }),
      approved: this.fb.control({}),
    });
  }
  getBodaCustomers(): any{
    this.errored = false;
    this.posted = false;
    // this.User.userLoactionId
    this.others.getAreaBodaBodaCustomerToApprove(this.User.userLocationId).subscribe(
      res => {
        // console.log(res);
        this.customers = res;
        this.userForm = this.createFormGroup();
        this.fval.selectAll.setValue(false);
        this.initialiseForm(this.customers);
        this.currentCustomer =  'Boda Fuel';
      },
      err =>  {
        this.errored = true;
        this.alertService.danger({
          html: '<b>' + err.error.statusText + '</b>'
        });
      }
    );
  }
  getTaxiCustomers(): any{
    this.errored = false;
    this.posted = false;
   // this.User.userLoactionId
    this.others.getAreaTaxiCustomerToApprove(this.User.userLocationId).subscribe(
      res => {
        // console.log(res);
        this.customers = res;
        this.userForm = this.createFormGroup();
        this.fval.selectAll.setValue(false);
        this.initialiseForm(this.customers);
        this.currentCustomer =  'Taxi Fuel';
      },
      err =>  {
        this.errored = true;
        this.alertService.danger({
          html: '<b>' + err.error.statusText + '</b>'
        });
      }
    );
  }
  getMicroCustomers(): any{
    this.errored = false;
    this.posted = false;
   // this.User.userLoactionId
    this.others.getAreaMicroCustomerToApprove(this.User.userLocationId).subscribe(
      res => {
        // console.log(res);
        this.customers = res;
        this.userForm = this.createFormGroup();
        this.fval.selectAll.setValue(false);
        this.initialiseForm(this.customers);
        this.currentCustomer =  'Micro Loan';
        this.showCustomers = true;
      },
      err => {
        this.errored = true;
        this.alertService.danger({
          html: '<b>' + err.error.statusText + '</b>'
        });
      }
    );
  }
  getSavingsCustomers(): any{
    this.errored = false;
    this.posted = false;
    // this.User.userLoactionId
    this.others.getAreaSavingsCustomerToApprove(this.User.userLocationId).subscribe(
      res => {
        // console.log(res);
        this.customers = res;
        this.userForm = this.createFormGroup();
        this.fval.selectAll.setValue(false);
        this.initialiseForm(this.customers);
        this.currentCustomer =  'Savings';
      },
      err =>  {
        this.errored = true;
        this.alertService.danger({
          html: '<b>' + err.error.statusText + '</b>'
        });
      }
    );
  }

  addItem(): any {
    // this.unitForm.controls.bussinessUnits  as FormArray
    (this.fval.customers as FormArray).push(this.customer);
  }

  removeItem(index: number): any {
    (this.fval.customers as FormArray).removeAt(index);
  }
  initialiseForm(customers: any): any {
    let n: number;
    customers.forEach((item, i) => {
      this.fval.customers.controls[i].controls.customerId.setValue(item.customerId);
      this.fval.customers.controls[i].controls.customerName.setValue(item.customerName);
      this.fval.customers.controls[i].controls.customerPhotoUrl.setValue(item.customerPhotoUrl);
      this.fval.customers.controls[i].controls.customerPhone1.setValue(item.customerPhone1);
      for (const station of this.stations){
        if (station.theStationLocationId === item.fktheStationLocationIdCustomer){
          this.fval.customers.controls[i].controls.station.setValue(station.stationName.toUpperCase());
         }
      }
      this.fval.customers.controls[i].controls.approved.setValue(false);
      this.addItem();
      n = i + 1;
    });
    this.removeItem(n);
  }

// modal method
   public openModal2(template: TemplateRef<any>, imageUrl: string): any {
    this.imageUrl = imageUrl;
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'white modal-lg modal-dialog-center' })
    );
  }
   public openModal(template: TemplateRef<any>, customerId: number): any {
      // console.log(customerId);
      this.customers.forEach(customer => {
        if (customer.customerId === customerId){
          this.data = customer;
          let date = new Date(customer.customerDateOfBirth);
          this.data.customerDateOfBirth = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

          if (this.currentCustomer === 'BodaBoda Fuel'){
            date = new Date(customer.bodabodaCustomerDateOfJoinStage);
            this.data.bodabodaCustomerDateOfJoinStage = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            this.bodaStages.forEach(bodaStage => {
              if (bodaStage.bodabodaStageId === customer.fkBodabodaStageIdBodabodaCustomer){
                this.data.fkBodabodaStageIdBodabodaCustomer = bodaStage.bodabodaStageName.toUpperCase();
              }
            });
            this.data.bodabodaOwnershipStatus = customer.bodabodaOwnershipStatus === 1 ?
                                                'ONLOAN' : customer.bodabodaOwnershipStatus === 2 ?
                                                'PAIDOUT' : 'HIREDOUT';
            this.data.bodabodaCustomerInsurance = customer.bodabodaCustomerInsurance === 1 ?
                                                'NONE' : customer.bodabodaCustomerInsurance === 2 ?
                                                'REGULAR' : 'COMPREHENSIVE';

          } else if (this.currentCustomer === 'Taxi Fuel') {
            date = new Date(customer.taxiCustomerDateOfJoinStage);
            this.data.taxiCustomerDateOfJoinStage = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            this.taxiStages.forEach(taxiStage => {
              if (taxiStage.taxiStageId === customer.fkTaxiStageIdTaxiCustomer){
                this.data.fkTaxiStageIdTaxiCustomer = taxiStage.taxiStageName.toUpperCase();
              }
            });
            this.data.taxiCustomerOwnershipStatus = customer.taxiCustomerOwnershipStatus === 1 ?
                                                'ONLOAN' : customer.taxiCustomerOwnershipStatus === 2 ?
                                                'PAIDOUT' : 'HIREDOUT';
            this.data.taxiCustomerInsurance = customer.taxiCustomerInsurance === 1 ?
                                                'NONE' : customer.taxiCustomerInsurance === 2 ?
                                                'REGULAR' : 'COMPREHENSIVE';
          } else if (this.currentCustomer === 'Micro Loan') {

          } else if (this.currentCustomer === 'Savings') {

          }
        }
      });
      // console.log(this.data);
      this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'white modal-dialog-center' })
    );
  }


  checkAllItems(val: boolean): any {
    if (val === true) {
      this.customers.forEach((item, i) => {
        this.fval.customers.controls[i].controls.approved.setValue(
          val
        );
      });
    } else {
      this.customers.forEach((item, i) => {
        this.fval.customers.controls[i].controls.approved.setValue(
          false
        );
      });
    }
  }
  deselectAll(val: number): any {
    // console.log(this.fval.approveAreas["controls"][val]["controls"].approved.value)
    if (
      this.fval.customers.controls[val].controls.approved.value ===
      true
    ) {
      this.fval.selectAll.setValue(false);
    }
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

  disableForm(): any {
    return this.userForm.disable();
  }

  enableEdit(): any {
    return this.userForm.enable();
  }

  approveItems(): any {
    this.errored = false;
    this.posted = false;
    let itemsApproved = [];
    if (this.currentCustomer === 'BodaBoda Fuel'){
      this.customers.forEach((customer, i) => {
        if (this.fval.customers.controls[i].controls.approved.value === true) {
          itemsApproved.push({
            bodabodaCustomerId: customer.bodabodaCustomerId,
            bodabodaCustomerStatus: 2
          });
        }
      });
      // console.log(itemsApproved.length);
      if (itemsApproved.length > 0) {
        // console.log(itemsApproved);
        this.others.putVerifyBodaBodaCustomer(itemsApproved).subscribe(
          res => {
            this.posted = true;
            this.alertService.success({
              html: '<b> verification was successful </b>'
            });
            setTimeout(() => {
              itemsApproved = [];
              this.getBodaCustomers();
            }, 3000);
          },
          err =>  {
            this.errored = true;
            this.alertService.danger({
              html: '<b>' + err.error.statusText + '</b>'
            });
          }
        );
      } else {
        this.errored = true;
        this.alertService.danger({
              html: '<b> Please select a customer first </b>'
            });
        return;
      }
    }
    else if (this.currentCustomer === 'Taxi Fuel') {
      this.customers.forEach((customer, i) => {
        if (this.fval.customers.controls[i].controls.approved.value === true) {
          itemsApproved.push({
            taxiCustomerId: customer.taxiCustomerId,
            taxiCustomerStatus: 2
          });
        }
      });
      // console.log(itemsApproved.length);
      if (itemsApproved.length > 0) {
        // console.log(itemsApproved);
        this.others.putVerifyTaxiCustomer(itemsApproved).subscribe(
          res => {
            this.posted = true;
            this.alertService.success({
              html: '<b> verification was successful </b>'
            });
            setTimeout(() => {
              itemsApproved = [];
              this.getTaxiCustomers();
            }, 3000);
          },
          err =>  {
            this.errored = true;
            this.alertService.danger({
              html: '<b>' + err.error.statusText + '</b>'
            });
          }
        );
      } else {
        this.errored = true;
        this.alertService.danger({
              html: '<b> Please select a customer first </b>'
            });
        return;
      }
    }
    else if (this.currentCustomer === 'Micro Loan') {
      this.customers.forEach((customer, i) => {
        if (this.fval.customers.controls[i].controls.approved.value === true) {
          itemsApproved.push({
            microloanCustomerId: customer.microloanCustomerId,
            microloanCustomerStatus: 2
          });
        }
      });
      // console.log(itemsApproved.length);
      if (itemsApproved.length > 0) {
        // console.log(itemsApproved);
        this.others.putVerifyMicroCustomer(itemsApproved).subscribe(
          res => {
            this.posted = true;
            this.alertService.success({
              html: '<b> verification was successful </b>'
            });
            setTimeout(() => {
              itemsApproved = [];
              this.getMicroCustomers();
            }, 3000);
          },
          err =>  {
            this.errored = true;
            this.alertService.danger({
              html: '<b>' + err.error.statusText + '</b>'
            });
          }
        );
      } else {
        this.errored = true;
        this.alertService.danger({
              html: '<b> Please select a customer first </b>'
            });
        return;
      }
    }
    else if (this.currentCustomer === 'Savings') {
      this.customers.forEach((customer, i) => {
        if (this.fval.customers.controls[i].controls.approved.value === true) {
          itemsApproved.push({
            savingsCustomerId: customer.savingsCustomerId,
            savingsCustomerStatus: 2
          });
        }
      });
      // console.log(itemsApproved.length);
      if (itemsApproved.length > 0) {
        // console.log(itemsApproved);
        this.others.putVerifySavingsCustomer(itemsApproved).subscribe(
          res => {
            this.posted = true;
            this.alertService.success({
              html: '<b> verification was successful </b>'
            });
            setTimeout(() => {
              itemsApproved = [];
              this.getSavingsCustomers();
            }, 3000);
          },
          err =>  {
            this.errored = true;
            this.alertService.danger({
              html: '<b>' + err.error.statusText + '</b>'
            });
          }
        );
      } else {
        this.errored = true;
        this.alertService.danger({
              html: '<b> Please select a customer first </b>'
            });
        return;
      }
    }
  }


  rejectItems(): any {
    this.errored = false;
    this.posted = false;
    let itemsRejected = [];
    if (this.currentCustomer === 'BodaBoda Fuel'){
      this.customers.forEach((customer, i) => {
        if (this.fval.customers.controls[i].controls.approved.value === true) {
          itemsRejected.push({
            bodabodaCustomerId: customer.bodabodaCustomerId,
          });
        }
      });
      // console.log(itemsRejected.length);
      if (itemsRejected.length > 0) {
        // console.log(itemsRejected);
        this.others.putRejectBodaBodaCustomer(itemsRejected).subscribe(
          res => {
            this.posted = true;
            this.alertService.success({
              html: '<b> verification was successful </b>'
            });
            setTimeout(() => {
              itemsRejected = [];
              this.getBodaCustomers();
            }, 3000);
          },
          err =>  {
            this.errored = true;
            itemsRejected = [];
            this.alertService.danger({
              html: '<b>' + err.error.statusText + '</b>'
            });
          }
        );
      } else {
        this.errored = true;
        this.alertService.danger({
              html: '<b> Please select a customer first </b>'
            });
        return;
      }
    }
    else if (this.currentCustomer === 'Taxi Fuel') {
      this.customers.forEach((customer, i) => {
        if (this.fval.customers.controls[i].controls.approved.value === true) {
          itemsRejected.push({
            taxiCustomerId: customer.taxiCustomerId,
          });
        }
      });
      // console.log(itemsRejected.length);
      if (itemsRejected.length > 0) {
        // console.log(itemsRejected);
        this.others.putRejectTaxiCustomer(itemsRejected).subscribe(
          res => {
            this.posted = true;
            this.alertService.success({
              html: '<b> rejection was successful </b>'
            });
            setTimeout(() => {
              itemsRejected = [];
              this.getTaxiCustomers();
            }, 3000);
          },
          err =>  {
            this.errored = true;
            itemsRejected = [];
            this.alertService.danger({
              html: '<b>' + err.error.statusText + '</b>'
            });
          }
        );
      } else {
        this.errored = true;
        this.alertService.danger({
              html: '<b> Please select a customer first </b>'
            });
        return;
      }
    }
    else if (this.currentCustomer === 'Micro Loan') {
      this.customers.forEach((customer, i) => {
        if (this.fval.customers.controls[i].controls.approved.value === true) {
          itemsRejected.push({
            microloanCustomerId: customer.microloanCustomerId,
          });
        }
      });
      // console.log(itemsRejected.length);
      if (itemsRejected.length > 0) {
        // console.log(itemsRejected);
        this.others.putRejectMicroCustomer(itemsRejected).subscribe(
          res => {
            this.posted = true;
            this.alertService.success({
              html: '<b> rejection was successful </b>'
            });
            setTimeout(() => {
              itemsRejected = [];
              this.getMicroCustomers();
            }, 3000);
          },
          err =>  {
            this.errored = true;
            itemsRejected = [];
            this.alertService.danger({
              html: '<b>' + err.error.statusText + '</b>'
            });
          }
        );
      } else {
        this.errored = true;
        this.alertService.danger({
              html: '<b> Please select a customer first </b>'
            });
        return;
      }
    }
    else if (this.currentCustomer === 'Savings') {
      this.customers.forEach((customer, i) => {
        if (this.fval.customers.controls[i].controls.approved.value === true) {
          itemsRejected.push({
            savingsCustomerId: customer.savingsCustomerId,
          });
        }
      });
      // console.log(itemsRejected.length);
      if (itemsRejected.length > 0) {
        // console.log(itemsRejected);
        this.others.putRejectSavingsCustomer(itemsRejected).subscribe(
          res => {
            this.posted = true;
            this.alertService.success({
              html: '<b> rejection was successful </b>'
            });
            setTimeout(() => {
              itemsRejected = [];
              this.getSavingsCustomers();
            }, 3000);
          },
          err =>  {
            this.errored = true;
            itemsRejected = [];
            this.alertService.danger({
              html: '<b>' + err.error.statusText + '</b>'
            });
          }
        );
      } else {
        this.errored = true;
        this.alertService.danger({
              html: '<b> Please select a customer first </b>'
            });
        return;
      }
    }
  }
}
