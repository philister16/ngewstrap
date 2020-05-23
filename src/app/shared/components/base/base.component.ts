import { Component, OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-base-component',
  template: ''
})
export class BaseComponent implements OnDestroy {
  public destroyed$ = new ReplaySubject<boolean>(1);

  constructor() { }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
