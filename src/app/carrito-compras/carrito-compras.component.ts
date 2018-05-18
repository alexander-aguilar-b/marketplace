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

  publicKey = '-----BEGIN RSA PRIVATE KEY-----\n' +
    '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\n' +
    '-----END RSA PRIVATE KEY-----';
  privateKey = '-----BEGIN PUBLIC KEY-----\n' +
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

    console.log(this.descifrar(datosTarjetaEncriptados));

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

  descifrar(cypherText: string): string {
    return this.cipher.decrypt(cypherText);
  }

}
