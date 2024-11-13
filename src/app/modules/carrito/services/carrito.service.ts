import { Injectable } from '@angular/core';
import { CrudService } from '../../admin/services/crud.service';
import { AuthService } from '../../autentificacion/services/auth.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Pedido } from 'src/app/models/pedido';
import { map } from 'rxjs';
import { Productos } from 'src/app/models/productos';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  pedido:Pedido={
    idpedido:"",
    producto:{
      id:"",
      nombre:"",
      precio:0,
      descripcion:"",
      categoria:"",
      imagen:"",
      marca:"",
      alt:"",
      stock:0,
    },
    cantidad:0,
    total:0
  }


  private pedidoColeccion: AngularFirestoreCollection<Pedido>

  private uid: string| null=null;

  constructor(
    private servicioCrud:CrudService,
    private servicioAuth:AuthService,
    private servicioFirestore:AngularFirestore,
    public servicioRutas:Router

  ) { 
    //creamos un subcollecion dentro de la collecion de usuario y le damos ese valor a pedidoColleccion
    this.pedidoColeccion= this.servicioFirestore.collection(`usuario/${this.uid}/pedido`);
   }

   iniciarCart(){
    this.servicioAuth.obteneruid().then(uid=>{
      this.uid=uid
      if(this.uid == null){
        console.log("no se encontro el id")
        this.servicioRutas.navigate(['/carrito'])
      }else{
       this.pedidoColeccion = this.servicioFirestore.collection(`usuario/${this.uid}/pedido`);
      }
    })
   }
   obtenerCarrito(){
    return this.pedidoColeccion.snapshotChanges().pipe(map(action=>action.map(a =>a.payload.doc.data())))
  }
  crearPedido(producto:Productos,stock:number){
    try{
      const idpedido= this.servicioFirestore.createId();
      //reemplazamos usi valores de oedudi por los valores que obvtuvimos
      this.pedido.idpedido=idpedido
      this.pedido.producto=producto;
      this.pedido.cantidad=stock;
      this.pedido.total=producto.precio*stock

      this.pedidoColeccion.doc(idpedido).set(this.pedido);
    }catch(error){
      Swal.fire({
        title:'wow',
        text:'ha ocurrido un error al subir su producto',
        icon:'error'
      })
    
    }
  }

  borrarPedido(pedido:Pedido){
    try{
      this.pedidoColeccion.doc(pedido.idpedido).delete();
      Swal.fire({
        text:'ha borrado su pedido con exito',
        icon:"error"
      })
    }catch(error){
      Swal.fire({
        text:"ha ocurrido un error",
        icon:"error"
      })
    }
  }
}