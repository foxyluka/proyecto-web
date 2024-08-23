import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:"",loadChildren:()=>import('./modules/autentificacion/autentificacion.module').then(m=>m.AutentificacionModule)
  },
  {
    path:"",loadChildren:()=>import('./modules/inicio/inicio.module').then(m=>m.InicioModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
