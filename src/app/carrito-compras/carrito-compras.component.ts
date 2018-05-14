import {Component, OnInit} from '@angular/core';
import {IOrden} from "../modelos/IOrden";
import {IUsuario} from "../modelos/IUsuario";
import {IProducto} from "../modelos/IProducto";
import {IItemOrden} from "../modelos/IItemOrden";

@Component({
  selector: 'app-carrito-compras.component',
  templateUrl: './carrito-compras.component.html',
  styles: []
})

export class CarritoComprasComponent implements OnInit {

  orden: IOrden;

  ngOnInit() {
    this.orden = this.cargarOrden();
  }

  cargarOrden(): IOrden {
    let cliente: IUsuario;
    cliente = { id: 1, numeroDocumento: '123456789', nombres: 'Alexander', apellidos: 'Aguilar'};
    let producto1: IProducto;
    let producto2: IProducto;
    let producto3: IProducto;

    producto1 = {id: 1, nombre: 'Producto 1', precio: 5000, descripcion: 'Descripcion Producto1'};
    producto2 = {id: 2, nombre: 'Producto 2', precio: 10000, descripcion: 'Descripcion Producto2'};
    producto3 = {id: 3, nombre: 'Producto 3', precio: 15000, descripcion: 'Descripcion Producto3'};

    let itemOrden1: IItemOrden;
    let itemOrden2: IItemOrden;
    let itemOrden3: IItemOrden;

    itemOrden1 = {id: 1, cantidad: 1, producto: producto1};
    itemOrden2 = {id: 2, cantidad: 2, producto: producto2};
    itemOrden3 = {id: 3, cantidad: 3, producto: producto2};

    let itemsOrden: IItemOrden[] = [];
    itemsOrden.push(itemOrden1);
    itemsOrden.push(itemOrden2);
    itemsOrden.push(itemOrden3);

    let orden: IOrden;

    orden = {items: itemsOrden, cliente: cliente};

    return orden;
  }

}
