import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AreasComponent } from './components/areas/areas.component';
import { ClustersComponent } from './components/clusters/clusters.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { StationsComponent } from './components/stations/stations.component';
import { TownsComponent } from './components/towns/towns.component';
import { PagesCoreCentralComponent } from './pages-core/pages-core-central.component';

const routes: Routes = [
  { path: '', 
    component: PagesCoreCentralComponent,
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
        path: 'areas',
        component: AreasComponent
      },
      {
        path: 'towns',
        component: TownsComponent
      },
      {
        path: 'stations',
        component: StationsComponent
      },
      {
        path: 'clusters',
        component: ClustersComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      }
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CentralmanagementRoutingModule { }
