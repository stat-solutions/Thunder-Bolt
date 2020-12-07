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
  selector: 'app-edit-taxi-stage',
  templateUrl: './edit-taxi-stage.component.html',
  styleUrls: ['./edit-taxi-stage.component.scss'],
})
export class EditTaxiStageComponent implements OnInit {
  registered = false;
  submitted = false;
  errored = false;
  posted = false;
  userForm: FormGroup;
  serviceErrors: any = {};
  value: string;
  fieldType: boolean;
  parks: any;
  taxiStages: any;
  stageId: number;
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
    this.taxiParks();
  }

  createFormGroup(): any {
    return new FormGroup({
      taxiStageName: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
       park: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      taxiStageChairmanName: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      taxiStageChairmanPhone1: new FormControl(
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

  initiateForm(val: any): void{
    // console.log(val);
    if (val){
      this.taxiStages.forEach(stage => {
        if (stage.taxiStageName.toUpperCase() === val.toUpperCase()) {
          this.stageId = stage.taxiStageId;
          this.parks.forEach(park => {
            if (park.taxiParkId === stage.fkTaxiParkIdTaxiStage){
                this.fval.park.setValue(park.taxiParkName);
                this.fval.park.disable();
            }
          });
          this.fval.taxiStageChairmanName.setValue(stage.taxiStageChairmanName);
          this.fval.taxiStageChairmanPhone1.setValue(stage.taxiStageChairmanPhone1);
        } else {
          if (this.fval.park) {
            return;
          } else {
            this.errored = true;
            this.alertService.danger({
                    html:
                      '<b> the taxi stage chose does not exist </b>'
            });
          }
        }
      });
    } else {
      return;
    }
  }

  // toggle visibility of password field
  toggleFieldType(): any {
    this.fieldType = !this.fieldType;
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

  taxiParks(): any {
    this.others.getTaxiParks().subscribe(
      res => this.parks = res,
      err => console.log(err)
    );
    this.others.getTaxiStages().subscribe(
      res => this.taxiStages = res.filter(stage => stage.bodabodaStageName !== null && stage.fkStageClusterIdBodabodaStage !== null),
      err => console.log(status)
    );
//     fkApprovalDetailsIdTaxiPark: 125
// taxiParkId: 1500
// taxiParkLocation: "KAMPALA TOWN"
// taxiParkName: "NEW TAXI PARK"
// taxiParkStatus: 2

// fkApprovalDetailsIdTaxiStage: 126
// fkTaxiParkIdTaxiStage: 1500
// taxiStageChairmanName: "MUKAMA GILBERT"
// taxiStageChairmanPhone1: "0781331616"
// taxiStageId: 1600
// taxiStageName: "KYINYARWANDA"
// taxiStageStatus: 2
  }

  onSubmit(): any {
    this.submitted = true;
    this.spinner.show();
    this.errored = false;
    this.posted = false;

    if (this.userForm.invalid === true) {
      return;
    } else {
      const data = {
            taxiStageId: this.stageId,
            taxiStageName: this.fval.taxiStageName.value.toUpperCase(),
            taxiStageChairmanName: this.fval.taxiStageChairmanName.value.toUpperCase(),
            taxiStageChairmanPhone1: this.fval.taxiStageChairmanPhone1.value,
            taxiParkId: null,
            userId: this.User.userId
      };
      this.parks.forEach(park => {
        if (park.taxiParkName === this.fval.park.value) {
          data.taxiParkId = park.taxiParkId;
        }
      });
      // console.log(data);
      this.spinner.hide();
      if (data.taxiParkId === null) {
        // console.log('errored')
        this.errored = true;
        this.alertService.danger({
                html:
                  '<b> the taxi park chose does not exist </b>'
        });
        // this.errored = false;
        this.fval.park.setValue('');
        return;
      } else {
        this.others.updateTaxiStage(data).subscribe(
          res => {
            this.posted = true;
            this.alertService.success({
                    html:
                      '<b>' + data.taxiStageName + ' Was Updated Successfully</b>'
            });
            // this.fval.taxiParkName.setValue('');
            this.taxiParks();
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
