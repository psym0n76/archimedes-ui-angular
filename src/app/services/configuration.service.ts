import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConfigurationService {

  private configuration: IServerConfiguration;

  constructor(private http: HttpClient) { }

  loadConfig() {
    return this.http.get<IServerConfiguration>('http://archimedes-service-ui.com:2103/configuration')
      .toPromise()
      .then(result => {
        this.configuration = <IServerConfiguration>(result);
      }, error => console.error(error));
  }

  get userInterfaceBaseUrl() {
    return this.configuration.UserInterfaceBaseUrl;
  }
}

export interface IServerConfiguration {
  UserInterfaceBaseUrl: string;
}
