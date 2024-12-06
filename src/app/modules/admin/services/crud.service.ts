import { Injectable } from '@angular/core';
import { Productos } from "src/app/models/productos";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { map } from 'rxjs';
import { getDownloadURL, getStorage, ref, UploadResult, uploadString, deleteObject } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  // Definimos coleccion para los productos de la web del tipo producto
  private productosCollection: AngularFirestoreCollection<Productos>
  private respuesta!: UploadResult;
  private storage = getStorage();

  constructor(private database:AngularFirestore) {
    this.productosCollection =database.collection('productos')
  }

  //crear productos
  crearProducto(producto: Productos, imagenUrl:string){
    return new Promise(async(resolve,reject)=>{
      try{
        //creamos numero identificativo para el producto de la base de datos
        const id=this.database.createId();

        producto.id= id;

        producto.imagen = imagenUrl;

        const resultado= await this.productosCollection.doc(id).set(producto)
        resolve(resultado);
      }catch(error){
        reject(error)
      }
    })
  }

  //obtener productos
  obtenerProducto(){
    return this.productosCollection.snapshotChanges().pipe(map(action=>action.map(a=>a.payload.doc.data())))
  }
  //editarlos
  modificarProducto(id:string, nuevaData:Productos){
    return this.database.collection('productos').doc(id).update(nuevaData)
  }
  
  //eliminarlos
  eliminarProducto(idProducto: string, imagenUrl: string){
    return new Promise((resolve, reject) => {
      try{
        // Definimos referencias localmente de Storage
        const storage = getStorage();

        // Obtiene la referencia desde el almacenamiento de Storage
        const referenciaImagen = ref(storage, imagenUrl);

        // Eliminamos la imagen desde el almacenamiento
        deleteObject(referenciaImagen)
        .then((res) => {
          const respuesta = this.productosCollection.doc(idProducto).delete();

          resolve (respuesta);
        })
        .catch(error => {
          reject("Error al eliminar la imagen: \n"+error);
        })
      }
      catch(error){
        reject (error);
      }
    })
  }

  obtenerUrlImagen(respuesta: UploadResult){
    // Retorna URL obtenida como REFERENCIA
    return getDownloadURL(respuesta.ref);
  }

  async subirImagen(nombre: string, imagen: any, ruta: string){
    try{
      // Crear una referencia de imagen:
      // accede a Storage (almacenamiento), ruta (carpeta) / nombre (nombreImagen)
      let referenciaImagen = ref(this.storage, ruta + '/' + nombre);

      // Asignarle a la respuesta la información de las imágenes subidas
      this.respuesta = await uploadString(referenciaImagen, imagen, 'data_url')
      .then(resp => {
        return resp;
      })

      return this.respuesta;
    }
    catch(error){
      console.log(error);

      return this.respuesta;
    }
  }
}
