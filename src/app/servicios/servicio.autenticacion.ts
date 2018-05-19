import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {ConfiguracionServicio} from "./configuracion.servicio";
import {Router} from "@angular/router";
import {ICredencialesUsuario} from "../modelos/ICredencialesUsuario";
import {Observable} from "rxjs/Observable";
import {ISesionUsuario} from "../modelos/ISesionUsuario";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { CookieService } from "angular2-cookie/core";

@Injectable()
export class ServicioAutenticacion {

  constructor(private cookie: CookieService, private httpClient: HttpClient, private configuracion: ConfiguracionServicio
    , private router: Router) {
  }


  iniciarSesion1(credencialesUsuario: ICredencialesUsuario): ISesionUsuario {
    let sesionUsuario: ISesionUsuario;
    //sesionUsuario = { token: '1234', usuario: { id: 1, nombres: 'Alexnader', apellidos: 'Aguilar', numeroDocumento: '12345678' } }
    //sesionUsuario = { token: '1234', idUsuario: 1 };
    sesionUsuario = { token: '1234' };
    return sesionUsuario;
  }

  iniciarSesion2(credencialesUsuario: ICredencialesUsuario): Observable<ISesionUsuario> {
    let headers: HttpHeaders;
    headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = JSON.stringify(credencialesUsuario);
    console.log(body);
    return this.httpClient.post<ISesionUsuario>(this.configuracion.baseUrl + 'login', body, {
      headers: headers
    });
  }

  iniciarSesion(credencialesUsuario: ICredencialesUsuario): Observable<ISesionUsuario> {
    let headers: HttpHeaders;
    console.log('Credenciales', credencialesUsuario);
    headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = JSON.stringify(credencialesUsuario);
    console.log(body);
    console.log('URL', this.configuracion.baseUrl + 'user/signin');
    return this.httpClient.post<ISesionUsuario>(this.configuracion.baseUrl + 'user/signin', body, {
      headers: headers
    });
  }

  crearCookie(clave: string, valor: string) {
    console.log('Creando Cookie [Clave]', clave);
    console.log('Creando Cookie [Valor]', valor);
    this.cookie.put(clave, valor);
  }

  cerrarSesion() {
    this.cookie.remove('token');
  }

  obtenerCookie(clave: string): string {
    return this.cookie.get(clave);
  }

  borrarCookie(clave: string) {
    this.cookie.remove(clave);
  }
}
