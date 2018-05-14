import {Component, OnInit} from '@angular/core';
import {IOrden} from "../modelos/IOrden";
import {IUsuario} from "../modelos/IUsuario";
import {IProducto} from "../modelos/IProducto";
import {IItemOrden} from "../modelos/IItemOrden";
import {ITarjetaCredito} from "../modelos/ITarjetaCredito";

@Component({
  selector: 'app-carrito-compras.component',
  templateUrl: './carrito-compras.component.html',
  styles: []
})

export class CarritoComprasComponent implements OnInit {

  orden: IOrden;
  mostrarMedioPago: boolean;
  textoIngresarEditarMedioPago: string;
  mostrarRealizarPago: boolean;

  ngOnInit() {
    this.mostrarMedioPago = false;
    this.mostrarRealizarPago = false;
    this.orden = this.cargarOrden();
    this.textoIngresarEditarMedioPago = 'Ingresar Medio Pago';
  }

  cargarOrden(): IOrden {
    let cliente: IUsuario;
    let medioPago: ITarjetaCredito = { mesVencimiento: null, nombreTitular: null, numeroTarjeta: null, anioVencimiento: null};
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
    itemOrden3 = {id: 3, cantidad: 3, producto: producto3};

    let itemsOrden: IItemOrden[] = [];
    itemsOrden.push(itemOrden1);
    itemsOrden.push(itemOrden2);
    itemsOrden.push(itemOrden3);

    let orden: IOrden;

    let totalOrden: number = 0;
    for(const itemOrden of itemsOrden){
      totalOrden += itemOrden.cantidad * itemOrden.producto.precio;
    }

    orden = {items: itemsOrden, cliente: cliente, total: totalOrden, medioPago: medioPago};

    return orden;
  }

  toggleMedioPago(){
    this.mostrarMedioPago = !this.mostrarMedioPago;
    if(this.textoIngresarEditarMedioPago === 'Editar Medio de Pago'){
      this.mostrarRealizarPago = false;
    }
  }

  confirmarMedioPago(){
    this.textoIngresarEditarMedioPago = 'Editar Medio de Pago';
    console.log(this.orden);
    this.mostrarMedioPago = !this.mostrarMedioPago;
    this.mostrarRealizarPago = true;
  }

  realizarPago(){
    console.log(this.orden);
  }

}
