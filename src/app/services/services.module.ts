import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { PautasService } from './pautas/pautas.service';
import { SessoesService } from './sessoes/sessoes.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })
  ],
  providers: [SessoesService, PautasService]
})
export class ServicesModule { }
