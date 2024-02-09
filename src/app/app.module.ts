import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Rutas 
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HorariosComponent } from './WebAdmin/horarios/horarios.component';
import { AvisosComponent } from './WebAdmin/avisos/avisos.component';
import { LoginComponent } from './WebAdmin/login/login.component';
import { RegisterComponent } from './WebAdmin/register/register.component';
import { HomeComponent } from './WebAdmin/home/home.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PaginaNoEncontradaComponent } from './pagina-no-encontrada/pagina-no-encontrada.component';
import { ContenedoresComponent } from './WebAdmin/contenedores/contenedores.component';
import { RutasComponent } from './WebAdmin/rutas/rutas.component';
import { RutaTRComponent } from './WebAdmin/ruta-tr/ruta-tr.component';

// Services 
import { ServiciosService } from '../app/WebServices/servicios.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Toast
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RecoleccionEspecialComponent } from './WebAdmin/recoleccion-especial/recoleccion-especial.component'; 

@NgModule({
  declarations: [
    AppComponent,
    HorariosComponent,
    AvisosComponent,
    ContenedoresComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    FooterComponent,
    NavbarComponent,
    PaginaNoEncontradaComponent,
    RutasComponent,
    RutaTRComponent,
    RecoleccionEspecialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
    }),
  ],
  providers: [
    ServiciosService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
