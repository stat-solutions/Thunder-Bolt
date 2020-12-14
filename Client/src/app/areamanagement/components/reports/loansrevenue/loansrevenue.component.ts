import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

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
  selector: 'app-loansrevenue',
  templateUrl: './loansrevenue.component.html',
  styleUrls: ['./loansrevenue.component.scss'],
})
export class LoansrevenueComponent implements OnInit {
  public modalRef: BsModalRef;
  userForm: FormGroup;
  clients: clientInfo;
  user = '/../../../assets/img/man.svg';

  constructor(private fb: FormBuilder, private modalService: BsModalService) {}

  ngOnInit(): void {}

  createFormGroup() {
    return this.fb.group({
      userType: this.fb.control('', Validators.compose([])),
      arealocation: this.fb.control('', Validators.compose([])),
      townlocation: this.fb.control('', Validators.compose([])),
      stationLocation: this.fb.control('', Validators.compose([])),
    });
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-dialog-centered' })
    );
  }

  createArea() {}
}
