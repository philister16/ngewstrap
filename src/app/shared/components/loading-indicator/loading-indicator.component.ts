import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/core/services/loading.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.scss']
})
export class LoadingIndicatorComponent implements OnInit {
  isLoading$: Observable<boolean>;

  constructor(private loading: LoadingService) { }

  ngOnInit(): void {
    this.isLoading$ = this.loading.state$;
  }

}
