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
  selector: 'app-lib-set-managers',
  templateUrl: './set-managers.component.html',
  styleUrls: ['./set-managers.component.scss']
})
export class SetManagersComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

}
