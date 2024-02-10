import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './WebAdmin/home/home.component';
import { HorariosComponent } from './WebAdmin/horarios/horarios.component';
import { AvisosComponent } from './WebAdmin/avisos/avisos.component';
import { LoginComponent } from './WebAdmin/login/login.component';
import { RegisterComponent } from './WebAdmin/register/register.component';
import { PaginaNoEncontradaComponent } from './pagina-no-encontrada/pagina-no-encontrada.component';
import { ContenedoresComponent } from './WebAdmin/contenedores/contenedores.component';
import { RutasComponent } from './WebAdmin/rutas/rutas.component';
import { RutaTRComponent } from './WebAdmin/ruta-tr/ruta-tr.component';
import { RecoleccionEspecialComponent } from './WebAdmin/recoleccion-especial/recoleccion-especial.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  //login y register
  {
    path: 'login',
    component: LoginComponent,
    title: 'Iniciar Secion',
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Registrate'
  },
  //Ruta principal
  {
    path: 'home',
    component: HomeComponent,
    title: 'Resumen',
  },
  {
    path: 'horarios',
    component: HorariosComponent,
    title: 'Horarios'
  },
  {
    path: 'avisos',
    component: AvisosComponent,
    title: 'Avisos'
  },
  {
    path: 'contenedores',
    component: ContenedoresComponent,
    title: 'Contenedores'
  },
  {
    path: 'rutas',
    component: RutasComponent,
    title: 'Rutas'
  },
  {
    path: 'rutaTR',
    component: RutaTRComponent,
    title: 'Ruta TR'
  },
  {
    path: 'recoleccionEspecial',
    component: RecoleccionEspecialComponent,
    title: 'RE'
  },
  {
    path: 'paginaNoEncontrada',
    component: PaginaNoEncontradaComponent,
    title: 'No se encontro la pagina'
  },
  //El usuario ingresa cualquier cosa
  {
    path: '**',
    component: PaginaNoEncontradaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
