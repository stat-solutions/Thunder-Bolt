import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { CustomValidator } from 'src/app/validators/custom-validator';
// import { DashboardUserService } from 'src/app/services/dashboard-user.service';
// import { StageNames } from 'src/app/models/stage-names';
import * as jwt_decode from 'jwt-decode';
import { OthersService } from 'src/app/shared/services/other-services/others.service';

@Component({
  selector: 'app-enroll-boda-stage',
  templateUrl: './enroll-boda-stage.component.html',
  styleUrls: ['./enroll-boda-stage.component.scss']
})
export class EnrollBodaStageComponent implements OnInit {
  registered = false;
  submitted = false;
  errored = false;
  posted = false;
  userForm: FormGroup;
  serviceErrors: any = {};
  value: string;
  fieldType: boolean;
  clusters: any;
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
    this.bodaClusters();
  }

  createFormGroup(): any {
    return new FormGroup({
      bodabodaStageName: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
       cluster: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      bodabodaStageChairmanName: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      bodabodaStageChairmanPhone1: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          CustomValidator.patternValidator(
            /^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/,
            { hasNumber: true }
          )
        ])
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

  bodaClusters(): any {
    this.others.getBodaClusters().subscribe(
      res => this.clusters = res,
      err => console.log(err.error.error.message)
    );
//     fkApprovalDetailsIdstageCluster: 122
// stageCluesterStatus: 2
// stageClusterId: 1800
// stageClusterLocation: "NANSANA"
// stageClusterName: "KYINYARWANDA"
  }

  onSubmit(): any {
    this.submitted = true;
    this.errored = false;
    this.posted = false;
    this.spinner.show();

    if (this.userForm.invalid === true) {
      return;
    } else {
      const data = {
            bodabodaStageName: this.fval.bodabodaStageName.value.toUpperCase(),
            bodabodaStageChairmanName: this.fval.bodabodaStageChairmanName.value.toUpperCase(),
            bodabodaStageChairmanPhone1: this.fval.bodabodaStageChairmanPhone1.value,
            stageClusterId: null,
            userId: this.User.userId
      };
      this.clusters.forEach(cluster => {
        if (cluster.stageClusterName === this.fval.cluster.value) {
          data.stageClusterId = cluster.stageClusterId;
        }
      });
      // console.log(data);
      this.spinner.hide();
      if (data.stageClusterId === null){
        this.errored = true;
        this.alertService.danger({
                html:
                  '<b> the cluster chose does not exist </b>'
        });
        // this.errored = false;
        this.fval.cluster.setValue('');
        return;
      } else {
        this.others.createBodaStage(data).subscribe(
          res => {
            this.posted = true;
            this.alertService.success({
                    html:
                      '<b>' + data.bodabodaStageName + ' Was Created Successfully</b>'
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
}
