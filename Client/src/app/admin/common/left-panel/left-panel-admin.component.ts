import { Component, OnInit, Input, HostListener } from '@angular/core';
import { LayoutService } from '../../../shared/services/layout.service';

    // tslint:disable: deprecation

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel-admin.component.html',
  styleUrls: ['./left-panel-admin.component.scss']
})
export class LeftPanelAdminComponent implements OnInit {
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
        url: '/admin/dashboard'
      },
      {
        name: 'Company',
        icon: 'fas fa-briefcase',
        url: '/admin/companysetup'
      },
      {
        name: 'Business Units',
        icon: 'fa fa-tools',
        url: '/admin/businessunits'
      },
      {
        name: 'Approvals',
        icon: 'fas fa-users-cog',
        url: '/admin/approvalsetup'
      },
      {
        name: 'Profile',
        icon: 'fas fa-user-cog',
        url: '/admin/adminprofile',
        subMenu: [
          {
            name: 'Personal Info',
            icon: 'fas fa-user',
            url: '/admin/adminprofile/personalprofile'
          },
          {
            name: 'Set PIN',
            icon: 'fas fa-lock',
            url: '/admin/adminprofile/setpassword'
          }
                        ]
      }
    ];
  }
}
