import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AccountComponent } from './account/account.component';
import { UserInfosComponent } from './account/user-infos/user-infos.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserEmailComponent } from './account/user-email/user-email.component';
import { FaIconModule } from '../fa-icon/fa-icon.module';
import { UserPasswordComponent } from './account/user-password/user-password.component';


@NgModule({
  declarations: [
    AccountComponent,
    UserInfosComponent,
    UserEmailComponent,
    UserPasswordComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FaIconModule,
    UserRoutingModule
  ]
})
export class UserModule { }
