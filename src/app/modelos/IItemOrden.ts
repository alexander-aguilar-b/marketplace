import {IProducto} from "./IProducto";

export interface IItemOrden {
  id?: number;
  producto: IProducto;
  cantidad: number;
  totalItemOrden?: number;
}
