import {Component, OnInit} from '@angular/core';
import {IOrden} from '../modelos/IOrden';
import {IUsuario} from '../modelos/IUsuario';
import {IProducto} from '../modelos/IProducto';
import {IItemOrden} from '../modelos/IItemOrden';
import {ITarjetaCredito} from '../modelos/ITarjetaCredito';
import {ServicioCompra} from '../servicios/servicio.compra';
import {Router} from '@angular/router';
import {IRespuestaTransaccion} from '../modelos/IRespuestaTransaccion';
import * as jsencrypt from 'jsencrypt';
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
  cipher: any;

  publicKey = '-----BEGIN PUBLIC KEY-----\n' +
    'MIIBITANBgkqhkiG9w0BAQEFAAOCAQ4AMIIBCQKCAQBm0E0fcAFtOl3aV+/AX3yH\n' +
    'A7WruP5mB5haZksgRiZe4b+PMn/LlI9EumlF/UkOBRXpHUvRFpQwqPnECvrEIGFn\n' +
    'xE/Zf188w/mv0RigXvtRSI9YvlcsU8ZuWQ3epdl2U6JUci7e34zH7tSbovZ6+9+7\n' +
    'fbYvPbG9Ah0tM7fRSc08NFb+R6675QkGpU3p+/Njt7kMz0aJfkAIjuOvSDu9wO+o\n' +
    'fnpup8pRhBtXQYlMFADEyPpCNtxQHHbw1Mcb/R/LmRD3ILrlBcqjDJwWs8362I3r\n' +
    '+hOaVMeeGZCFuXcG0khsd+0YXOt+1VfGsuQa0idhwxJSgu9LwPHhVQtWptPoJ/79\n' +
    'AgMBAAE=\n' +
    '-----END PUBLIC KEY-----';
  constructor(private servicioCompra: ServicioCompra, private router: Router) {
    this.cipher = new jsencrypt.JSEncrypt();
    this.cipher.setPublicKey(this.publicKey);
  }

  ngOnInit() {
    this.mostrarMedioPago = false;
    this.mostrarRealizarPago = false;
    this.orden = this.cargarOrden();
    this.textoIngresarEditarMedioPago = 'Ingresar Medio Pago';
    /*
    this.servicioCompra.consultar().subscribe(data => {
      console.log(data);
    });

    this.servicioCompra.realizarCompra(this.orden).subscribe(data => {
      console.log(data);
    });
    */
  }

  cargarOrden(): IOrden {
    let cliente: IUsuario;
    // let medioPago: ITarjetaCredito = { mesVencimiento: null, nombreTitular: null, numeroTarjeta: null, anioVencimiento: null};
    const medioPago: ITarjetaCredito = {mesVencimiento: 2, nombreTitular: 'Alexander', numeroTarjeta: 123456, anioVencimiento: 2022};
    cliente = {id: 1, numeroDocumento: '123456789', nombres: 'Alexander', apellidos: 'Aguilar'};
    let producto1: IProducto;
    let producto2: IProducto;
    let producto3: IProducto;

    producto1 = {id: 1, nombre: 'Producto 1', precio: 5000, descripcion: 'Descripcion Producto1'};
    producto2 = {id: 2, nombre: 'Producto 2', precio: 10000, descripcion: 'Descripcion Producto2'};
    producto3 = {id: 3, nombre: 'Producto 3', precio: 15000, descripcion: 'Descripcion Producto3'};

    let itemOrden1: IItemOrden;
    let itemOrden2: IItemOrden;
    let itemOrden3: IItemOrden;

    itemOrden1 = {cantidad: 1, producto: producto1};
    itemOrden2 = {cantidad: 2, producto: producto2};
    itemOrden3 = {cantidad: 3, producto: producto3};

    const itemsOrden: IItemOrden[] = [];
    itemsOrden.push(itemOrden1);
    itemsOrden.push(itemOrden2);
    itemsOrden.push(itemOrden3);

    let orden: IOrden;

    let totalOrden = 0;
    for (const itemOrden of itemsOrden) {
      totalOrden += itemOrden.cantidad * itemOrden.producto.precio;
    }

    orden = {items: itemsOrden, cliente: cliente, total: totalOrden, medioPago: medioPago};

    return orden;
  }

  toggleMedioPago() {
    this.mostrarMedioPago = !this.mostrarMedioPago;
    if (this.textoIngresarEditarMedioPago === 'Editar Medio de Pago') {
      this.mostrarRealizarPago = false;
    }
  }

  confirmarMedioPago() {
    this.textoIngresarEditarMedioPago = 'Editar Medio de Pago';
    console.log(this.orden);
    this.mostrarMedioPago = !this.mostrarMedioPago;
    this.mostrarRealizarPago = true;
  }

  realizarPago() {
    console.log(this.orden);
    const datosTarjetaEncriptados = this.cifrar(JSON.stringify(this.orden.medioPago));
    console.log(datosTarjetaEncriptados);

    this.servicioCompra.realizarCompra(this.orden).subscribe(data => {
      const respuestaTransaccion: IRespuestaTransaccion = data;
      // console.log('respuestaTransaccion.id', respuestaTransaccion.id);
      // console.log('respuestaTransaccion.mensaje', respuestaTransaccion.mensaje);
      // console.log(data);
      console.log(respuestaTransaccion);
    });
  }

  cifrar(plainText: string): string {
    return this.cipher.encrypt(plainText);
  }

}
