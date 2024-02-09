import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { avisos } from '../Modelos/avisos';
import { horarios } from '../Modelos/horarios';
import { usuarios } from '../Modelos/usuarios';
import { contenedores } from '../Modelos/contenedores';
import { rutas } from '../Modelos/rutas';
import { RE } from '../Modelos/RE';
import { frases } from '../Modelos/frases';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  private headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
  private api = 'http://localhost/be_recolector.local/public';

  constructor(private http: HttpClient) { }
  ////////////////////////////////// Login //////////////////////////////////
  onPostLogin(usuario:any){
    return this.http.post(this.api + "/usuario/login", usuario, {headers:this.headers});
  }
  ////////// Crear registro de datos de ingreso /////////////// 
  createRegistroLogin(resu: usuarios) {
    const path = `${this.api}/usuario/registro/nuevo`;
    return this.http.post(path, resu, {headers:this.headers});
  }
  ////////////////////////////////// Frases /////////////////////////////////
  //Treaer todos los datos
  getFrases() {
    const path = `${this.api}/frases/todos`;
    return this.http.get<frases[]>(path, {headers: this.headers})
      .pipe(map((frases: any) => {
        return frases.data;
      })) 
  }
  // Traer un dato por id 
  getFrasesId(id: number) {
    const path = `${this.api}/frases/uno/${id}`;
    return this.http.get<frases>(path, {headers:this.headers})
   .pipe(map((frases:any)=>{
     return frases.data;
   }))
  }
  /////////////// crear /////////////////
  crearFrase(frase: frases) {
    const path = `${this.api}/frases/nuevo`;
    return this.http.post(path, frase, {headers:this.headers});
  }
 ////////////////////// actualizar //////////////
  ActualizarFrase(frase: frases) {
   const path = `${this.api}/frases/editar/${frase.id}`;
   return this.http.put<avisos>(path, frase, {headers:this.headers});
  }
 ///////////////////// Eliminar ///////////////
 EliminarFrase(id: number) {
   const path = `${this.api}/frases/eliminar/${id}`;
   return this.http.delete(path, {headers:this.headers});
 }
  //////////////////////////////////Avisos/////////////////////////////////
  //Treaer todos los datos
  getAvisos() {
    const path = `${this.api}/avisos/todos`;
    return this.http.get<avisos[]>(path, {headers: this.headers})
      .pipe(map((avisos: any) => {
        return avisos.data;
      })) 
  }
  // Traer un dato por id 
  getAvisosId(id_aviso: string) {
    const path = `${this.api}/avisos/uno/${id_aviso}`;
    return this.http.get<avisos>(path, {headers:this.headers})
   .pipe(map((datos:any)=>{
     return datos.data;
   }))
  }
  /////////////// crear aviso /////////////////
  crearAviso(aviso: avisos) {
    const path = `${this.api}/avisos/nuevo`;
    return this.http.post(path, aviso, {headers:this.headers});
  }
 ////////////////////// actualizar avisos //////////////
  ActualizarAviso(aviso:avisos) {
   const path = `${this.api}/avisos/editar/${aviso.id_aviso}`;
   return this.http.put<avisos>(path, aviso, {headers:this.headers});
  }
 ///////////////////// Eliminar avisos ///////////////
 EliminarAviso(id_aviso: string) {
   const path = `${this.api}/avisos/eliminar/${id_aviso}`;
   return this.http.delete(path, {headers:this.headers});
 }
  //////////////////////////////////////////////////HORARIOS /////////////////////////////////////
   ///////////// traer todos los horarios ///////////
   getHorarios() {
    const path = `${this.api}/horarios/todos`;
    return this.http.get<horarios[]>(path, {headers:this.headers})
    .pipe(map((horarios:any)=>{
      return horarios.data;
    })) 
  }
  ////////////// traer horario por id /////////////////
  getHorariosId(id_horario: string) {
    const path = `${this.api}/horarios/uno/${id_horario}`;
    return this.http.get<horarios>(path, {headers:this.headers})
   .pipe(map((horarios:any)=>{
     return horarios.data;
   }))
  }
  ////////////// crear horario ///////////////
  crearHorario(horario: horarios){
    const path = `${this.api}/horarios/nuevo`;
    return this.http.post(path, horario, {headers:this.headers})
  }
  ////////////// Editar horario ///////////////
  ActualizarHorario(horario: horarios) {
    const path = `${this.api}/horarios/editar/${horario.id_horario}`;
    return this.http.put<horarios>(path, horario, {headers:this.headers});
   }
  ////////////// eliminar horario ///////////////
  EliminarHorario(id_horario: string) {
    const path = `${this.api}/horarios/eliminar/${"'" + id_horario + "'"}`;
    return this.http.delete(path, {headers:this.headers});
  }
  ////////////// traer todas las zoana ///////////
  getHorariosZonas() {
    const path = `${this.api}/horarios/todosZonas`;
    return this.http.get<horarios[]>(path, {headers:this.headers})
    .pipe(map((horarios:any)=>{
      return horarios.data;
    })) 
  }
///////////////////////////////////// Contenedores ///////////////////////////
  /////////////// Obtener contenedores /////////////////////
  getContenedores() {
    const path = `${this.api}/contenedores/todos`;
    return this.http.get<contenedores[]>(path, {headers: this.headers})
      .pipe(map((contenedores: any) => {
        return contenedores.data;
      })) 
  }
  // Traer un dato por id 
  getContenedoresId(id_contenedor: string) {
    const path = `${this.api}/contenedores/uno/${id_contenedor}`;
    return this.http.get<contenedores>(path, {headers:this.headers})
   .pipe(map((contenedores:any)=>{
     return contenedores.data;
   }))
  }
  /////////////// crear Contenedores /////////////////
  crearContenedor(contenedor: contenedores) {
    const path = `${this.api}/contenedores/nuevo`;
    return this.http.post(path, contenedor, {headers:this.headers});
  }
 ////////////////////// actualizar contenedores //////////////
  ActualizarInfContenedor(contenedor:contenedores) {
   const path = `${this.api}/contenedores/editar/${contenedor.id_contenedor}`;
   return this.http.put<contenedores>(path, contenedor, {headers:this.headers});
  }
 ///////////////////// Eliminar contenedor ///////////////
 EliminarContenedor(id_contenedor: string) {
   const path = `${this.api}/contenedores/eliminar/${id_contenedor}`;
   return this.http.delete(path, {headers:this.headers});
 }
///////////////////////////////////// Rutas ///////////////////////////
  /////////////// Obtener rutas /////////////////////
  getRutas() {
    const path = `${this.api}/rutas/todos`;
    return this.http.get<rutas[]>(path, {headers: this.headers})
      .pipe(map((rutas: any) => {
        return rutas.data;
      })) 
  }
  // Traer un dato por id 
  getRutasId(id_rutas: string) {
    const path = `${this.api}/rutas/uno/${id_rutas}`;
    return this.http.get<rutas>(path, {headers:this.headers})
   .pipe(map((rutas:any)=>{
     return rutas.data;
   }))
  }
  /////////////// crear Contenedores /////////////////
  crearRuta(ruta: rutas) {
    const path = `${this.api}/rutas/nuevo`;
    return this.http.post(path, ruta, {headers:this.headers});
  }
 ////////////////////// actualizar contenedores //////////////
  ActualizarRuta(ruta: rutas) {
   const path = `${this.api}/rutas/editar/${ruta.id_rutas}`;
   return this.http.put<rutas>(path, ruta, {headers:this.headers});
  }
 ///////////////////// Eliminar contenedor ///////////////
 EliminarRutas(id_rutas: string) {
   const path = `${this.api}/rutas/eliminar/${id_rutas}`;
   return this.http.delete(path, {headers:this.headers});
 }
 ////////////////////////////// ruta timepo real //////////////////////
  ////// limpiar tabla rtrt 
  limpiarTabla() {
    const path = `${this.api}/rutatr/limpiar`;
    return this.http.get(path, {headers:this.headers});
  }
 ///////////////////////////////////// Recoleccion especial ///////////////////////////
   /////////////// Obtener RE /////////////////////
   getRE() {
    const path = `${this.api}/recoleccionEsp/todos`;
    return this.http.get<RE[]>(path, {headers: this.headers})
      .pipe(map((re: any) => {
        return re.data;
      })) 
  }
  // Traer un dato por id 
  getREId(Id_RE: string) {
    const path = `${this.api}/recoleccionEsp/uno/${Id_RE}`;
    return this.http.get<RE>(path, {headers:this.headers})
   .pipe(map((re:any)=>{
     return re.data;
   }))
  } 
  /////////////// crear Contenedores /////////////////
  crearRE(re: RE) {
    const path = `${this.api}/recoleccionEsp/nuevo`;
    return this.http.post(path, re, {headers:this.headers});
  }
 ////////////////////// actualizar contenedores //////////////
  ActualizarRE(re: RE) {
   const path = `${this.api}/recoleccionEsp/editar/${re.Id_RE}`;
   return this.http.put<RE>(path, re, {headers:this.headers});
  }
 ///////////////////// Eliminar contenedor ///////////////
 EliminarRE(Id_RE: string) {
   const path = `${this.api}/recoleccionEsp/eliminar/${Id_RE}`;
   return this.http.delete(path, {headers:this.headers});
 }
  //////////////////////////////////DatosUsuarios//////////////////////////
  // Traer un dato por id 
//  getDatoId(idDato: string) {
//    const path = `${this.api}/usuarios/uno/${idDato}`;
//    return this.http.get<avisos>(path, {headers:this.headers})
//   .pipe(map((datos:any)=>{
//     return datos.data;
//   }))
//  }
    ///////// crear registro datos del usuario /////////////////
 // createRegistro(trabajo: datos) {
 //   const path = `${this.api}/usuarios/dato/nuevo`;
 //   return this.http.post(path, trabajo, {headers:this.headers});
 // }
  ////////// Crear registro de datos de ingreso /////////////// 
 // createRegistroLogin(res: usuarios) {
 //   const path = `${this.api}/usuario/registro/nuevo`;
 //   return this.http.post(path, res, {headers:this.headers});
 // }
}
