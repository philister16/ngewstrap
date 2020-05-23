import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogInputData } from './dialog-input-data.interface';

@Component({
  selector: 'app-dialog-input',
  templateUrl: './dialog-input.component.html',
  styleUrls: ['./dialog-input.component.scss']
})
export class DialogInputComponent implements OnInit {
  data: DialogInputData;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
