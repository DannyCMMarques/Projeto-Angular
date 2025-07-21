import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PautasComponent } from './pages/pautas/pautas.component';
import { SessoesComponent } from './pages/sessoes/sessoes.component';

const routes: Routes = [{
  path: '', component: PautasComponent,
}, {
  path: 'sessao', component: SessoesComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
