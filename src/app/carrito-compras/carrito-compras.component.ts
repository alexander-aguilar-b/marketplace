import {Component, OnInit} from '@angular/core';
import {IOrden} from "../modelos/IOrden";
import {IUsuario} from "../modelos/IUsuario";
import {IProducto} from "../modelos/IProducto";
import {IItemOrden} from "../modelos/IItemOrden";
import {ITarjetaCredito} from "../modelos/ITarjetaCredito";
import {ServicioCompra} from "../servicios/servicio.compra";
import {Router} from "@angular/router";
import {IRespuestaTransaccion} from "../modelos/IRespuestaTransaccion";
import * as CryptoJS from 'crypto-js';

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


  constructor(private servicioCompra: ServicioCompra, private router: Router){}

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
    //let medioPago: ITarjetaCredito = { mesVencimiento: null, nombreTitular: null, numeroTarjeta: null, anioVencimiento: null};
    let medioPago: ITarjetaCredito = { mesVencimiento: 2, nombreTitular: 'Alexander', numeroTarjeta: 123456, anioVencimiento: 2022};
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

    itemOrden1 = { cantidad: 1, producto: producto1};
    itemOrden2 = { cantidad: 2, producto: producto2};
    itemOrden3 = { cantidad: 3, producto: producto3};

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

  confirmarMedioPago() {
    this.textoIngresarEditarMedioPago = 'Editar Medio de Pago';
    console.log(this.orden);
    this.mostrarMedioPago = !this.mostrarMedioPago;
    this.mostrarRealizarPago = true;
  }

  realizarPago() {
    console.log(this.orden);
    const datosTarjetaEncriptados = this.encriptarDatosTarjeta(this.orden.medioPago);

    this.servicioCompra.realizarCompra(this.orden).subscribe(data => {
      const respuestaTransaccion: IRespuestaTransaccion = data;
      //console.log('respuestaTransaccion.id', respuestaTransaccion.id);
      //console.log('respuestaTransaccion.mensaje', respuestaTransaccion.mensaje);
      //console.log(data);
      console.log(respuestaTransaccion);
    });
  }

  encriptarDatosTarjeta(datosTarjetaCredito: ITarjetaCredito): string {
    const cadenaDatosTarjeta = JSON.stringify(datosTarjetaCredito);
    console.log('cadenaDatosTarjeta', cadenaDatosTarjeta);

    const password = 'disPasswordIsSoSec§ur#!';
    const key = CryptoJS.enc.Base64.parse(password);
    console.log('key', key);
    const iv  = CryptoJS.enc.Base64.parse('#base64IV#');
    console.log('iv', iv);
    const encrypted = CryptoJS.AES.encrypt('Secret Text', key, {iv: iv}).toString();
    console.log('Datos encriptados', encrypted);
    return encrypted;
  }

}
