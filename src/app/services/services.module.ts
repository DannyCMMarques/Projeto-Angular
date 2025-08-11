import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PautasService } from './pautas/pautas.service';
import { SessoesService } from './sessoes/sessoes.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [SessoesService, PautasService]
})
export class ServicesModule { }
