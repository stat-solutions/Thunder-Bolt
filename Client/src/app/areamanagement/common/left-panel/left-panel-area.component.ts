import { Component, OnInit, Input, HostListener } from '@angular/core';
import { LayoutService } from '../../../shared/services/layout.service';

    // tslint:disable: deprecation

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel-area.component.html',
  styleUrls: ['./left-panel-area.component.scss']
})
export class LeftPanelAreaComponent implements OnInit {
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
        url: '/areamanagement/dashboard',
      },
      {
        name: 'Select Towns',
        icon: 'fas fa-wrench',
        url: '/areamanagement/selecttowns',
      },
      {
        name: 'Approvals',
        icon: 'fas fa-cogs',
        url: '/areamanagement/approvals',
        subMenu: [
          {
            name: 'Verify Clients',
            icon: 'fas fa-clipboard-list',
            url: '/areamanagement/approvals/verifyclients',
          },
          // {
          //   name: 'Loan Approvals',
          //   icon: 'fas fa-clipboard-list',
          //   url: '/areamanagement/approvals/loanapprovals',
          // },
        ],
      },
      {
        name: 'Reports',
        icon: 'fas fa-chart-line',
        url: '/areamanagement/reports',
        subMenu: [
          {
            name: 'Loans and Revenue',
            icon: 'fas fa-clipboard-list',
            url: '/areamanagement/reports/loansrevenue',
          },
          {
            name: 'Clients',
            icon: 'fas fa-clipboard-list',
            url: '/areamanagement/reports/clients',
          },
          {
            name: 'Users',
            icon: 'fas fa-clipboard-list',
            url: '/areamanagement/reports/users',
          },
        ],
      },
      {
        name: 'Profile',
        icon: 'fas fa-user-cog',
        url: '/areamanagement/profile',
      },
    ];
  }
}
