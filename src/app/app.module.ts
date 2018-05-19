import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {CarritoComprasComponent} from './carrito-compras/carrito-compras.component';
import { AppRoutingModule } from './/app-routing.module';
import {ConfiguracionServicio} from "./servicios/configuracion.servicio";
import {ServicioAutenticacion} from "./servicios/servicio.autenticacion";
import {LoginComponent} from "./login/login.component";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {ServicioCompra} from "./servicios/servicio.compra";
import {HttpClientModule} from "@angular/common/http";

import { CookieService } from 'angular2-cookie/services/cookies.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CarritoComprasComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    ConfiguracionServicio,
    ServicioAutenticacion,
    ServicioCompra,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
