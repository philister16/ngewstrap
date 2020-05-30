import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { FaIconModule } from '../fa-icon/fa-icon.module';
import { NgbCollapseModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [DashboardLayoutComponent],
  imports: [
    CommonModule,
    SharedModule,
    FaIconModule,
    RouterModule,
    NgbCollapseModule,
    NgbDropdownModule
  ]
})
export class AppLayoutModule { }
