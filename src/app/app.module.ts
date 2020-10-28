import { StrategyService } from './services/strategy.service';
import { PriceLevelService } from './services/price-level.service';
import { CandleService } from './services/candle.service';
import { PriceService } from './services/price.service';
import { ErrorIntercept } from './error.interceptor';
import { MarketService } from './services/market.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';

import { RouterModule, Routes } from '@angular/router';

import { ConfigurationService } from './services/configuration.service';
import { AppComponent } from './app.component';
import { VersionComponent } from './components/version/version.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { HomeComponent } from './components/home/home.component';
// import { CounterComponent } from './components/counter/counter.component';
// import { FetchMarketDataComponent } from './components/fetch-market-data/fetch-market-data.component';
import { FetchMarketDataMatTableComponent } from './components/fetch-market-data-mat-table/fetch-market-data-mat-table.component';
import { ConfigService } from './services/config.service';
import { HashLocationStrategy, LocationStrategy} from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgGridModule } from 'ag-grid-angular';
import { MatTableComponent } from './components/mat-table/mat-table.component';

import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FetchCandleDataMatTableComponent } from './components/fetch-candle-data-mat-table/fetch-candle-data-mat-table.component';
import { FetchHealthDataMatTableComponent } from './components/fetch-health-data-mat-table/fetch-health-data-mat-table.component';
import { FetchCandleDataChartComponent } from './components/fetch-candle-data-chart/fetch-candle-data-chart.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { DropdownGranularityComponent } from './components/fetch-candle-data-chart/dropdown-granularity/dropdown-granularity.component';
import { DropdownMarketComponent } from './components/fetch-candle-data-chart/dropdown-market/dropdown-market.component';
import { FetchPriceLevelDataMatTableComponent } from './components/fetch-price-level-data-mat-table/fetch-price-level-data-mat-table.component';
import { FetchStrategyDataMatTableComponent } from './components/fetch-strategy-data-mat-table/fetch-strategy-data-mat-table.component';
import { FetchStrategyDataGridComponent } from './components/fetch-strategy-data-grid/fetch-strategy-data-grid.component';
import { FetchMarketDataGridComponent } from './components/fetch-market-data-grid/fetch-market-data-grid.component';
import { FetchPriceLiveDataGridComponent } from './components/fetch-price-live-data-grid/fetch-price-live-data-grid.component';

const appInitializerFn = (appConfig: ConfigurationService) => {
  return () => {
    return appConfig.loadConfig();
  };
};

const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'fetch-price-level-data-mat-table', component: FetchPriceLevelDataMatTableComponent},
  { path: 'fetch-strategy-data-mat-table', component: FetchStrategyDataMatTableComponent},
  { path: 'fetch-strategy-data-grid', component: FetchStrategyDataGridComponent},
  { path: 'fetch-market-data-mat-table', component: FetchMarketDataMatTableComponent },
  { path: 'fetch-candle-data-chart', component: FetchCandleDataChartComponent},
  { path: 'fetch-candle-data-mat-table', component: FetchCandleDataMatTableComponent },
  { path: 'fetch-market-data-grid', component: FetchMarketDataGridComponent },
  { path: 'fetch-health-data-mat-table', component: FetchHealthDataMatTableComponent }];

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    VersionComponent,
    FetchMarketDataMatTableComponent,
    FetchMarketDataGridComponent,
    MatTableComponent,
    FetchHealthDataMatTableComponent,
    FetchCandleDataMatTableComponent,
    FetchCandleDataChartComponent,
    DropdownGranularityComponent,
    DropdownMarketComponent,
    FetchPriceLevelDataMatTableComponent,
    FetchStrategyDataMatTableComponent,
    FetchStrategyDataGridComponent,
    FetchPriceLiveDataGridComponent


  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    MatTableModule,
    HighchartsChartModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    AgGridModule.withComponents(),
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
    PriceLevelService,
    StrategyService,
    {
      provide: LocationStrategy, useClass: HashLocationStrategy
    },
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }


