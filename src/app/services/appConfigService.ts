import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
  export class AppConfigService {

    private appConfig: any;
// this service is responsible for retrieving the config jason fel from assets
    constructor(private http: HttpClient) { }

    loadAppConfig(): any {
      return this.http.get('/assets/config.json')
        .toPromise()
        .then(data => {
          this.appConfig = data;
        });
    }

    // This is an example property ... you can make it however you want.
    get userInterfaceBaseUrl(): string {

      if (!this.appConfig) {
        throw Error('Config file not loaded!');
      }

      return this.appConfig.userInterfaceBaseUrl;
    }
}
