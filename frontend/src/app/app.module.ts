import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import {ApiService} from './services/apiService';
import {HttpClientModule} from '@angular/common/http';
import {NgxSpinnerModule, NgxSpinnerService} from 'ngx-spinner';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {ChartsModule, ThemeService} from 'ng2-charts';
import { ChartComponent } from './components/chart/chart.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    FormsModule,
    ChartsModule,

  ],
  providers: [ApiService, NgxSpinnerService, ThemeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
