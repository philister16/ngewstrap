import { Component, OnInit, Input } from '@angular/core';
import { UserInfos } from '../../user.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { tap, takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { UserService } from '../../user.service';
import { FlashService } from 'src/app/core/services/flash.service';

@Component({
  selector: 'app-user-infos',
  templateUrl: './user-infos.component.html',
  styleUrls: ['./user-infos.component.scss']
})
export class UserInfosComponent extends BaseComponent implements OnInit {
  @Input() userInfos: UserInfos = {};
  userInfosForm: FormGroup;
  isDirty = false;
  isLoading = false;

  constructor(private fb: FormBuilder, private user: UserService, private flash: FlashService) {
    super();
  }

  ngOnInit() {
    this.userInfosForm = this.fb.group({
      gender: [this.userInfos.gender],
      firstname: [this.userInfos.firstname],
      lastname: [this.userInfos.lastname],
      address: [this.userInfos.address],
      address2: [this.userInfos.address2],
      postalCode: [this.userInfos.postalCode],
      city: [this.userInfos.city],
      state: [this.userInfos.state],
      country: [this.userInfos.country]
    });
    this.userInfosForm.valueChanges.pipe(
      tap(() => this.isDirty = true),
      takeUntil(this.destroyed$)
    ).subscribe();
  }

  async onSave() {
    try {
      this.isLoading = true;
      await this.user.update({ userInfos: this.userInfosForm.value });
      this.isDirty = false;
    } catch (err) {
      this.flash.err(err.message);
    } finally {
      this.isLoading = false;
    }
  }

}
