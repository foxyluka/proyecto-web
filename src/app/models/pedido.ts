import { Productos } from "./productos";

export interface Pedido {
    idpedido:string;
    producto:Productos;
    cantidad: number;
    total:number
}
