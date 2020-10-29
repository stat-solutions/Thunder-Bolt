import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { CompanyInfo } from 'src/app/shared/models/company';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { OthersService } from 'src/app/shared/services/other-services/others.service';
import { Approvals } from '../approval-setup/approval-setup.component';
import { BussinessUnits } from '../bussinessunits/bussinessunits.component';

export interface CompanyCreated {
  created: boolean;
}
export interface ApprovalLevelSet {
  set: boolean;
}
export interface BussinessUnitCreated {
  created: boolean;
}
@Component({
  selector: 'app-admin',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  sideBarChanged = true;
  company: CompanyCreated = {created: false};
  bussinessUnits: BussinessUnits[] = [
    {unitName: 'Fuel Bussiness', unitId: 104},
    {unitName: 'Hospital Bussiness', unitId: 120},
  ];
  Company: CompanyInfo;
  approvals: Approvals[] = [
    {name: 'Area Creation', level: 3},
    {name: 'Town Creation', level: 1},
    {name: 'Stage Creation', level: 2},
    {name: 'Station Creation', level: 4},
  ];
  companyInfo: CompanyInfo;
  showInput =  false;
  downloadURL: any;
  companyPhotoUrl: any;
  User = this.authService.loggedInUserInfo();

  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceService,
    private others: OthersService,
    private storage: AngularFireStorage
  ) { }

  ngOnInit(): void {
    this.toggleSideBar();
    this.setCompanyDetails();
  }

  toggleSideBar(): any {
    this.sideBarChanged = !this.sideBarChanged;
    // this.sharedService.emitChange(this.sideBarChanged);
  }
  enableEdit(): any {
    this.showInput  = true;
  }
  onFileSelected(event): any {
    const n = Date.now();
    const file = event.target.files[0];
    const filePath = `companyLogo/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`companyLogo/${n}`, file);
    task
    .snapshotChanges()
    .pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
        this.downloadURL.subscribe(url => {
          if (url) {
            this.companyPhotoUrl = url;
          }
          const data = {
            companyLogoUrl: this.companyPhotoUrl,
            userId: this.User.userId,
          };
          this.others.updateCompanyLogo(data).subscribe(
            res => console.log(res),
            err => console.log(err)
          );
          this.setCompanyDetails();
          this.showInput = false;
        });
      })
    )
    .subscribe(url => {
      if (url) {
        // console.log(url);
      }
    });
  }
  setCompanyDetails(): any {
    this.others.getCompanyInfo().subscribe(
      item => {
        this.company.created = true;
        this.companyInfo = item;
        // console.log(this.companyInfo);
      },
      (error: string) => {
        //
      }
    );
 }
}
