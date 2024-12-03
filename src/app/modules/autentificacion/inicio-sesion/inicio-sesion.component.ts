import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from 'src/app/modules/shared/service/firestore.service';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent {
  hide = true;

  constructor(
    public servicioAuth: AuthService,
    public servicioFirestore: FirestoreService,
    public servicioRutas: Router
  ) { }

  usuario: Usuario = {
    uid: '',
    nombre: '',
    correo: '',
    rol: '',
    contrasena: '',
  }

  async iniciosesion() {
    const credenciales = {
      correo: this.usuario.correo,
      contrasena: this.usuario.contrasena
    }
    try {
      // obtenemos usuario de la Base de Datos
      const usuarioBD = await this.servicioAuth.obtenerUsuario(credenciales.correo);

      // Condicional verificada que ese usuario de la BD existiera o que sea igual al de nuestra colección
      if (!usuarioBD || usuarioBD.empty) {
        Swal.fire({
          title: "Error!",
          text: "¡No se encontro la cuenta con la que intenta iniciar!",
          icon: "error"
        });

        this.limpiarinputs();
        return;
      }

      const usuarioDoc = usuarioBD.docs[0];

      const usuarioData = usuarioDoc.data() as Usuario;

      const hashedPassword = CryptoJS.SHA256(credenciales.contrasena).toString();

      if (hashedPassword !== usuarioData.contrasena) {
        Swal.fire({
          title: "¡Oh no!",
          text: "Contraseña incorrecta",
          icon: "error"
        });

        this.usuario.contrasena = '';
        return;
      }

      const res = await this.servicioAuth.iniciar(credenciales.correo, credenciales.contrasena)
        .then(res => {
          Swal.fire({
            title: "¡Buen trabajo!",
            text: "¡Se pudo ingresar con éxito :)!",
            icon: "success"
          });
          
          this.servicioAuth.setUsuarioRol(usuarioData.rol);
          if (usuarioData.rol === "admin") {

            console.log("Inicio de administrador");

            // Si es administrador, redirecciona a la vista de "admin"
            this.servicioRutas.navigate(['/admin']);

          } else {
            console.log("Inicio de visitante");
            this.servicioRutas.navigate(['/inicio']);
          }
        })
        .catch(err => {
          Swal.fire({
            title: "¡Oh no!",
            text: "Hubo un problema al iniciar sesión :( " + err,
            icon: "error"
          });

          this.limpiarinputs();
        })
    } catch (error) {
      this.limpiarinputs();
    }
  }

  limpiarinputs() {
    const inputs = {
      correo: this.usuario.correo = "",
      contrasena: this.usuario.contrasena = ""
    }
  }
}



