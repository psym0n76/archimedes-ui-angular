import { ConfigService } from './config.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ValuesService {

  constructor(private configService: ConfigService, private http: HttpClient) { }

    getValues(): any{

      return this.http.get<string[]>(this.configService.userInterfaceBaseUrl + '/Values');
  }
}
