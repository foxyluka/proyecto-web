import { Component } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { AuthService } from 'src/app/modules/autentificacion/services/auth.service';
import { CrudService } from 'src/app/modules/admin/services/crud.service';
import { map } from 'rxjs';
import { Pedido } from 'src/app/models/pedido';
import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent {
  productos:Pedido[]=[];
  constructor(
    public servicioCarrito:CarritoService,
    public servicioAuth:AuthService,
  ){}
  //obtenemos  el rol del usuario para verificar que este logueado correctamente
  ngOnInit(){
    this.servicioAuth.obteneruid().then(uid=>{
      if (uid) {
        this.servicioAuth.obtenerRol(uid).subscribe(rol=>{
          if(rol==='usuario'){
            //obtenemos el ID del usuario para la subcoleccion
            this.servicioCarrito.iniciarCart();
            this.servicioCarrito.obtenerCarrito().subscribe(producto=>
              this.productos = producto
            )
          }
        })
      }
    })
    
  }

  quitarPedido(pedido:Pedido){
    this.servicioCarrito.borrarPedido(pedido)

  }
  
  }


