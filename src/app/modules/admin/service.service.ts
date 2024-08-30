import { Injectable } from '@angular/core';
import { Productos } from "src/app/models/productos";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  // Definimos coleccion para los productos de la web del tipo producto
  private productosCollection: AngularFirestoreCollection<Productos>

  constructor(private database:AngularFirestore) { 
    this.productosCollection =database.collection('productos')
  }

  //crear productos
  crearProducto(producto: Productos){
    return new Promise(async(resolve,reject)=>{
      try{
        //creamos numero identificativo para el producto de la base de datos
        const id=this.database.createId();
        producto.id= id;

        const resultado= await this.productosCollection.doc(id).set(producto)
        resolve(resultado);
      }catch(error){
        reject(error)
      }
    })
  }

  //obtener productos
  obtenerProducto(){
    return this.productosCollection.snapshotChanges().pipe(map(Action=>Action.map(a=>a.payload.doc.data())))
  }
  //editarlos
  modificarProducto(id:string, nuevaData:Productos){
    return this.database.collection('producto').doc(id).update(nuevaData)
  }
  
  //eliminarlos
  eliminarProducto(id: string){
    return new Promise((resolve, reject)=>{
      try{
        const respuesta= this.productosCollection.doc(id).delete
      }
      catch(error){
        reject(error);
      }
    }
    )
  }
}
