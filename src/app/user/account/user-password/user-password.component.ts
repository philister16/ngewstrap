import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-user-password',
  templateUrl: './user-password.component.html',
  styleUrls: ['./user-password.component.scss']
})
export class UserPasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  showForm = false;
  isLoading = false;
  isSuccess = false;

  constructor(private fb: FormBuilder, private auth: AuthService) { }

  ngOnInit(): void {
    this.changePasswordForm = this.fb.group({
      password: [null, [Validators.required]],
      newPassword: [null, [Validators.required, Validators.minLength(8)]]
    });
  }

  async onSave() {
    this.changePasswordForm.markAllAsTouched();
    if (this.changePasswordForm.invalid) {
      return;
    }
    this.isLoading = true;
    try {
      const { password, newPassword } = this.changePasswordForm.value;
      await this.auth.updatePassword(password, newPassword);
      this.isSuccess = true;
      this.showForm = false;
      this.changePasswordForm.reset();
    } catch (err) { } finally { this.isLoading = false; }
  }

}
