import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private isLoading = new BehaviorSubject<boolean>(false);
  state$: Observable<boolean> = this.isLoading
    .asObservable()
    .pipe(distinctUntilChanged());

  constructor() { }

  start() {
    this.isLoading.next(true);
  }

  stop() {
    this.isLoading.next(false);
  }
}
