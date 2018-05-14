import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {ConfiguracionServicio} from "./configuracion.servicio";
import {Router} from "@angular/router";
import {ICredencialesUsuario} from "../modelos/ICredencialesUsuario";
import {Observable} from "rxjs/Observable";
import {ISesionUsuario} from "../modelos/ISesionUsuario";

@Injectable()
export class ServicioAutenticacion {

  constructor(private configuracion: ConfiguracionServicio
    , private router: Router) {
  }

  iniciarSesion(credencialesUsuario: ICredencialesUsuario): ISesionUsuario {
    let sesionUsuario: ISesionUsuario;
    sesionUsuario = { token: '1234', usuario: { idUsuario: 1, nombres: 'Alexnader', apellidos: 'Aguilar', numeroDocumento: '12345678' } }
    return sesionUsuario;
  }
}
