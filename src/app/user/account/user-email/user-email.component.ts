import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { DialogService } from 'src/app/core/services/dialog.service';

@Component({
  selector: 'app-user-email',
  templateUrl: './user-email.component.html',
  styleUrls: ['./user-email.component.scss']
})
export class UserEmailComponent implements OnInit {
  @Input() email: string;
  @Input() emailVerified: boolean;
  emailForm: FormGroup;
  hasNewEmailField = false;
  isLoading = false;
  isSending = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private dialog: DialogService) { }

  ngOnInit(): void {
    this.emailForm = this.fb.group({
      email: [this.email],
      newEmail: [null, [Validators.required, Validators.email]]
    });
  }

  async onSave() {
    this.emailForm.markAllAsTouched();
    if (this.emailForm.invalid) {
      return;
    }

    try {
      const pwd = await this.dialog.enterPassword;
      if (!pwd) {
        return;
      }
      this.isLoading = true;
      await this.auth.updateEmail(this.emailForm.value.newEmail, this.email, pwd);
      this.emailForm.patchValue({ email: this.emailForm.value.newEmail });
      this.hasNewEmailField = false;
    } catch (err) { } finally { this.isLoading = false; }
  }

  async resendEmailVerification() {
    try {
      this.isSending = true;
      await this.auth.resendEmailVerificationCode();
      this.isSending = false;
    } catch (err) { }
  }

}
