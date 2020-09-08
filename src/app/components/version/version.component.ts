import { ConfigService } from './../../services/config.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.css']
})

//  //template: '<h3>Version: {{getVersion()}} </h3>',

export class VersionComponent implements OnInit {

  constructor(private appConfigService: ConfigService) {
   }
  ngOnInit(): void {
    console.log('Version ' + this.getVersion());
  }

  getVersion(): string {
      return this.appConfigService.appVersion;
  }
}


