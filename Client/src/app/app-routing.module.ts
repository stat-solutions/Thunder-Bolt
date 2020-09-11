import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: 'admin-dashboard', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }, { path: 'admin-dashboard', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
