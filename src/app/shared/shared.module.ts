import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { BaseComponent } from './components/base/base.component';
import { FormsModule } from '@angular/forms';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';
import { FaIconModule } from '../fa-icon/fa-icon.module';
import { IndicatorButtonComponent } from './components/indicator-button/indicator-button.component';

const sharedDeclarations = [
  BaseComponent,
  PageHeaderComponent,
  LoadingIndicatorComponent,
  IndicatorButtonComponent
];

@NgModule({
  declarations: sharedDeclarations,
  imports: [
    CommonModule,
    FaIconModule,
    FormsModule,
  ],
  exports: sharedDeclarations
})
export class SharedModule { }
