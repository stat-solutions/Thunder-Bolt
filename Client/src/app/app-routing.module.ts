import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'authpage', redirectTo: '/authpage/login', pathMatch: 'full' },
  {path: '', redirectTo: '/authpage/login', pathMatch: 'full' },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'centralmanagement', loadChildren: () => import('./centralmanagement/centralmanagement.module').then(m => m.CentralmanagementModule) },
  { path: 'stationmanagement', loadChildren: () => import('./stationmanagement/stationmanagement.module').then(m => m.StationmanagementModule) },
  { path: 'townmanagement', loadChildren: () => import('./townmanagement/townmanagement.module').then(m => m.TownmanagementModule) },
  { path: 'areamanagement', loadChildren: () => import('./areamanagement/areamanagement.module').then(m => m.AreamanagementModule) },
  { path: 'stationofficer', loadChildren: () => import('./stationofficer/stationofficer.module').then(m => m.StationofficerModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
