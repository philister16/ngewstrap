import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { NgbToastModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FlashComponent } from './components/flash/flash.component';
import { DialogInputComponent } from './components/dialog-input/dialog-input.component';



@NgModule({
  declarations: [NotFoundComponent, FlashComponent, DialogInputComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgbToastModule,
    NgbModalModule
  ],
  exports: [FlashComponent]
})
export class CoreModule { }
