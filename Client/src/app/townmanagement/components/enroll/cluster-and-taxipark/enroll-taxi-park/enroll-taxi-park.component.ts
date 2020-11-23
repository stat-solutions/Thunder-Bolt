import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { CustomValidator } from 'src/app/validators/custom-validator';
import { NavigationViewModel } from 'ngx-bootstrap/datepicker/models';
import { OthersService } from 'src/app/shared/services/other-services/others.service';


@Component({
  selector: 'app-enroll-taxi-park',
  templateUrl: './enroll-taxi-park.component.html',
  styleUrls: ['./enroll-taxi-park.component.scss']
})
export class EnrollTaxiParkComponent implements OnInit {
  registered = false;
  submitted = false;
  errored = false;
  posted = false;
  userForm: FormGroup;
  serviceErrors: any = {};
  value: string;
  User = this.authService.loggedInUserInfo();

  constructor(
    private authService: AuthServiceService,
    private others: OthersService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.userForm = this.createFormGroup();
  }

  createFormGroup(): any {
    return new FormGroup({
      taxiParkName: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      taxiParkTown: new FormControl(
        '',
        Validators.compose([Validators.required])
      )
    });
  }

  revert(): any {
    this.userForm.reset();
  }

  resetStageNames(): any {
    this.userForm.controls.stage_name.reset();
  }

  get fval(): any {
    return this.userForm.controls;
  }

  onSubmit(): any {
    this.submitted = true;
    this.spinner.show();

    if (this.userForm.invalid === true) {
      return;
    } else {
    }
  }
}
