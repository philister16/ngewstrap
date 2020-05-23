import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../core/services/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  indicate = false;

  constructor(private loading: LoadingService) { }

  ngOnInit(): void {
  }

  load() {
    this.loading.start();
  }

}
