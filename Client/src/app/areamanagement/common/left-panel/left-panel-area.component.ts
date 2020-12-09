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
        url: '/areamanagement/dashboard'
      },
      {
        name: 'Creation',
        icon: 'fas fa-wrench',
        url: '/areamanagement/createtowns'
      },
      {
        name: 'Approvals',
        icon: 'fas fa-cogs',
        url: '/areamanagement/approvals'
        },
      {
        name: 'Reports',
        icon: 'fas fa-chart-line',
        url: '/areamanagement/reports'
        // subMenu: [
        //   {
        //     name: 'Towns',
        //     icon: 'fas fa-clipboard-list',
        //     url: '/areamanagement/reports/townsreports'
        //   },
        //   {
        //     name: 'Stations',
        //     icon: 'fas fa-clipboard-list',
        //     url: '/areamanagement/reports/stationsreports'
        //   },
        //   {
        //     name: 'Clients',
        //     icon: 'fas fa-clipboard-list',
        //     url: '/areamanagement/reports/clientsreports'
        //   },
        //   {
        //     name: 'Users',
        //     icon: 'fas fa-user-cog',
        //     url: '/areamanagement/reports/usersreports'
        //   }
        // ]
      },
      {
        name: 'Profile',
        icon: 'fas fa-user-cog',
        url: '/areamanagement/profile',
      }
    ];
  }
}
