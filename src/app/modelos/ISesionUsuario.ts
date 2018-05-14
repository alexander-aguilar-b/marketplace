import {IUsuario} from './IUsuario';

export interface ISesionUsuario {
  token: string;
  usuario: IUsuario;
}
