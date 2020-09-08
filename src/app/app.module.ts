import { BrowserModule } from '@angular/platform-browser';
import { NgModule , APP_INITIALIZER} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { ConfigurationService } from './services/configuration.service';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { FetchValueDataComponent } from './fetch-value-data/fetch-value-data.component';
import { AppConfigService } from './services/appConfigService';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

const appInitializerFn = (appConfig: ConfigurationService) => {
  return () => {
    return appConfig.loadConfig();
  };
};

const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'counter', component: CounterComponent },
  { path: 'fetch-data', component: FetchDataComponent },
  { path: 'fetch-value-data', component: FetchValueDataComponent }

]

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    FetchValueDataComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
    // RouterModule.forRoot([
    //   { path: '', component: HomeComponent, pathMatch: 'full' },
    //   { path: 'counter', component: CounterComponent },
    //   { path: 'fetch-data', component: FetchDataComponent },
    //   { path: 'fetch-value-data', component: FetchValueDataComponent }
    // ])
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => {
        return () => {
          //Make sure to return a promise!
          return appConfigService.loadAppConfig();
        };
      }
    },
    {
      provide: LocationStrategy, useClass: HashLocationStrategy}
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }


