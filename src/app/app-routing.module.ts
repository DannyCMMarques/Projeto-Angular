import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PautasContainerComponent } from './container/pautas-container/pautas-container.component';
import { SessaoContainerComponent } from './container/sessao-container/sessao-container/sessao-container.component';
import { VotacaoContainerComponent } from './container/votacao-container/votacao-container.component';
const routes: Routes = [
  { path: '', component: PautasContainerComponent },
  { path: 'sessao', component: SessaoContainerComponent },
  { path: 'sessao/:id', component: VotacaoContainerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
