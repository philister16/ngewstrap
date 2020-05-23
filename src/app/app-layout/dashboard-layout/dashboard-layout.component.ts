import { Component, OnInit } from '@angular/core';
import { MAIN_MENU } from 'src/menus/main.menu';
import { AppMenuItem } from 'src/menus/menu-item.interface';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit {
  isCollapsed = true;
  mainMenu: AppMenuItem[] = MAIN_MENU;

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

}
