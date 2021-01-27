import { Component, OnInit, TemplateRef } from '@angular/core';
// import * as jwt_decode from 'jwt-decode';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'ngx-alerts';
import { OthersService } from 'src/app/shared/services/other-services/others.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-reverse-interest',
  templateUrl: './reverse-interest.component.html',
  styleUrls: ['./reverse-interest.component.scss'],
})
export class ReverseInterestComponent implements OnInit {
  modalRef: BsModalRef;
  userForm: FormGroup;
  ratesApprovals: any;
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
    private others: OthersService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
    private fb: FormBuilder,
    private modalService: BsModalService
  ) {}
  ngOnInit(): void {
    this.userForm = this.createFormGroup();
    this.fval.selectAll.setValue(false);
    this.initialiseForm();
  }
  createFormGroup(): any {
    return this.fb.group({
      approveReduceRates: this.fb.array([this.rateApproval]),
      selectAll: this.fb.control({}),
    });
  }
  get rateApproval(): any {
    return this.fb.group({
      station: this.fb.control({ value: '' }),
      client: this.fb.control({ value: '' }),
      rate: this.fb.control({ value: '' }),
      approved: this.fb.control({}),
    });
  }
  addItem(): any {
    // this.unitForm.controls.bussinessUnits  as FormArray
    (this.fval.approveReduceRates as FormArray).push(this.rateApproval);
  }

  removeItem(index: number): any {
    (this.fval.approveReduceRates as FormArray).removeAt(index);
  }
  initialiseForm(): any {
    let n: number;
    this.others.getReversedInterestsForApproval().subscribe((res) => {
      this.ratesApprovals = res;
      this.ratesApprovals.forEach((item, i) => {
        this.fval.approveReduceRates.controls[i].controls.station.setValue(
          item.station
        );
        this.fval.approveReduceRates.controls[i].controls.client.setValue(
          item.client
        );
        this.fval.approveReduceRates.controls[i].controls.rate.setValue(
          item.rate
        );
        this.fval.approveReduceRates.controls[i].controls.approved.setValue(
          false
        );
        this.addItem();
        n = i + 1;
      });
      this.removeItem(n);
    });
  }
  checkAllItems(val: boolean): any {
    if (val == true) {
      this.ratesApprovals.forEach((item, i) => {
        this.fval.approveReduceRates.controls[i].controls.approved.setValue(
          val
        );
      });
    } else {
      this.ratesApprovals.forEach((item, i) => {
        this.fval.approveReduceRates.controls[i].controls.approved.setValue(
          false
        );
      });
    }
  }
  deselectAll(val: number): any {
    // console.log(this.fval.approveAreas["controls"][val]["controls"].approved.value)
    if (
      this.fval.approveReduceRates.controls[val].controls.approved.value ===
      true
    ) {
      this.fval.selectAll.setValue(false);
    }
  }
  revert(): any {
    this.userForm.reset();
  }

  //modal
  public openModal(template: TemplateRef<any>): any {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-lg modal-dialog-centered' })
    );
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
    const itemsApproved = [];
    this.ratesApprovals.forEach((item, i) => {
      if (
        this.fval.approveReduceRates.controls[i].controls.approved.value == true
      ) {
        item.status = 2;
        itemsApproved.push(item);
      }
    });

    console.log(itemsApproved.length);
    if (itemsApproved.length > 0) {
      setTimeout(() => {
        this.router.navigate(['centralmanagement/dashboard']);
      }, 3000);
    } else {
      // alert("Please select something")
      return;
    }
  }
  rejectItems(): any {
    const itemsRejected = [];
    this.ratesApprovals.forEach((item, i) => {
      if (
        this.fval.approveReduceRates.controls[i].controls.approved.value == true
      ) {
        item.status = 1;
        itemsRejected.push(item);
      }
    });
    console.log(itemsRejected.length);
    if (itemsRejected.length > 0) {
      setTimeout(() => {
        this.router.navigate(['centralmanagement/dashboard']);
      }, 3000);
    } else {
      // alert("Please select something")
      return;
    }
  }
}

