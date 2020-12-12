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
export interface WriteOffApprovals {
  station: string;
  client: string;
  ammount: number;
  status: number;
}

@Component({
  selector: 'app-verify-client',
  templateUrl: './verify-client.component.html',
  styleUrls: ['./verify-client.component.scss'],
})
export class VerifyClientComponent implements OnInit {
  public modalRef: BsModalRef;
  userForm: FormGroup;
  writeOffApprovals: WriteOffApprovals[] = [
    { station: 'kibuye', client: 'Kasule Joseph', ammount: 400000, status: 0 },
    { station: 'ndeeba', client: 'kasozi med', ammount: 600000, status: 0 },
    { station: 'nsambya', client: 'Kasule Joseph', ammount: 500000, status: 0 },
    { station: 'kyengera', client: 'mukasa rony', ammount: 850000, status: 0 },
    { station: 'ndeeba', client: 'kasozi med', ammount: 600000, status: 0 },
    { station: 'nsambya', client: 'Kasule Joseph', ammount: 500000, status: 0 },
    { station: 'kyengera', client: 'mukasa rony', ammount: 850000, status: 0 },
  ];
  posted = false;
  actionButton: string;
  errored: boolean;
  serviceErrors: string;
  status: boolean;
  checkedOk: boolean;

  constructor(
    private modalService: BsModalService,
    private authService: AuthServiceService,
    private router: Router,
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
    // this.others.getBussinessUnits().subscribe(
    //   units => {
    //     this.approvals = units;
    this.writeOffApprovals.forEach((item, i) => {
      // console.log(item.name);
      // console.log(i);
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
    // }
    // )
  }

// modal method
   public openModal(template: TemplateRef<any>): any {
       this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'white modal-lg modal-dialog-center' })
    );
  }
   public openModal2(template: TemplateRef<any>): any {
       this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'white modal-dialog-center' })
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
      this.fval.approveWriteOffs.controls[val].controls.approved.value ===
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
    const itemsApproved = [];
    this.writeOffApprovals.forEach((item, i) => {
      if (
        this.fval.approveWriteOffs.controls[i].controls.approved.value ===
        true
      ) {
        item.status = 2;
        itemsApproved.push(item);
      }
    });

    console.log(itemsApproved.length);
    if (itemsApproved.length > 0) {
      setTimeout(() => {
        this.router.navigate(['areamanagement/dashboard']);
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
        this.fval.approveWriteOffs.controls[i].controls.approved.value ===
        true
      ) {
        item.status = 1;
        itemsRejected.push(item);
      }
    });
    console.log(itemsRejected.length);
    if (itemsRejected.length > 0) {
      setTimeout(() => {
        this.router.navigate(['areamanagement/dashboard']);
      }, 3000);
    } else {
      // alert("Please select something")
      return;
    }
  }
}
