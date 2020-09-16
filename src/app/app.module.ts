import { CandleService } from './services/candle.service';
import { PriceService } from './services/price.service';
import { AppError } from './models/app-error';
import { ErrorIntercept } from './error.interceptor';
import { MarketService } from './services/market.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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
import { ConfigService } from './services/config.service';
import { HashLocationStrategy, LocationStrategy} from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HealthComponent } from './components/health/health.component';
import { AgGridModule } from 'ag-grid-angular';
import { GridComponent } from './components/grid/grid.component';


const appInitializerFn = (appConfig: ConfigurationService) => {
  return () => {
    return appConfig.loadConfig();
  };
};

const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'counter', component: CounterComponent },
  { path: 'fetch-market-data', component: FetchMarketDataComponent },
  { path: 'fetch-candle-data', component: FetchCandleDataComponent },
  { path: 'fetch-price-data', component: FetchPriceDataComponent },
  { path: 'fetch-value-data', component: FetchValueDataComponent },
  { path: 'health', component: HealthComponent },
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
    HealthComponent,
    GridComponent,
    FetchCandleDataComponent,
    FetchPriceDataComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
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


