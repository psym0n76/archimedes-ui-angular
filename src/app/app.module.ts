import { CandleService } from './services/candle.service';
import { PriceService } from './services/price.service';
import { AppError } from './models/app-error';
import { ErrorIntercept } from './error.interceptor';
import { MarketService } from './services/market.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';

import { RouterModule, Routes } from '@angular/router';

import { ConfigurationService } from './services/configuration.service';
import { AppComponent } from './app.component';
import { VersionComponent } from './components/version/version.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { HomeComponent } from './components/home/home.component';
import { CounterComponent } from './components/counter/counter.component';
import { FetchMarketDataComponent } from './components/fetch-market-data/fetch-market-data.component';
import { FetchValueDataComponent } from './components/fetch-value-data/fetch-value-data.component';
import { FetchCandleDataComponent } from './components/fetch-candle-data/fetch-candle-data.component';
import { FetchPriceDataComponent } from './components/fetch-price-data/fetch-price-data.component';
import { FetchHealthDataComponent } from './components/fetch-health-data/fetch-health-data.component';
import { FetchMarketDataMatTableComponent } from './components/fetch-market-data-mat-table/fetch-market-data-mat-table.component';
import { ConfigService } from './services/config.service';
import { HashLocationStrategy, LocationStrategy} from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgGridModule } from 'ag-grid-angular';
import { GridComponent } from './components/grid/grid.component';
import { MarketGridComponent } from './components/market-grid/market-grid.component';
import { MatTableComponent } from './components/mat-table/mat-table.component';

import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DataMatTableComponent } from './components/data-mat-table/data-mat-table.component';




const appInitializerFn = (appConfig: ConfigurationService) => {
  return () => {
    return appConfig.loadConfig();
  };
};

const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'counter', component: CounterComponent },
  { path: 'fetch-candle-data', component: FetchCandleDataComponent },
  { path: 'fetch-price-data', component: FetchPriceDataComponent },
  { path: 'fetch-value-data', component: FetchValueDataComponent },
  { path: 'fetch-market-data-mat-table', component: FetchMarketDataMatTableComponent },
  { path: 'data-mat-table', component: DataMatTableComponent },
  { path: 'market-grid', component: MarketGridComponent },
  { path: 'health', component: FetchHealthDataComponent },
  { path: 'grid', component: GridComponent }];

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchMarketDataComponent,
    FetchValueDataComponent,
    VersionComponent,
    FetchHealthDataComponent,
    GridComponent,
    FetchCandleDataComponent,
    FetchPriceDataComponent,
    MarketGridComponent,
    MatTableComponent,
    DataMatTableComponent,
    FetchMarketDataMatTableComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    AgGridModule.withComponents([]),
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorIntercept,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return () => {
          return configService.loadAppConfig();
        };
      }
    },
    MarketService,
    PriceService,
    CandleService,
    {
      provide: LocationStrategy, useClass: HashLocationStrategy
    },
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }


