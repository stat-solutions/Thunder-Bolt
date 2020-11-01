import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { CustomValidator } from 'src/app/validators/custom-validator';
import { AlertService } from 'ngx-alerts';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {environment} from 'src/environments/environment';
import { OthersService } from 'src/app/shared/services/other-services/others.service';


@Component({
  selector: 'app-personal-profile',
  templateUrl: './personal-profile.component.html',
  styleUrls: ['./personal-profile.component.scss']
})
export class PersonalProfileComponent implements OnInit {
  registered = false;
  submitted = false;
  userForm: FormGroup;
  serviceErrors: any = {};
  value: string;
  fieldType: boolean;
  mySubscription: any;
  myDateValue: Date;
  positionValue: string;
  downloadURL: Observable<string>;
  photoUrl: string;
  selectedFile: File = null;
  User = this.authService.loggedInUserInfo();
  constructor(
    private authService: AuthServiceService,
    private others: OthersService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private alertService: AlertService,
    private fb: FormBuilder,
    private storage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.myDateValue = new Date();
    this.userForm = this.createFormGroup();
    this.setProfileValues();
    this.disableForm();
  }
  createFormGroup(): any {
    return this.fb.group({
      full_name: new FormControl('', Validators.compose([Validators.required])),
      email1: new FormControl('', Validators.compose([Validators.required])),
      email2: new FormControl('', Validators.compose([Validators.required])),
      nxtOfKin: new FormControl('', Validators.compose([Validators.required])),
      customerNextOfKinPhone1: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          CustomValidator.patternValidator(
            /^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/,
            { hasNumber: true }
          ),
        ])
      ),
      user_contact_number1: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          CustomValidator.patternValidator(
            /^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/,
            { hasNumber: true }
          ),
        ])
      ),
      user_contact_number2: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          CustomValidator.patternValidator(
            /^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/,
            { hasNumber: true }
          ),
        ])
      ),
      id_type: new FormControl('', Validators.compose([Validators.required])),
      id_number: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          // CustomValidator.patternValidator(
          //   /^(([a-zA-Z])([a-zA-Z])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([a-zA-Z])
          // ([a-zA-Z])([a-zA-Z])([a-zA-Z])([a-zA-Z]))$/,
          //   { nationalIdCheck: true }
          // ),
        ])
      ),
      idPhotoUrl: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      date_of_birth: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
    });
  }

  revert(): any {
    this.userForm.reset();
  }

  get fval(): any {
    return this.userForm.controls;
  }
  disableForm(): any {
    return this.userForm.disable();
  }

  enableEdit(): any {
    return this.userForm.enable();
  }

  // toggle visibility of password field
    toggleFieldType(): any {
      this.fieldType = !this.fieldType;
    }
  returnHome(): any {
    // this.spinner.hide();
    // this.revert();
  }

  setProfileValues(): any {
    this.others.getUserProfile(this.User.userId).subscribe(
      res => {
        // console.log(res);
        this.fval.full_name.setValue(res[0].userName);
        this.fval.email1.setValue(res[0].userEmail1);
        this.fval.email2.setValue(res[0].userEmail1);
        // this.fval.nxtOfKin.setValue(res[0].);
        // this.fval.customerNextOfKinPhone1.setValue(res[0].);
        this.fval.user_contact_number1.setValue(res[0].userPhone1);
        this.fval.user_contact_number2.setValue(res[0].userPhone2);
        this.fval.id_type.setValue(res[0].userIdType.toUpperCase());
        this.fval.id_number.setValue(res[0].userIdNumber);
        // this.fval.idPhotoUrl.setValue(res[0].);
        const DOB = '2020-10-6'; // res[0].userDateOfBirth
        const date = new Date(DOB);
        this.fval.date_of_birth.setValue(date);
        // this.fval.full_name.setValue();
        // this.fval.full_name.setValue();
      },
      err => console.log(err)
    );
  }
  save(): any {
    const data = {
      userId: this.User.userId,
      userName: this.fval.full_name.value.toUpperCase(),
      userEmail1: this.fval.email1.value,
      userEmail2: this.fval.email2.value,
      userPhone1: this.fval.user_contact_number1.value,
      userPhone2: this.fval.user_contact_number2.value,
      userHomeAreaDetails: '',
      userIdType: this.fval.id_type.value,
      userIdNumber: this.fval.id_number.value,
      userDateOfBirth: `${this.fval.date_of_birth.value.getFullYear()}-${this.fval.date_of_birth.value.getMonth() + 1}-${this.fval.date_of_birth.value.getDate()}`,
      userRecruitmentDate: ''
    };
    console.log(data);
    this.others.setUserProfile(data).subscribe(
        res => {
          console.log(res);
        },
        err => console.log(err)
      );
  }
  onFileSelected(event): any {
    const n = Date.now();
    const file = event.target.files[0];
    const filePath = `userImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`userImages/${n}`, file);
    task
    .snapshotChanges()
    .pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
        this.downloadURL.subscribe(url => {
          if (url) {
            this.photoUrl = url;
          }
          // console.log(this.photoUrl);
        });
      })
    )
    .subscribe(url => {
      if (url) {
        // console.log(url);
      }
    });
  }
}
