import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/services/other-services/route-guards/auth-guard.service';

const routes: Routes = [
  { path: 'authpage', redirectTo: '/authpage/login', pathMatch: 'full', },
  {
    path: '',
    redirectTo: '/authpage/login',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  // tslint:disable-next-line: max-line-length
  { path: 'centralmanagement', loadChildren: () => import('./centralmanagement/centralmanagement.module').then(m => m.CentralmanagementModule) },
  { path: 'areamanagement', loadChildren: () => import('./areamanagement/areamanagement.module').then(m => m.AreamanagementModule) },
  { path: 'townmanagement', loadChildren: () => import('./townmanagement/townmanagement.module').then(m => m.TownmanagementModule) },
  // tslint:disable-next-line: max-line-length
  { path: 'stationmanagement', loadChildren: () => import('./stationmanagement/stationmanagement.module').then(m => m.StationmanagementModule) },
  { path: 'stationofficer', loadChildren: () => import('./stationofficer/stationofficer.module').then(m => m.StationofficerModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
