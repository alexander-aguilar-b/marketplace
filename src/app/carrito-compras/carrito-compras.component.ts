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
    'MIICITANBgkqhkiG9w0BAQEFAAOCAg4AMIICCQKCAgBHjhuY0a7lSDL0IMLOu+NL\n' +
    'Ew3dczoJEIJD5QKju/BEiKpfcqlhQ/JVfG0Y7QHYdoubgkiqjV6A8V4ovGkA7EzY\n' +
    'RVCVVcZ1zvn9XHGdJ2HoT7qttQ0BJyqUoUPlsgUS+lfaJFBvvNsOYMVNSXOECcWx\n' +
    'A2fqM/8l3NMTXJi2DmISlfCWD+bTewpYGYakmecrGoVJic/Whr5hTwWBbTw1LKvJ\n' +
    'cHs8apo6yQuZjUlqtedAjVdYFOewwJ2O9y0nAv8auJfqkAPXO3D4MN0pRbpuDFjI\n' +
    'YfZaLEMXFAvzkOJkWSoUZWfKJwqeh+Dmb4XqdDDsSq6e4fw0ZSjfBF5ZrRbgLh6y\n' +
    'o80DmsYvmcftsrl66inpcQhqQNYnXh12YeaIhu1smUqPIuJxMUgLKfXICHR9xzB2\n' +
    'Y+m0Z2+565K/bYKx+GX/OxOlez2PDSKg4GgTiMp11FHpBf6e30myp7zScJUl47at\n' +
    'mFlLeK9B1E1I7tFjpMjdy7UrTI9Kdnc9AnllXoFMMTg7eMylxLe6SGSrzW4NB2vC\n' +
    'jurj+A4YNGMmqoNnqWGe5agUuIiSGG7FgNHuzIw4Oaqp1vLqPmz8xUO6vVwA3AIr\n' +
    'JsXwMlV1zi/N/gF6I9uOwK3UPaAcT19Ykr6mTwmEvJahB2mWl1wioogXybbaCPdr\n' +
    '/iuYV1OqpKx0xsCYfZsSywIDAQAB\n' +
    '-----END PUBLIC KEY-----';
  constructor(private servicioCompra: ServicioCompra, private router: Router) {
  }

  ngOnInit() {
    this.mostrarMedioPago = false;
    this.mostrarRealizarPago = false;
    this.orden = this.cargarOrden();
    this.textoIngresarEditarMedioPago = 'Ingresar Medio Pago';
    this.cipher = new jsencrypt.JSEncrypt();
    this.cipher.setPublicKey(this.publicKey);
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
