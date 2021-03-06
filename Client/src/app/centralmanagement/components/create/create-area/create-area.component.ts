import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import * as jwt_decode from 'jwt-decode';
import { OthersService } from 'src/app/shared/services/other-services/others.service';

@Component({
  selector: 'app-create-area',
  templateUrl: './create-area.component.html',
  styleUrls: ['./create-area.component.scss']
})
export class CreateAreaComponent implements OnInit {
  userForm: FormGroup;
  errored: boolean;
  posted: boolean;
  serviceErrors: string;
  values: any;
  numberValue: number;
  User = this.authService.loggedInUserInfo();
  // ShiftDetails[]
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
      itemCreate: new FormControl('', Validators.compose([Validators.required])),
    });
  }

  revert(): any {
    this.userForm.reset();
  }
  get fval(): any {
    return this.userForm.controls;
  }

  create(): any {
    if (this.userForm.valid){
        const data = {
          areaRegionName: this.fval.itemCreate.value.toUpperCase(),
          userId: this.User.userId
        };
        this.others.createArea(data).subscribe(
          res => {
            // console.log(res)
            if (res){
              this.posted = true;
              this.alertService.success({
                html:
                  '<p>Area creation was successful</p>'
              });
              setTimeout(this.revert(), 3000);
            }
          },
          err => {
            this.errored = true;
            this.alertService.danger({
              html: '<b>' + err.error.ststusText + '</b>'
            });
          }
        );
    } else {
      // return;
    }
  }
}
