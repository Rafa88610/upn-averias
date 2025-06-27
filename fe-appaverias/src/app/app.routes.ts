import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AtencionComponent } from './atencion/atencion.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { RegistrarAveriaComponent } from './registrar-averia/registrar-averia.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'atencion',
    component: AtencionComponent,
  },
  {
    path: 'registrar-averia',
    component: RegistrarAveriaComponent
  },
  {
    path: 'usuarios',
    component: UsuariosComponent,
  },
];
