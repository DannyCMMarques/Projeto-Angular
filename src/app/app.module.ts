import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedComponentModule } from './component/shared-component.module';
import { PautasContainerComponent } from './container/pautas-container/pautas-container.component';
import { SessaoContainerComponent } from './container/sessao-container/sessao-container/sessao-container.component';
import { PautasComponent } from './pages/pautas/pautas.component';
import { SessoesComponent } from './pages/sessoes/sessoes.component';
import { VotacaoComponent } from './pages/votacao/votacao.component';
import { ServicesModule } from './services/services.module';
import { VotacaoContainerComponent } from './container/votacao-container/votacao-container.component';

@NgModule({
  declarations: [
    AppComponent,
    PautasComponent,
    SessoesComponent,
    PautasContainerComponent,
    VotacaoComponent,
    SessaoContainerComponent,
    VotacaoContainerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedComponentModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ServicesModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
