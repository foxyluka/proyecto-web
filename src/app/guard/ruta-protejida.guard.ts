
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../modules/autentificacion/services/auth.service';
import { map, switchMap, of, from } from 'rxjs'

export const rutaProtejidaGuard: CanActivateFn = (route, state) => {
  const servicioAuth = inject(AuthService)

  const servicioRutas = inject(Router)
  
  const rolEsperado = 'admin'

  return from(servicioAuth.obteneruid()).pipe(
    switchMap(uid => {
      if (uid) {
        return servicioAuth.obtenerRol(uid).pipe(
          map(rol => {
            if (rol === rolEsperado) {
              console.log('Usuario verificado como administrador')
              return true
            } else {
              return false
            }
          }))
      } else {
        console.log("Usuario no validado. permisos insuficientes")
        return of(servicioRutas.createUrlTree(["/inicio"]))
      }
    })
  )
};
