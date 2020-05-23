import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<User> {

  constructor(private user: UserService) { }

  resolve(): Observable<User> | Promise<User> {
    return this.user.currentUserSnapshot;
  }
}
