import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserResolverService } from './user.resolver';
import { DashboardLayoutComponent } from '../app-layout/dashboard-layout/dashboard-layout.component';
import { AccountComponent } from './account/account.component';


const routes: Routes = [
  {
    path: '',
    resolve: { user: UserResolverService },
    component: DashboardLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'account'
      },
      {
        path: 'account',
        component: AccountComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
