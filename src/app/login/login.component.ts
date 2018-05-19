import {Component, Injectable, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Http} from "@angular/http";
import {ServicioAutenticacion} from "../servicios/servicio.autenticacion";
import {ICredencialesUsuario} from "../modelos/ICredencialesUsuario";
import {ISesionUsuario} from "../modelos/ISesionUsuario";

@Component({
  selector: 'app-login.component',
  templateUrl: './login.component.html',
  styles: []
})


export class LoginComponent implements OnInit {

  //credencialesUsuario: ICredencialesUsuario;
  mensajeError: string
  status:string ='200'
  error:string;

  constructor(private router: Router, private servicioAutenticacion: ServicioAutenticacion) {
  }


  ngOnInit() {
  }

  onkeypress(){
    this.status = '200';
  }

  login(formValues){
    console.log(formValues);
    const credencialesUsuario: ICredencialesUsuario = { email: formValues.email, clave: formValues.password};
    //let sesionUsuario: ISesionUsuario = this.servicioAutenticacion.iniciarSesion(credencialesUsuario);
    this.servicioAutenticacion.iniciarSesion(credencialesUsuario).subscribe(data => {
        console.log('rtaLogin', data);
        const sesionUsuario: ISesionUsuario = data;
        if (sesionUsuario !== undefined && sesionUsuario.token !== '') {
          this.servicioAutenticacion.crearCookie('token', sesionUsuario.token);
          this.router.navigate(['/carrito-compras']);
        }}
    );
  }
}
