import { Component, OnInit, Input, HostListener } from '@angular/core';
import { LayoutService } from '../../../shared/services/layout.service';

    // tslint:disable: deprecation

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel-officer.component.html',
  styleUrls: ['./left-panel-officer.component.scss']
})
export class LeftPanelOfficerComponent implements OnInit {
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
        url: '/stationofficer/dashboard',
      },
      {
        name: 'Lend',
        icon: 'fas fa-balance-scale-left',
        url: '/stationofficer/lend',
      },
      {
        name: 'Pay',
        icon: 'fas fa-exchange-alt',
        url: '/stationofficer/pay',
      },
      {
        name: 'Savings',
        icon: 'fas fa-piggy-bank',
        url: '/stationofficer/savings',
        subMenu: [
          {
            name: 'Deposit',
            icon: 'fas fa-piggy-bank',
            url: '/stationofficer/savings/deposit',
          },
          {
            name: 'Withdraw',
            icon: 'fas fa-piggy-bank',
            url: '/stationofficer/savings/withdraw',
          },
        ],
      },
      {
        name: 'Adjustments',
        icon: 'fas fa-tools',
        url: '/stationofficer/adjustments',
        subMenu: [
          {
            name: 'Set Loan limit',
            icon: 'fas fa-wrench',
            url: '/stationofficer/adjustments/setloanlimit',
          },
          {
            name: 'Reduce Interest rate',
            icon: 'fas fa-wrench',
            url: '/stationofficer/adjustments/reduceinterestrate',
          },
          {
            name: 'Waive Interest',
            icon: 'fas fa-wrench',
            url: '/stationofficer/adjustments/waiveinterest',
          },
          {
            name: 'Write-Off Principal',
            icon: 'fas fa-wrench',
            url: '/stationofficer/adjustments/writeoffprincipal',
          },
          {
            name: 'Reverse Principal',
            icon: 'fas fa-wrench',
            url: '/stationofficer/adjustments/reverseprincipal',
          },
          {
            name: 'Set Interest rate',
            icon: 'fas fa-wrench',
            url: '/stationofficer/adjustments/setinterestrate',
          },
        ],
      },
      {
        name: 'Reports',
        icon: 'fas fa-chart-line',
        url: '/stationofficer/reports',
        subMenu: [
          {
            name: 'Loans and Revenue',
            icon: 'fas fa-clipboard-list',
            url: '/stationofficer/reports/loansrevenue',
          },
          {
            name: 'Client Reports',
            icon: 'fas fa-clipboard-list',
            url: '/stationofficer/reports/clients',
          },
          {
            name: 'User Reports',
            icon: 'fas fa-clipboard-list',
            url: '/stationofficer/reports/users',
          },
        ],
      },
      {
        name: 'Profile',
        icon: 'fas fa-user-cog',
        url: '/stationofficer/profile',
      },
    ];
  }
}
