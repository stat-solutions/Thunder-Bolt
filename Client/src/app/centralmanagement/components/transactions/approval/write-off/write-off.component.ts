import { Component, OnInit, TemplateRef, ValueProvider } from '@angular/core';
// import * as jwt_decode from 'jwt-decode';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'ngx-alerts';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { OthersService } from 'src/app/shared/services/other-services/others.service';

@Component({
  selector: 'app-write-off',
  templateUrl: './write-off.component.html',
  styleUrls: ['./write-off.component.scss'],
})
export class WriteOffComponent implements OnInit {
  userForm: FormGroup;
  writeOffApprovals: any;
  posted = false;
  actionButton: string;
  errored: boolean;
  serviceErrors: string;
  status: boolean;
  checkedOk: boolean;
  modalRef: BsModalRef;

  constructor(
    private authService: AuthServiceService,
    private others: OthersService,
    private router: Router,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.userForm = this.createFormGroup();
    this.fval.selectAll.setValue(false);
    this.initialiseForm();
  }
  createFormGroup(): any {
    return this.fb.group({
      approveWriteOffs: this.fb.array([this.writeOffApproval]),
      selectAll: this.fb.control({}),
    });
  }
  get writeOffApproval(): any {
    return this.fb.group({
      station: this.fb.control({ value: '' }),
      client: this.fb.control({ value: '' }),
      ammount: this.fb.control({ value: '' }),
      approved: this.fb.control({}),
    });
  }
  addItem(): any {
    // this.unitForm.controls.bussinessUnits  as FormArray
    (this.fval.approveWriteOffs as FormArray).push(this.writeOffApproval);
  }

  removeItem(index: number): any {
    (this.fval.approveWriteOffs as FormArray).removeAt(index);
  }
  initialiseForm(): any {
    let n: number;
    this.others.getWaivedPrincipalForApproval().subscribe(
      res => {
        this.writeOffApprovals = res;
        this.writeOffApprovals.forEach((item, i) => {
          this.fval.approveWriteOffs.controls[i].controls.station.setValue(
            item.station
          );
          this.fval.approveWriteOffs.controls[i].controls.client.setValue(
            item.client
          );
          this.fval.approveWriteOffs.controls[i].controls.ammount.setValue(
            item.ammount
          );
          this.fval.approveWriteOffs.controls[i].controls.approved.setValue(
            false
          );
          this.addItem();
          n = i + 1;
        });
        this.removeItem(n);
      }
    );
  }
  checkAllItems(val: boolean): any {
    if (val === true) {
      this.writeOffApprovals.forEach((item, i) => {
        this.fval.approveWriteOffs.controls[i].controls.approved.setValue(
          val
        );
      });
    } else {
      this.writeOffApprovals.forEach((item, i) => {
        this.fval.approveWriteOffs.controls[i].controls.approved.setValue(
          false
        );
      });
    }
  }
  deselectAll(val: number): any {
    // console.log(this.fval.approveAreas["controls"][val]["controls"].approved.value)
    if (
      this.fval.approveWriteOffs.controls[val].controls.approved.value ==
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

  // client modal method
  public openModal(template: TemplateRef<any>): any {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-lg modal-dialog-centered' })
    );
  }

  disableForm(): any {
    return this.userForm.disable();
  }

  enableEdit(): any {
    return this.userForm.enable();
  }

  approveItems(): any {
    const itemsApproved = [];
    this.writeOffApprovals.forEach((item, i) => {
      if (
        this.fval.approveWriteOffs.controls[i].controls.approved.value ==
        true
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
    this.writeOffApprovals.forEach((item, i) => {
      if (
        this.fval.approveWriteOffs.controls[i].controls.approved.value ==
        true
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

