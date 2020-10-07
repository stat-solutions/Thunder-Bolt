import { Component, OnInit, Input, HostListener } from '@angular/core';
import { LayoutService } from '../../../shared/services/layout.service';

    // tslint:disable: deprecation

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel-station.component.html',
  styleUrls: ['./left-panel-station.component.scss']
})
export class LeftPanelStationComponent implements OnInit {
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
        url: '/stationmanagement/dashboard'
      },
      {
        name: 'Reports',
        icon: 'fas fa-chart-line',
        url: '/stationmanagement/reports',
        subMenu: [
          {
            name: 'Borrowed Ledger',
            icon: 'fas fa-chart-line',
            url: '/stationmanagement/reports/borrowedledger',
          },
          {
            name: 'Cash Ledger',
            icon: 'fas fa-chart-line',
            url: '/stationmanagement/reports/cashledger',
          },
          {
            name: 'Paid Ledger',
            icon: 'fas fa-chart-line',
            url: '/stationmanagement/reports/paidledger',
          }
        ]
      },
      {
        name: 'Profile',
        icon: 'fas fa-user-cog',
        url: '/stationmanagement/profile',
        subMenu: [
          {
            name: 'Personal Info',
            icon: 'fas fa-user',
            url: '/stationmanagement/profile/personalprofile'
          },
          {
            name: 'Set PIN',
            icon: 'fas fa-lock',
            url: '/stationmanagement/profile/setpassword'
          }
                        ]
      }
    ];
  }
}
