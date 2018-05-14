import {IItemOrden} from "./IItemOrden";
import {IUsuario} from "./IUsuario";
import {ITarjetaCredito} from "./ITarjetaCredito";

export interface IOrden {
  id?: number;
  items: IItemOrden[];
  total?: number;
  cliente: IUsuario;
  medioPago?: ITarjetaCredito;
}
