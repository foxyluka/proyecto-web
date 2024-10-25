import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from 'src/app/shared/service/firestore.service';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent {
  hide = true;
  usuario: Usuario={
    uid:'',
    nombre:'',
    correo:'',
    rol:'',
    contrasena:'',
  }
  coleccionUsuario: Usuario[] = [];
  constructor(
    public servicioAuth: AuthService,
    public servicioFirestore: FirestoreService,
    public servicioRutas: Router
  ){}
async iniciosesion(){

  const credenciales={
    correo: this.usuario.correo,
    contrasena: this.usuario.contrasena
  }
  const res = await this.servicioAuth.iniciar(credenciales.correo , credenciales.contrasena)
  .then(res=>{
    Swal.fire({
      title: "exelente!",
      text: "iniciaste sesion con exito!",
      icon: "success"
    });
  })
  .catch(err=>{
    Swal.fire({
      title: "Error!",
      text: "no se encontro la cuenta con la que intenta iniciar!",
      icon: "error"
    });
  })
  this.limpiarinputs();
  }


  limpiarinputs(){
    const inputs ={
      correo: this.usuario.correo,
      contrasena: this.usuario.contrasena
    }
  }
}



