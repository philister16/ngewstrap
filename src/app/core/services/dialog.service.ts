import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogInputComponent } from '../components/dialog-input/dialog-input.component';
import { DialogInputData } from '../components/dialog-input/dialog-input-data.interface';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private modal: NgbModal) { }

  get enterPassword() {
    const data: DialogInputData = {
      title: 'Enter password',
      content: 'Type your password and click continue.',
      label: 'Password',
      inputType: 'password',
      value: null,
      continue: 'Continue'
    };
    const ref = this.modal.open(DialogInputComponent, { centered: true, size: 'sm' });
    ref.componentInstance.data = data;
    return ref.result;
  }
}
