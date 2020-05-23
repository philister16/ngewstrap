import { Component, OnInit } from '@angular/core';
import { FlashService } from '../../services/flash.service';

@Component({
  selector: 'app-flash',
  templateUrl: './flash.component.html',
  styleUrls: ['./flash.component.scss']
})
export class FlashComponent implements OnInit {

  constructor(public flash: FlashService) { }

  ngOnInit(): void {
  }

}
