import { Component, OnInit } from '@angular/core';
import { MAIN_MENU } from 'src/menus/main.menu';
import { AppMenuItem } from 'src/menus/menu-item.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/user/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit {
  isCollapsed = true;
  mainMenu: AppMenuItem[] = MAIN_MENU;
  userInitials: string;
  version: string;

  constructor(public auth: AuthService, public user: UserService) { }

  ngOnInit(): void {
    this.user.currentUserSnapshot.then(user => {
      this.userInitials = user.userInfos.firstname.charAt(0) + user.userInfos.lastname.charAt(0);
    });
    this.version = environment.version;
  }

}
