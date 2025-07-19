import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [MenuLateralComponent],
  imports: [CommonModule,FontAwesomeModule
],
  exports: [MenuLateralComponent],
})
export class SharedComponentModule {}
