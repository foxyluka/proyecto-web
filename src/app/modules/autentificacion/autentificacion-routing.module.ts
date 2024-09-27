import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './registro/registro.component';
import { InicioComponent } from '../inicio/pages/inicio/inicio.component';

const routes: Routes = [
  {
    path: "registro", component: RegistroComponent
  },
  {
    path: "inicio-sesion", component: InicioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutentificacionRoutingModule { }
