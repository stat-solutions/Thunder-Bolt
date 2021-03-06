import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { CustomValidator } from 'src/app/validators/custom-validator';
import * as jwt_decode from 'jwt-decode';
import { OthersService } from 'src/app/shared/services/other-services/others.service';

@Component({
  selector: 'app-enroll-cluster',
  templateUrl: './enroll-cluster.component.html',
  styleUrls: ['./enroll-cluster.component.scss']
})
export class EnrollClusterComponent implements OnInit {
  registered = false;
  submitted = false;
  errored = false;
  posted = false;
  userForm: FormGroup;
  serviceErrors: any = {};
  value: string;
  towns: any;
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
    this.others.getAllTheTownLocations().subscribe(res => {
      this.towns = res;
      this.initiateTownLocation();
    }, 
    err => {
      this.errored = true;
      console.log(err.error.error.message);
    }
    );
  }

  createFormGroup(): any {
    return new FormGroup({
      stageClusterName: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      stageClusterTown: new FormControl(
        '',
        Validators.compose([Validators.required])
      )
    });
  }
  
  initiateTownLocation(){
    this.towns.forEach(town => {
      if (town.theTownLocationId === this.User.userLocationId) {
        this.fval.stageClusterTown.setValue(town.townName.toUpperCase());
        this.fval.stageClusterTown.disable();
      }
    });
  }

  revert(): any {
    this.userForm.reset();
    this.ngOnInit();
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
      const data = {
            stageClusterName: this.fval.stageClusterName.value.toUpperCase(),
            stageClusterLocation: this.fval.stageClusterTown.value.toUpperCase(),
            userId: this.User.userId
      }
      // console.log(data);
      this.spinner.hide();
      this.others.createBodaCluster(data).subscribe(
        res => {
          this.posted = true;
          this.alertService.success({
                  html:
                    '<b>' + data.stageClusterName + 'Was Created Successfully</b>'
          });
          // this.fval.taxiParkName.setValue('');
          this.revert(); 
        },
        err => {
          this.errored = true;
           this.alertService.danger({
                  html:
                    '<b>' + err.error.error.message + '</b>'
          });
        }
      );
    }
  }
}
