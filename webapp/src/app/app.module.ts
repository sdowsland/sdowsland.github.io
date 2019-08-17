import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatToolbarModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatCardModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout'
import { ContactFormComponent } from './contact-form/contact-form.component'

@NgModule({
  declarations: [
    AppComponent,
    ContactFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    FlexLayoutModule
  ],
  exports: [
    ContactFormComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
