import { Injectable } from '@angular/core';

@Injectable()
export class ConfiguracionServicio {
  public servidor: string = 'http://127.0.01:8080/';
  public apiUrl: string = 'spring/';
  public baseUrl = this.servidor + this.apiUrl;
}
