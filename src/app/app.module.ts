import { AppError } from './models/app-error';
import { ErrorIntercept } from './error.interceptor';
import { WeatherService } from './services/weather.service';
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
import { FetchDataComponent } from './components/fetch-weather-data/fetch-weather-data.component';
import { FetchValueDataComponent } from './components/fetch-value-data/fetch-value-data.component';
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
  { path: 'fetch-weather-data', component: FetchDataComponent },
  { path: 'fetch-value-data', component: FetchValueDataComponent },
  { path: 'health', component: HealthComponent },
  { path: 'grid', component: GridComponent }];

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    FetchValueDataComponent,
    VersionComponent,
    HealthComponent,
    GridComponent
  
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
    }, WeatherService,
    {
      provide: LocationStrategy, useClass: HashLocationStrategy
    },
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }


