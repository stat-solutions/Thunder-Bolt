import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import * as jwt_decode from 'jwt-decode';
import { CustomValidator } from 'src/app/validators/custom-validator';

@Component({
  selector: 'app-set-loan-rate',
  templateUrl: './set-loan-rate.component.html',
  styleUrls: ['./set-loan-rate.component.scss']
})
export class SetLoanRateComponent implements OnInit {
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
      itemRate: new FormControl(
        '',
        Validators.compose([Validators.required, CustomValidator.maxValue(100)])
      ),
      station_name: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      loan_product: new FormControl(
        '',
        Validators.compose([Validators.required])
      )
    });
  }
  revert() {
    this.userForm.reset();
  }
  get fval() {
    return this.userForm.controls;
  }

  setRate() {

    this.spinner.show();

    }
  }
