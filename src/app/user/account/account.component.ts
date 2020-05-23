import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { takeUntil, tap } from 'rxjs/operators';
import { BaseComponent } from 'src/app/shared/components/base/base.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent extends BaseComponent implements OnInit {
  currentUser: User;

  constructor(private user: UserService) {
    super();
  }

  ngOnInit(): void {
    this.user.currentUser$
      .pipe(
        takeUntil(this.destroyed$),
        tap(user => {
          if (user) {
            this.currentUser = user;
          }
        })
      )
      .subscribe();
  }
}
