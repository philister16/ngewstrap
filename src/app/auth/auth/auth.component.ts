import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { takeUntil, tap, take, map, finalize } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Observable, timer } from 'rxjs';

enum Mode {
  LOGIN = 'login',
  SIGNUP = 'signup',
  FORGOT = 'forgot',
  RESET = 'reset',
  ACTION = 'action'
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent extends BaseComponent implements OnInit {
  mode: Mode;
  Mode = Mode;
  user: Observable<any>;
  isLoading = false;
  alertType: 'info' | 'danger' | 'success';
  alertMessage: string;
  navCountdown: number;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        takeUntil(this.destroyed$),
        tap((val) => {
          this.mode = val.mode;
          this.alertMessage = undefined;
          if (this.mode === Mode.ACTION) {
            const { mode, oobCode } = this.route.snapshot.queryParams;
            this.handleAction(mode, oobCode);
          }
        })
      )
      .subscribe();
  }

  async onSubmit(authForm: NgForm) {
    if (authForm.invalid) {
      return;
    }
    this.isLoading = true;

    try {
      if (this.mode === Mode.SIGNUP) {
        await this.auth.signup(authForm.value);
      } else if (this.mode === Mode.LOGIN) {
        await this.auth.login(authForm.value);
      } else if (this.mode === Mode.FORGOT) {
        await this.auth.requestPasswordReset(authForm.value.email);
        this.setAlert('success', `Click the reset link sent to ${authForm.value.email} to set a new password.`);
      } else if (this.mode === Mode.RESET) {
        const { oobCode } = this.route.snapshot.queryParams;
        const { password } = authForm.value;
        await this.auth.resetPassword(oobCode, password);
        this.setAlert('success', 'Reset successful. Use new password to login.');
        this.navigateAfterCountdown(5, '/auth/login');
      }
    } catch (err) { } finally { this.isLoading = false; }
  }

  async handleAction(actionMode: string, actionCode: string) {
    if (!actionMode || !actionCode) {
      this.setAlert('danger', 'No action defined. Check if URL is correct.');
      this.navigateAfterCountdown(5, '/');
      return;
    }

    this.isLoading = true;
    try {
      if (actionMode === 'verifyEmail') {
        await this.auth.verifyEmail(actionCode);
        this.setAlert('success', 'Email verified successfully.');
        this.navigateAfterCountdown(5, '/');
      } else if (actionMode === 'recoverEmail') {
        await this.auth.recoverEmail(actionCode);
        this.setAlert('success', 'Your previous email was restored. Change your password if you think your account was compromised.');
        this.navigateAfterCountdown(5, '/auth');
      } else if (actionMode === 'resetPassword') {
        await this.auth.verifyPasswordResetCode(actionCode);
        this.router.navigate(['..', 'reset'], { relativeTo: this.route, queryParamsHandling: 'preserve' });
      }
    } catch (err) {
      this.setAlert('danger', err.message);
      throw err;
    } finally { this.isLoading = false; }
  }

  private navigateAfterCountdown(start: number, path: string) {
    return timer(100, 1000).pipe(
      map(i => start - i),
      tap(i => this.navCountdown = i),
      take(start + 1),
      finalize(() => {
        this.router.navigateByUrl(path);
      })
    ).subscribe();
  }

  private setAlert(type: 'danger' | 'info' | 'success', message: string) {
    this.alertType = type;
    this.alertMessage = message;
  }

}
