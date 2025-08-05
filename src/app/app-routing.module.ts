import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PautasContainerComponent } from './container/pautas-container/pautas-container.component';
import { SessoesComponent } from './pages/sessoes/sessoes.component';
const routes: Routes = [
  { path: '', component: PautasContainerComponent },
  { path: 'sessao', component: SessoesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
