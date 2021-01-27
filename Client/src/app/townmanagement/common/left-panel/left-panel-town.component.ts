import { Component, OnInit, Input, HostListener } from '@angular/core';
import { LayoutService } from '../../../shared/services/layout.service';

    // tslint:disable: deprecation

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel-town.component.html',
  styleUrls: ['./left-panel-town.component.scss']
})
export class LeftPanelTownComponent implements OnInit {
  asidebarHeight: number;

  @Input() navLayout: string;
  @Input() defaultNavbar: string;
  @Input() toggleNavbar: string;
  @Input() toggleStatus: boolean;
  @Input() navbarEffect: string;
  @Input() deviceType: string;
  @Input() headerColorTheme: string;
  @Input() navbarColorTheme: string;
  @Input() activeNavColorTheme: string;
  imageurl = '../../../../assets/avatar3.jpg';
  title: any;
  menuList: any;
  selected: any;
  userName: any;
  constructor(private layoutService: LayoutService) {}

  isActive(item): any  {
    return this.selected === item;
  }
  onItemSelect(item): any  {
    this.selected = this.selected === item ? item : item;
  }
  onSubItemSelect(item): any  {
    event.stopPropagation();
    this.selected = this.selected === item ? item : item;
  }

  @HostListener('window:resize', ['$event'])
  onResizeHeight(event: any): any {
    this.asidebarHeight = window.innerHeight;
  }

  ngOnInit(): void {
    this.layoutService.setAsidebarHeightCast.subscribe(
      setSidebarHeight => (this.asidebarHeight = setSidebarHeight)
    );

    this.title = 'Navigation';

    this.menuList = [
      {
        name: 'Dashboard',
        icon: 'fas fa-tachometer-alt',
        url: '/townmanagement/dashboard',
      },
      {
        name: 'Select Stations',
        icon: 'fas fa-gas-pump',
        url: '/townmanagement/createstation',
      },
      {
        name: 'Micro Loan',
        icon: 'fas fa-money-bill',
        url: '/townmanagement/microloan',
      },
      {
        name: 'Enroll',
        icon: 'fas fa-user-plus',
        url: '/townmanagement/enroll',
        subMenu: [
          {
            name: 'Enroll Client',
            icon: 'fas fa-user',
            url: '/townmanagement/enroll/enrollclient',
          },
          {
            name: 'Enroll Stage',
            icon: 'fas fa-parking',
            url: '/townmanagement/enroll/enrollstage',
          },
          {
            name: 'Cluster & Taxi Park',
            icon: 'fas fa-parking',
            url: '/townmanagement/enroll/clustertaxipark',
          },
          {
            name: 'Edit Client',
            icon: 'fas fa-user',
            url: '/townmanagement/enroll/editclient',
          },
          {
            name: 'Edit Stage',
            icon: 'fas fa-parking',
            url: '/townmanagement/enroll/editstage',
          },
        ],
      },
      {
        name: 'Adjustments',
        icon: 'fas fa-tools',
        url: '/townmanagement/adjustments',
        subMenu: [
          {
            name: 'Loan limit',
            icon: 'fas fa-wrench',
            url: '/townmanagement/adjustments/setloanlimit',
          },
          {
            name: 'Interest rate',
            icon: 'fas fa-wrench',
            url: '/townmanagement/adjustments/setinterestrate',
          },
          {
            name: 'Loan Tenure',
            icon: 'fas fa-wrench',
            url: '/townmanagement/adjustments/loantenure',
          },
          {
            name: 'Loan Accrual Days',
            icon: 'fas fa-wrench',
            url: '/townmanagement/adjustments/accrualdays',
          },
          {
            name: 'Loan Amortization Cycle',
            icon: 'fas fa-wrench',
            url: '/townmanagement/adjustments/loanamortizecycle',
          },
          {
            name: 'Loan Amortization Type',
            icon: 'fas fa-wrench',
            url: '/townmanagement/adjustments/loanamortizetype',
          },
          {
            name: 'Waive Interest',
            icon: 'fas fa-wrench',
            url: '/townmanagement/adjustments/waiveinterest',
          },
          {
            name: 'Write-Off Principal',
            icon: 'fas fa-wrench',
            url: '/townmanagement/adjustments/writeoffprincipal',
          },
          {
            name: 'Reverse Interest',
            icon: 'fas fa-wrench',
            url: '/townmanagement/adjustments/reverseinterest',
          },
          {
            name: 'Reverse Principal',
            icon: 'fas fa-wrench',
            url: '/townmanagement/adjustments/reverseprincipal',
          },
        ],
      },
      {
        name: 'Client Comments',
        icon: 'fas fa-comments',
        url: '/townmanagement/clientcomments',
      },
      {
        name: 'Reports',
        icon: 'fas fa-chart-line',
        url: '/townmanagement/reports',
        subMenu: [
          {
            name: 'Loans and Revenue',
            icon: 'fas fa-clipboard-list',
            url: '/townmanagement/reports/loansrevenue',
          },
          {
            name: 'Clients',
            icon: 'fas fa-clipboard-list',
            url: '/townmanagement/reports/clients',
          },
          {
            name: 'Users',
            icon: 'fas fa-clipboard-list',
            url: '/townmanagement/reports/users',
          },
        ],
      },
      {
        name: 'Profile',
        icon: 'fas fa-user-cog',
        url: '/townmanagement/profile',
      },
    ];
  }
}
