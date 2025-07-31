import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedComponentModule } from './component/shared-component.module';
import { PautasComponent } from './pages/pautas/pautas.component';
import { SessoesComponent } from './pages/sessoes/sessoes.component';

@NgModule({
  declarations: [
    AppComponent,
    PautasComponent,
    SessoesComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedComponentModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
