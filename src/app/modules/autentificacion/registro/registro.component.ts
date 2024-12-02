import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/modules/shared/service/firestore.service'; 
import * as CryptoJS from 'crypto-js';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  hide=true
  usuario: Usuario={
    uid:'',
    nombre:'',
    correo:'',
    rol:"usuario", // designamos un rol por defecto
    contrasena:'',
  }


// CREAR UNA CONECCION PARA USUARIO
coleccionUsuario: Usuario[] = [];

constructor(
  public servicioAuth: AuthService, 
  public servicioRutas : Router,
  public servicioFirestore: FirestoreService,) {}

//FUNCION PÁRA EL REGISTRO
async registrar(){
  const credenciales={
    correo: this.usuario.correo,
    contrasena: this.usuario.contrasena
  }
  const respuesta= await this.servicioAuth.registrar(credenciales.correo, credenciales.contrasena)
  .then(respuesta=>{
    Swal.fire({
      title: "Buen trabajo!",
      text: "Su usuario se registro con exito!",
      icon: "success"
    });

    this.servicioRutas.navigate(['/incio'])

  })

  .catch(error=>{
    Swal.fire({
      title: "oh no",
      text: "encontramos un problema al registrar el usuario",
      icon: "error"
    });
  })

  const uid =await this.servicioAuth.obteneruid();
  this.usuario.uid=uid;
  this.usuario.contrasena=CryptoJS.SHA256(this.usuario.contrasena).toString()
  
  this.guardarUsuario()
  this.limpiarImputs()
  }

  async guardarUsuario(){
    this.servicioFirestore.agrerarUsuario(this.usuario, this.usuario.uid)
    .then(res=>{console.log(this.usuario)
    })
    .catch(err=>{console.log('error=>',err)
    })
  }
  
  limpiarImputs(){
    const inputs={
      uid: this.usuario.uid='',
      nombre:this.usuario.nombre='',
      correo:this.usuario.correo='',
      rol: this.usuario.rol='vis',
      contrasena:this.usuario.contrasena='',
    }
  }
}
