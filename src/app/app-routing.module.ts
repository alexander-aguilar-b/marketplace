import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {CarritoComprasComponent} from "./carrito-compras/carrito-compras.component";

const routes: Routes = [
  {
    path: '',
    component : LoginComponent
  },
  {
    path: 'login',
    component : LoginComponent
  },
  {
    path: 'carrito-compras',
    component : CarritoComprasComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
