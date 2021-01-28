import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { OthersService } from 'src/app/shared/services/other-services/others.service';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
  public modalRef: BsModalRef;
  userForm: FormGroup;
  type: string;
  User = this.authService.loggedInUserInfo();
  singleReport: any;
  imageUrl: string;
  totals: any;
  user = '/../../../assets/img/man.svg';
  reports = [
    "All Clients", "Clusters", "Stages",
    "Stage Clients", "Cluster Clients", "Stage Chairmen",
    "New Clients", "Borrowed Clients", "Paid Clients",
    "Savings Clients"
  ];

  constructor(
    private fb: FormBuilder,
    private modalService: BsModalService,
    private authService: AuthServiceService,
    private others: OthersService,
    ) {}

  ngOnInit(): void {
    this.reports.sort();
    this.userForm = this.createFormGroup();
  }

  createFormGroup(): any {
    return this.fb.group({
      report_type: this.fb.control('', Validators.compose([])),
      range_date: this.fb.control('', Validators.compose([])),
    });
  }
  changeReport(val: any): any {
    // console.log(val);
    this.type = val;
    const date = new Date();
    const startDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const endDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    this.fetchReports([startDate, endDate], this.type);
  }
  fetchReport(val: any): any {
    if (val.length > 1) {
      const startDate = `${val[0].getFullYear()}-${val[0].getMonth() + 1}-${val[0].getDate()}`;
      const endDate = `${val[1].getFullYear()}-${val[1].getMonth() + 1}-${val[1].getDate()}`;
      this.fetchReports([startDate, endDate], this.type);
      this.userForm.controls.range_date.setValue('');
    }
  }
  fetchReports(dates: Array<string>, typeOfReport: string): any{
    switch (typeOfReport){
      case 'Cash Ledger':
        this.others.getCashLedgerStation({
          theStationLocationId: this.User.userLocationId,
          startDate: dates[0],
          endDate: dates[1],
        }).subscribe(
          res => {
            if (res.length === 1) {
              this.totals = res[0];
              this.singleReport = [];
            }else {
              this.totals = res.pop();
              this.singleReport = res;
            }
          },
          err => {
            console.log(err);
          }
        );
        break;
      case 'All Clients':
      this.others.getAllClients().subscribe(
          res => {
            this.singleReport = res;
          },
          err => {
            console.log(err);
          }
        );
    }
  }
  public openModal(template: TemplateRef<any>, photoUrl: string): any {
    this.imageUrl = photoUrl;
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-dialog-centered' })
    );
  }
}
