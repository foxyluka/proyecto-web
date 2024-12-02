import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private usuarioCollection:AngularFirestoreCollection<Usuario>
  constructor(private database: AngularFirestore) { 
    this.usuarioCollection = this.database.collection<Usuario>('usuario')
  }
   agrerarUsuario(usuario:Usuario, id:string){
    return new Promise(async(resolve,reject)=>{
      try{
        usuario.uid= id;
        const resultado= await this.usuarioCollection.doc(id).set(usuario);
        resolve(resultado)
      } catch(error){
        reject(error)
      }
    })
  }
}
