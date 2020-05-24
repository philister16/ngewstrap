import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { NavigationIntereceptorService } from './core/services/navigation-intereceptor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public auth: AuthService, private nav: NavigationIntereceptorService) { }
  title = 'ngewstrap';
}
