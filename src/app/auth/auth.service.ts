import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingService } from '../core/services/loading.service';
import { of } from 'rxjs';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { switchMap, take, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FlashService } from '../core/services/flash.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private redirect: string;

  constructor(
    private afAuth: AngularFireAuth,
    private user: UserService,
    private flash: FlashService,
    private loader: LoadingService,
    private router: Router
  ) {
    this.afAuth.authState
      .pipe(
        switchMap(usr => {
          if (usr) {
            return this.user.get(usr.uid);
          } else {
            return of(null);
          }
        })
      )
      .subscribe();
  }

  async signup(signupForm) {
    const { firstname, lastname, email, password } = signupForm;
    try {
      const credentials = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      const newUser: User = {
        uid: credentials.user.uid,
        email,
        userInfos: { firstname, lastname },
        emailVerified: credentials.user.emailVerified,
      };
      await this.user.create(newUser);
      await this.afAuth.useDeviceLanguage();
      await credentials.user.sendEmailVerification();
      this.router.navigateByUrl(environment.afterSignupPath);
    } catch (err) {
      this.flashError(err.message);
      throw err;
    }
  }

  async login(credentials: { email: string; password: string }) {
    const { email, password } = credentials;
    try {
      const cred = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      // await this.user.get(cred.user.uid).toPromise();
      const path = this.redirectPath
        ? this.redirectPath
        : environment.afterLoginPath;
      this.router.navigateByUrl(path);
    } catch (err) {
      this.flashError(err.message);
      throw err;
    }
  }

  /**
   * Simple wrapper to authenticate a user
   * Useful when reauthenticating for specific actions without a full login workflow with redirects
   * @param email user email
   * @param password user password
   */
  async authenticate(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async logout() {
    this.loader.start();
    try {
      this.user.reset();
      await this.afAuth.signOut();
      this.router.navigateByUrl(environment.afterLogoutPath);
    } catch (err) {
      this.flashError(err.message);
      throw err;
    } finally {
      this.loader.stop();
    }
  }

  async requestPasswordReset(email: string) {
    try {
      await this.afAuth.sendPasswordResetEmail(email);
    } catch (err) {
      this.flashError(err.message);
      throw err;
    }
  }

  async verifyPasswordResetCode(code: string) {
    return this.afAuth.verifyPasswordResetCode(code);
  }

  async resetPassword(code: string, newPassword: string) {
    try {
      await this.afAuth.confirmPasswordReset(code, newPassword);
    } catch (err) {
      this.flashError(err.message);
      throw err;
    }
  }

  async updatePassword(oldPassword: string, newPassword: string) {
    try {
      const { email } = await this.user.currentUserSnapshot;
      const cred = await this.authenticate(email, oldPassword);
      await cred.user.updatePassword(newPassword);
    } catch (err) {
      this.flashError(err.message);
      throw err;
    }
  }

  async resendEmailVerificationCode() {
    try {
      this.afAuth.useDeviceLanguage();
      await (await this.afAuth.currentUser).sendEmailVerification();
      this.flash.info('Email verification code sent.');
    } catch (err) {
      this.flash.err(err.message);
    }
  }

  async verifyEmail(code: string) {
    try {
      await this.afAuth.applyActionCode(code);
      await this.user.update({ emailVerified: true });
    } catch (err) {
      throw err;
    }
  }

  async updateEmail(newEmail: string, oldEmail: string, password: string) {
    try {
      await this.authenticate(oldEmail, password);
      const afAuthUser = await this.afAuth.currentUser;
      await afAuthUser.updateEmail(newEmail);
      this.afAuth.useDeviceLanguage();
      await afAuthUser.sendEmailVerification();
      await this.user.update({ email: newEmail, emailVerified: false });
    } catch (err) {
      this.flashError(err.message);
      throw err;
    }
  }

  async recoverEmail(code: string) {
    try {
      const info = await this.afAuth.checkActionCode(code);
      const { email } = info.data;
      await this.afAuth.applyActionCode(code);
      await this.user.update({ email, emailVerified: false });
    } catch (err) {
      this.flashError(err.message);
      throw err;
    }
  }

  isLoggedIn() {
    return this.afAuth.authState.pipe(
      take(1),
      map((user) => {
        return !!user;
      })
    );
  }

  setRedirect(path: string) {
    this.redirect = path;
  }

  get redirectPath() {
    return this.redirect;
  }

  private flashError(message: string) {
    this.flash.err(message);
  }
}
