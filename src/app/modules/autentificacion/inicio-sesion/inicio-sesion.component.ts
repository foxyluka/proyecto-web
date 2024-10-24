import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from 'src/app/shared/service/firestore.service';
import Swal from 'sweetalert2';

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
    contraseña:'',
  }
  coleccionUsuario: Usuario[] = [];
  constructor(
    public servicioAuth: AuthService,
    public servicioFirestore: FirestoreService,
    public servicioRutas: Router
  ){}
async iniciosesion(){

  const credenciales={
    email: this.usuario.correo,
    contraseña: this.usuario.contraseña
  }
  const res = await this.servicioAuth.iniciar(credenciales.email , credenciales.contraseña)
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
      email: this.usuario.correo,
      password: this.usuario.contraseña
    }
  }
}



