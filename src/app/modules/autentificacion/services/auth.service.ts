import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";

//observara los cambios
import { Observable } from 'rxjs';
//itera la coleccion leyendo su info actual
import { map } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private rolUsuario: string | null = null;
  constructor(
    private auth: AngularFireAuth,
    private servicioFirestore: AngularFirestore
  ) { }



  registrar(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  iniciar(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  cerrarSesion() {
    return this.auth.signOut();
  }

  async obteneruid() {
    // nos va a generar una promesa, y la constante la va a capturar
    const user = await this.auth.currentUser;

    // si el usuario no respeta la estructura de la interfaz o tuvo problemas para el registro -> ej: mal interpretado

    if (user == null) {
      return null;

    } else {
      return user.uid
    }
  }

  obtenerRol(uid: string): Observable<string | null> {
    //retornamos del servicio de firestore la coleccion de usuario, buscando por UID, Observamos los cambios de valores, mapeamos
    //al documento de usuario e identificamos el atributo de rol (aun si este es nulo)
    return this.servicioFirestore.collection('usuario').doc(uid).valueChanges()
      .pipe(map((usuario: any) => usuario ? usuario.rol : null))
  }
  //obtiene el rol de la primera funcion y lo asigna a la propiedad privada local
  enviarRolUsuario(rol: string) {
    this.rolUsuario = rol;
  }
  setUsuarioRol(rol: string) {
    this.rolUsuario = rol;
  }
  //obtiene el rol y lo retorna
  obtenerRolUsuario(): string | null {
    return this.rolUsuario;
  }
  obtenerUsuario(email: string) {
    /**
     * Retornamos del servicioFirestore la colección de 'usuarios', buscamos una referencia en los email registrados
     * y los comparamos con los que ingrese el usuario al iniciar sesión, y lo obtiene con el '.get()'
     * Lo vuelve una promesa => da un resultado RESUELTO o RECHAZADO
     */
    return this.servicioFirestore.collection('usuario', ref => ref.where('correo', '==', email)).get().toPromise();
  }
}
