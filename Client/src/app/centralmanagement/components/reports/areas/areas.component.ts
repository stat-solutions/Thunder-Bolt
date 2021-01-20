import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { OthersService } from 'src/app/shared/services/other-services/others.service';

export interface clientInfo {
  clientId: number;
  clientUserName: string;
  clientType: Array<string>;
  clientContact: number;
  clientsPhotoUrl: string;
  latestComment: string;
  clientLoan: number;
  loanStatus: string;
  loanInterest: number;
  station: string;
  clientSaving: number;
}
@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss']
})
export class AreasComponent implements OnInit {
  public modalRef: BsModalRef;
  userForm: FormGroup;
  clients: clientInfo;
  user = '/../../../assets/img/man.svg';

  constructor(
    private modalService: BsModalService,
    private authService: AuthServiceService,
    private others: OthersService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.others.getAllLoans().subscribe(
      res => console.log(res),
      err => console.log(err)
    );
  }

  createFormGroup () {
    return this.fb.group({
      userType: this.fb.control(
        '',
        Validators.compose([])
      ),
      arealocation: this.fb.control(
        '',
        Validators.compose([])
      ),
      townlocation: this.fb.control(
        '',
        Validators.compose([])
      ),
      stationLocation: this.fb.control(
        '',
        Validators.compose([])
      )
    })
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'modal-dialog-centered' }));

  }

  createArea(){

  }
}
