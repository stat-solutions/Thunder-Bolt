import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import * as jwt_decode from 'jwt-decode';
import { CustomValidator } from 'src/app/validators/custom-validator';

@Component({
  selector: 'app-withdraw-float',
  templateUrl: './withdraw-float.component.html',
  styleUrls: ['./withdraw-float.component.scss']
})
export class WithdrawFloatComponent implements OnInit {
  userForm: FormGroup;
  errored: boolean;
  serviceErrors: string;
  values: any;
  numberValue: number;

  constructor(
    private authService: AuthServiceService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.userForm = this.createFormGroup();
  }

  createFormGroup() {
    return new FormGroup({
      station: new FormControl('', Validators.compose([Validators.required])),
      floatAmount: new FormControl('', Validators.compose([Validators.required
      // CustomValidator.patternValidator(/^\d+$/, { hasNumber: true }
        // )
      ]))
});
  }

  revert() {
    this.userForm.reset();
  }
  get fval() {
    return this.userForm.controls;
  }

  withdraw() {

    this.spinner.show();

    }
  }
