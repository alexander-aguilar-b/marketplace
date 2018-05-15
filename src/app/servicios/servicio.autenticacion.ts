import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {ConfiguracionServicio} from "./configuracion.servicio";
import {Router} from "@angular/router";
import {ICredencialesUsuario} from "../modelos/ICredencialesUsuario";
import {Observable} from "rxjs/Observable";
import {ISesionUsuario} from "../modelos/ISesionUsuario";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class ServicioAutenticacion {

  constructor(private httpClient: HttpClient, private configuracion: ConfiguracionServicio
    , private router: Router) {
  }


  iniciarSesion1(credencialesUsuario: ICredencialesUsuario): ISesionUsuario {
    let sesionUsuario: ISesionUsuario;
    //sesionUsuario = { token: '1234', usuario: { id: 1, nombres: 'Alexnader', apellidos: 'Aguilar', numeroDocumento: '12345678' } }
    sesionUsuario = { token: '1234', idUsuario: 1 };
    return sesionUsuario;
  }

  iniciarSesion(credencialesUsuario: ICredencialesUsuario): Observable<ISesionUsuario> {
    let headers: HttpHeaders;
    headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = JSON.stringify(credencialesUsuario);
    console.log(body);
    return this.httpClient.post<ISesionUsuario>(this.configuracion.baseUrl + 'login', body, {
      headers: headers
    });
  }


}
