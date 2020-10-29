import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'ngx-alerts';
import { ArrayType } from '@angular/compiler';
import { OthersService } from 'src/app/shared/services/other-services/others.service';
import { CustomValidator } from 'src/app/validators/custom-validator';
// import { BsModalService } from 'ngx-bootstrap/modal';
// import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


export interface Approvals {
  name: string;
  level: number;
}

@Component({
  selector: 'app-approval-setup',
  templateUrl: './approval-setup.component.html',
  styleUrls: ['./approval-setup.component.scss'],
})
export class ApprovalSetupComponent implements OnInit {
  approvalForm: FormGroup;
  posted = false;
  showLevels: number;
  actionButton: string;
  errored: boolean;
  serviceErrors: string;
  status: boolean;
  checkedOk: boolean;
  station: string;
  theCompany: string;
  approvals: any;
  // [
    // { name: 'Area Creation', level: 3 },
    // { name: 'Town Creation', level: 1 },
  // ];
  constructor(
    private others: OthersService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.approvalForm = this.createFormGroup();
    this.initialiseForm();
  }
  createFormGroup(): any {
    return this.fb.group({
      approvalItems: this.fb.array([this.approvalItem]),
    });
  }
  get approvalItem(): any {
    return this.fb.group({
      name: this.fb.control({ value: '' }),
      id: this.fb.control({ value: '' }),
      firstApproval: this.fb.control({ value: '' }),
      secondApproval: this.fb.control({ value: '' }),
      thirdApproval: this.fb.control({ value: '' }),
      level: this.fb.control(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1),
          CustomValidator.maxValue(3),
          CustomValidator.minValue(0),
        ])
      ),
    });
  }
  addItem(): any {
    (this.fval.approvalItems as FormArray).push(this.approvalItem);
  }

  removeItem(index: number): any {
    (this.fval.approvalItems as FormArray).removeAt(index);
  }

  initialiseForm(): any {
    let n: number;
    this.others.getApprovalLevelsCreate().subscribe(
      res => {
        this.approvals = res;
        this.others.getApprovalLevelsUpdate().subscribe(
          response => {
            // console.log(response);
            response.forEach((itm, index) => {
              this.approvals.push(itm);
            });
            // console.log(this.approvals);
            this.approvals.forEach((item, i) => {
            this.fval.approvalItems.controls[i].controls.name.setValue(item.itemName.replace(/_/g, ' '));
            this.fval.approvalItems.controls[i].controls.id.setValue(item.itemRequiringApprovalId);
            this.fval.approvalItems.controls[i].controls.level.setValue(item.approvalLevel);
            this.fval.approvalItems.controls[i].controls.firstApproval.setValue(
              item.firstApprovalBy === 1 ? 'TOWN' : item.firstApprovalBy === 2 ? 'AREA' : 'CENTRAL');
            this.fval.approvalItems.controls[i].controls.secondApproval.setValue(
              item.secondApprovalBy === 1 ? 'TOWN' : item.secondApprovalBy === 2 ? 'AREA' : 'CENTRAL');
            this.fval.approvalItems.controls[i].controls.thirdApproval.setValue(
              item.thirdApprovalBy === 1 ? 'TOWN' : item.thirdApprovalBy === 2 ? 'AREA' : 'CENTRAL');
            this.addItem();
            n = i + 1;
          });
            this.removeItem(n);
            this.disableForms();
          },
          error => console.log(error)
        );
      },
      err => console.log(err)
    );
  }
revert(): any {
    this.approvalForm.reset();
  }

  // revert() {
  //   this.approvalForm.reset();
  // }

refresh(): any {
    location.reload();
  }

get fval(): any {
    return this.approvalForm.controls;
  }

disableForms(): any {
  // console.log(this.approvals);
  this.approvals.forEach((itm, i) => {
    this.fval.approvalItems.controls[i].disable();
  });
  }

enableEdit(val: number): any {
    this.showLevels = val;
    this.approvals.forEach((itm, i) => {
      if (i === val) {
        this.fval.approvalItems.controls[i].enable();
      }
    });
  }

saveLevel(index: any): any {
    if (this.fval.approvalItems.controls[index]) {
      this.fval.approvalItems.controls[index].disable();
      this.showLevels = null;
      const levels = this.fval.approvalItems.controls[index].controls.level.value;
      const fist = this.fval.approvalItems.controls[index].controls.firstApproval.value;
      const second = this.fval.approvalItems.controls[index].controls.secondApproval.value;
      const third = this.fval.approvalItems.controls[index].controls.thirdApproval.value;
      const data = {
        itemRequiringApprovalId: this.fval.approvalItems.controls[index].controls.id.value,
        approvalLevel: levels,
        firstApprovalBy: levels === 0 ? 0 : fist === 'TOWN' ? 1 : fist === 'AREA' ? 2 : 3,
        secondApprovalBy: levels === 0 ? 0 : levels === 1 ? 0 : second === 'TOWN' ? 1 : second === 'AREA' ? 2 : 3,
        thirdApprovalBy: levels === 0 ? 0 : levels === 1 ? 0 : levels === 2 ? 0 : third === 'TOWN' ? 1 : third === 'AREA' ? 2 : 3,
      };
      // console.log(data);
      this.others.setApprovalLevel(data).subscribe(
        res => {
          // console.log(res);
        },
        err => console.log(err)
      );
    } else {
      return;
    }
  }
}
