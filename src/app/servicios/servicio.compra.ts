/*import { Injectable } from '@angular/core';
import { Observable} from 'rxjs/Rx';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {ConfiguracionServicio} from './configuracion.servicio';
import {IOrden} from "../modelos/IOrden";
import {IRespuestaTransaccion} from "../modelos/IRespuestaTransaccion";
*/

import {Injectable} from "@angular/core";
import {ConfiguracionServicio} from "./configuracion.servicio";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {IOrden} from "../modelos/IOrden";
import {Observable} from "rxjs/Observable";
import {IRespuestaTransaccion} from "../modelos/IRespuestaTransaccion";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { catchError } from 'rxjs/operators';
import {ServicioAutenticacion} from "./servicio.autenticacion";

@Injectable()
export class ServicioCompra {
  constructor(private httpClient: HttpClient, private configuracion: ConfiguracionServicio, private servicioAutenticacion: ServicioAutenticacion) {
  }

  realizarCompra1(ordenCompra: IOrden): any {
    const token = this.servicioAutenticacion.obtenerCookie('token');
    let headers: HttpHeaders;
    headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = JSON.stringify(ordenCompra);
    return this.httpClient.post(this.configuracion.baseUrl + 'compra', body, {
      headers: headers
    });
  }

  realizarPago(datosPago: string): any {
    const token = this.servicioAutenticacion.obtenerCookie('token');
    let headers: HttpHeaders;
    headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization' : 'Bearer ' + token});
    const body = { data: datosPago };
    console.log(body);
    return this.httpClient.post(this.configuracion.baseUrl + 'comprar', body, {
      headers: headers
    });
  }



  consultar(): any {
    let headers: HttpHeaders;
    headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.httpClient.get( 'https://4qfz6nkrq7.execute-api.us-east-1.amazonaws.com/dev/api/mock/v1/countries');
  }

  handleError(error: HttpErrorResponse) {
    console.log(error);
  }
}


/*
export class ServicioCompra {

  constructor(private http: Http, private configuracion: ConfiguracionServicio) {}

  realizarCompra(ordenCompra: IOrden) : Observable<IRespuestaTransaccion> {
    const headers = new Headers({'Content-Type' : 'application/json'});
    const options = new RequestOptions({ headers : headers});
    console.log('antes', ordenCompra);
    console.log(this.configuracion.baseUrl +  'compra');
    console.log('JSON.stringify', JSON.stringify(ordenCompra));

    return this.http.post(this.configuracion.baseUrl +  'compra', JSON.stringify(ordenCompra), options).map((response : Response) => {

      console.log('Respuesta Servicio', response.json());
      //return response.json();
      return <IRespuestaTransaccion[]> response.json();
    }).catch(this.manejadorError);
  }

  private manejadorError(error: Response)
  {
    console.log('error', error);
    return Observable.throw('error paso');
  }

}
*/
