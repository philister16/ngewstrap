import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faUserCircle, faBars, faSignOutAlt, faCircleNotch } from '@fortawesome/free-solid-svg-icons';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    FontAwesomeModule
  ]
})
export class FaIconModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faUserCircle);
    library.addIcons(faBars);
    library.addIcons(faSignOutAlt);
    library.addIcons(faCircleNotch);
  }
}
