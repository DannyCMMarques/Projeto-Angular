import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { SharedComponentModule } from '../component/shared-component.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientTestingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    SharedComponentModule,
  ],
  exports: [
    CommonModule,
    HttpClientTestingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ToastrModule,
    SharedComponentModule,
  ],
})
export class TestModule {}
