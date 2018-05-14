import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {CarritoComprasComponent} from './carrito-compras/carrito-compras.component';
import { AppRoutingModule } from './/app-routing.module';
import {ConfiguracionServicio} from "./servicios/configuracion.servicio";
import {ServicioAutenticacion} from "./servicios/servicio.autenticacion";
import {LoginComponent} from "./login/login.component";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CarritoComprasComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    //,
    AppRoutingModule
  ],
  providers: [
    ConfiguracionServicio,
    ServicioAutenticacion
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
