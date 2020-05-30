import { Component, OnInit } from '@angular/core';
import { MAIN_MENU } from 'src/menus/main.menu';
import { AppMenuItem } from 'src/menus/menu-item.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/user/user.service';
import { User } from 'src/app/user/user.model';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit {
  isCollapsed = true;
  mainMenu: AppMenuItem[] = MAIN_MENU;
  userInfo: User;
  userInitials: string;

  constructor(public auth: AuthService, public user: UserService) { }

  ngOnInit(): void {
    this.user.currentUserSnapshot.then(user => {
      this.userInfo = user;
      this.userInitials = user.userInfos.firstname.charAt(0) + user.userInfos.lastname.charAt(0);
    });
  }

}
