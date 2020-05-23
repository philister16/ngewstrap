import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { User } from './user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map, tap, take, skipWhile } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUser: User;
  private currentUserSubj = new BehaviorSubject<User>(null);

  constructor(private db: AngularFirestore) { }

  /**
   * Returns the current user's state at call time.
   */
  get currentUserSnapshot(): Promise<User> {
    return this.currentUser$.pipe(
      skipWhile(user => !user),
      take(1)
    ).toPromise();
  }

  /**
   * Returns an observable of the current user
   */
  get currentUser$(): Observable<User> {
    return this.currentUserSubj.asObservable().pipe(distinctUntilChanged());
  }

  /**
   * Creates a new user doc in the db
   * @param details User details to be saved to db
   */
  create(user: User): Promise<void> {
    this.setCurrentUser(user);
    const userRef = this.getUserRef(user.uid);
    return userRef.set(user);
  }

  /**
   * Loads a user from the DB and sets it as the currentUser
   * This is useful on app init
   * @param uid Unique ID of user
   */
  get(uid: string): Observable<any> {
    const userRef = this.getUserRef(uid);
    return userRef.get().pipe(
      take(1),
      map((doc) => {
        if (!doc.exists) {
          return null;
        }
        return doc.data();
      }),
      tap((user) => {
        this.setCurrentUser(user as User);
      })
    );
  }

  /**
   * To update the currentUser locally and in the db
   * @param uid Unique ID of user
   * @param update Partial user object of the properties to update
   */
  async update(update: {}): Promise<void> {
    await this.currentUserSnapshot; // to make sure user is present before doing the update
    this.mergeCurrentUser(update);
    const userRef = this.getUserRef(this.currentUser.uid);
    return userRef.set(update, { merge: true });
  }

  /**
   * Deletes the current user from the db
   */
  delete(): Promise<void> {
    this.setCurrentUser(null);
    const userRef = this.getUserRef(this.currentUser.uid);
    return userRef.delete();
  }

  /**
   * Resets the current user to null
   * This is useful upon logout
   */
  reset() {
    this.setCurrentUser(null);
  }

  /**
   * Update the currentUser state
   * The user details passed can be incomplete and will be merged with existing currentUser data
   * To reset the entire current user use `setCurrentUser` instead!
   * @param userPartial A full or partial user object
   */
  private mergeCurrentUser(userPartial: {}) {
    this.currentUser = { ...this.currentUser, ...userPartial };
    this.currentUserSubj.next(this.currentUser);
  }

  /**
   * Reset the entire current user
   * To only update the current user and merge in new data use `mergeCurrentUser` instead.
   * @param user A full user object
   */
  private setCurrentUser(user: User) {
    this.currentUser = user;
    this.currentUserSubj.next(this.currentUser);
  }

  /**
   * Returns a reference to Firestore
   * @param uid Unique ID of current user
   */
  private getUserRef(uid: string): AngularFirestoreDocument<any> {
    return this.db.doc(`/users/${uid}`);
  }
}
