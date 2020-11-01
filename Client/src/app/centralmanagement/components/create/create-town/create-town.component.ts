import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import * as jwt_decode from 'jwt-decode';
import { OthersService } from 'src/app/shared/services/other-services/others.service';


@Component({
  selector: 'app-create-town',
  templateUrl: './create-town.component.html',
  styleUrls: ['./create-town.component.scss']
})
export class CreateTownComponent implements OnInit {
  userForm: FormGroup;
  errored: boolean;
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
    createItem(): any {
      if (this.userForm.valid){
      const data = {
        townName: this.fval.itemCreate.value.toUpperCase(),
        userId: this.User.userId
      };
      this.others.createTown(data).subscribe(
        res => {
          // console.log(res)
          if (res){
            this.revert();
            this.alertService.success({
              html:
                '<p>Station creation was successful</p>'
            });
          }
        },
        err => console.log(err)
        );
      } else {
        // return;
      }
    }
  }
