import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { ContainerComponent } from './container/container.component';

@NgModule({
  declarations: [MenuLateralComponent, ContainerComponent],
  imports: [CommonModule,
],
  exports: [MenuLateralComponent,ContainerComponent],
})
export class SharedComponentModule {}
