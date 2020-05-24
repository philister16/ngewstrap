import { Injectable } from '@angular/core';
import { Router, RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { tap } from 'rxjs/operators';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationIntereceptorService {

  constructor(private router: Router, private loading: LoadingService) {
    router.events.pipe(
      tap((event: RouterEvent) => {
        if (event instanceof NavigationStart) {
          this.loading.start();
        }

        if (
          event instanceof NavigationEnd
          || event instanceof NavigationCancel
          || event instanceof NavigationError) {
          this.loading.stop();
        }
      })
    ).subscribe();
  }
}
