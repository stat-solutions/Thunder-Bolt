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
        url: '/townmanagement/dashboard'
      },
      {
        name: 'Create Station',
        icon: 'fas fa-gas-pump',
        url: '/townmanagement/createstation'
      },
      {
        name: 'Enroll',
        icon: 'fas fa-user',
        url: '/townmanagement/enroll',
        subMenu: [
          {
            name: 'Enroll Client',
            icon: 'fas fa-user',
            url: '/townmanagement/enroll/enrollclient'
          },
          {
            name: 'Enroll Stage',
            icon: 'fas fa-parking',
            url: '/townmanagement/enroll/enrollstage'
          },
          {
            name: 'Cluster & Taxi Park',
            icon: 'fas fa-parking',
            url: '/townmanagement/enroll/clustertaxipark'
          },
          {
            name: 'Edit Client',
            icon: 'fas fa-user',
            url: '/townmanagement/enroll/editclient'
          },
          {
            name: 'Edit Stage',
            icon: 'fas fa-parking',
            url: '/townmanagement/enroll/editstage'
          },
        ]
      },
      {
        name: 'Reports',
        icon: 'fas fa-chart-line',
        url: '/townmanagement/reports',
        subMenu: [
          {
            name: 'Cash Ledger',
            icon: 'fas fa-clipboard-list',
            url: '/townmanagement/reports/cashledger'
          },
          {
            name: 'Loans Ledger',
            icon: 'fas fa-clipboard-list',
            url: '/townmanagement/reports/loansledger'
          },
          {
            name: 'Payments Ledger',
            icon: 'fas fa-clipboard-list',
            url: '/townmanagement/reports/paidledger'
          }
                ]
      },
      // {
      //   name: 'Approve Users',
      //   icon: 'fas fa-user-check',
      //   url: '/townmanagement/approveusers',
      //       },
                  {
        name: 'Profile',
        icon: 'fas fa-user-cog',
        url: '/townmanagement/profile',
        subMenu: [
          {
            name: 'Personal Info',
            icon: 'fas fa-user',
            url: '/townmanagement/profile/personalprofile'
          },
          {
            name: 'Set PIN',
            icon: 'fas fa-lock',
            url: '/townmanagement/profile/setpassword'
          }
                        ]
      }
    ];
  }
}
