import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RandomGuard } from '../shared/services/other-services/route-guards/random-guard.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PagesCoreOfficerComponent } from './pages-core/pages-core-officer.component';

const routes: Routes = [
  { path: '', 
    component: PagesCoreOfficerComponent,
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
        component:ProfileComponent
      }
    ]   
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StationofficerRoutingModule { }
