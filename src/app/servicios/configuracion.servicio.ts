import { Injectable } from '@angular/core';

@Injectable()
export class ConfiguracionServicio {
  //public servidor: string = 'https://gkyn0sv8fi.execute-api.us-east-1.amazonaws.com/';
  public servidor: string = 'http://localhost:2018/';
  //public apiUrl: string = 'dev/';
  public apiUrl: string = 'api/';
  public baseUrl = this.servidor + this.apiUrl;
}
