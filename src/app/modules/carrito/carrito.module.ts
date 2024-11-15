import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarritoRoutingModule } from './carrito-routing.module';
import { PedidoComponent } from './componentrs/pedido/pedido.component';


@NgModule({
  declarations: [
    PedidoComponent
  ],
  imports: [
    CommonModule,
    CarritoRoutingModule,
    CarritoRoutingModule
  ],
  exports:[
    PedidoComponent,
    CarritoRoutingModule
    
  ]
})
export class CarritoModule { }
