import { Component, OnInit, Input } from '@angular/core';
import { LayoutService } from '../../../shared/services/layout.service';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.scss']
})
export class HeaderAdminComponent implements OnInit {
  @Input() navLayout: string;
  @Input() defaultNavbar: string;
  @Input() toggleNavbar: string;
  @Input() toggleStatus: boolean;
  @Input() navbarEffect: string;
  @Input() deviceType: string;
  @Input() headerColorTheme: string;
  @Input() leftHeaderColorTheme: string;
  @Input() navbarColorTheme: string;
  @Input() activeNavColorTheme: string;
  @Input() headerHeight: number;
  @Input() collapsedLeftHeader: boolean;

  user = '/../../../assets/avatar3.jpg';
  userName: string;
  serviceErrors: any;

  constructor(private layoutService: LayoutService,
              private authService: AuthServiceService,
              private router: Router) {}

  ngOnInit() {

  }

  changeTheToggleStatus() {
    this.layoutService.getToggleStatus();
  }
  logoutUser() {
    // this.spinner.show();
    this.serviceErrors = 'Bye bye!';
    setTimeout(() => {
      this.router.navigate(['authpage/login']);

      // this.spinner.hide();
      }, 1000);


  }

}
