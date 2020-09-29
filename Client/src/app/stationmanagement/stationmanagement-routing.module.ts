import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PagesCoreStationComponent } from './pages-core/pages-core-station.component';
import { RandomGuard } from '../shared/services/other-services/route-guards/random-guard.service';

const routes: Routes = [
  { path: '', 
    component: PagesCoreStationComponent,
    canActivateChild: [RandomGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      }
    ] 
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StationmanagementRoutingModule { }
