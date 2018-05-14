import {IItemOrden} from "./IItemOrden";
import {IUsuario} from "./IUsuario";

export interface IOrden {
  id?: number;
  items: IItemOrden[];
  total?: number;
  cliente: IUsuario;
}
