import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PautasContainerComponent } from './container/pautas-container/pautas-container.component';
import { SessaoContainerComponent } from './container/sessao-container/sessao-container/sessao-container.component';
import { VotacaoComponent } from './pages/votacao/votacao.component';
const routes: Routes = [
  { path: '', component: PautasContainerComponent },
  { path: 'sessao', component: SessaoContainerComponent },
{path: 'sessao/:id', component: VotacaoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
