import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PagesCoreAreaComponent } from './pages-core/pages-core-area.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TownsComponent } from './components/towns/towns.component';

const routes: Routes = [
  { path: '',
    component: PagesCoreAreaComponent, 
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {
        path: 'dashboard',
       component: DashboardComponent,
      },
      {
        path: 'towns',
       component: TownsComponent,
      },
      {
        path: 'profile',
       component: ProfileComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AreamanagementRoutingModule { }
