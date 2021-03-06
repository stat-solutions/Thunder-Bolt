import { Component, OnInit, Input, HostListener } from '@angular/core';
import { LayoutService } from '../../../shared/services/layout.service';

    // tslint:disable: deprecation

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel-central.component.html',
  styleUrls: ['./left-panel-central.component.scss']
})
export class LeftPanelCentralComponent implements OnInit {
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
        url: '/centralmanagement/dashboard',
      },
      {
        name: 'Creations',
        icon: 'fas fa-wrench',
        url: '/centralmanagement/create',
      },
      {
        name: 'Creation Approvals',
        icon: 'fas fa-cogs',
        url: '/centralmanagement/approve',
      },
      {
        name: 'Select Regions',
        icon: 'fas fa-map-pin',
        url: '/centralmanagement/selectregions'
      },
      {
        name: 'Approve Users',
        icon: 'fas fa-user-check',
        url: '/centralmanagement/approveusers',
      },
      {
        name: 'Managers',
        icon: 'fas fa-users',
        url: '/centralmanagement/managers',
        subMenu: [
          {
            name: 'Regional Managers',
            icon: 'fas fa-credit-card',
            url: '/centralmanagement/managers/regionmanagers',
          },
          {
            name: 'Town Managers',
            icon: 'fas fa-credit-card',
            url: '/centralmanagement/managers/townmanagers',
          },
          {
            name: 'Station Managers',
            icon: 'fas fa-credit-card',
            url: '/centralmanagement/managers/stationmanagers',
          },
        ]
      },
      {
        name: 'Transactions',
        icon: 'fas fa-tools',
        url: '/centralmanagement/transactions',
        subMenu: [
          {
            name: 'Loans',
            icon: 'fas fa-credit-card',
            url: '/centralmanagement/transactions/loans',
          },
          {
            name: 'Approvals',
            icon: 'fas fa-cogs',
            url: '/centralmanagement/transactions/approve',
          },
          {
            name: 'Float',
            icon: 'fas fa-credit-card',
            url: '/centralmanagement/transactions/float',
          },
        ],
      },
      {
        name: 'Reports',
        icon: 'fas fa-chart-line',
        url: '/centralmanagement/reports',
        subMenu: [
          {
            name: 'Loans and Revenue',
            icon: 'fas fa-file',
            url: '/centralmanagement/reports/loansrevenue',
          },
          {
            name: 'Clients',
            icon: 'fas fa-file',
            url: '/centralmanagement/reports/clients',
          },
          {
            name: 'Users',
            icon: 'fas fa-file',
            url: '/centralmanagement/reports/users',
          },
        ],
      },
      {
        name: 'Profile',
        icon: 'fas fa-user-cog',
        url: '/centralmanagement/profile',
      },
    ];
}
}
