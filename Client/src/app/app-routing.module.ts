import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'authpage', redirectTo: '/authpage/login', pathMatch: 'full' },
  {path: '', redirectTo: '/authpage/login', pathMatch: 'full' },
  { path: 'admin-dashboard', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'areamanager', loadChildren: () => import('./areamanager/areamanager.module').then(m => m.AreamanagerModule) },
  { path: 'townmanager', loadChildren: () => import('./townmanager/townmanager.module').then(m => m.TownmanagerModule) },
  { path: 'stationmanager', loadChildren: () => import('./stationmanager/stationmanager.module').then(m => m.StationmanagerModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
