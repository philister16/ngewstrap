import { TestBed } from '@angular/core/testing';

import { NavigationIntereceptorService } from './navigation-intereceptor.service';

describe('NavigationIntereceptorService', () => {
  let service: NavigationIntereceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigationIntereceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
