import { Component, OnInit} from '@angular/core';
import { ServiciosService } from '../../WebServices/servicios.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/_guards/auth.service';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{
  // frases
  Ofrases: any; // mostar frases
  FormFrases!: FormGroup; // formulario
  crearFrase: any; // crear frase
  editarF: any; // editar frase
  seleccionado: boolean = false;
  elementoSeleccionado: any;
  ////////////////////////////////////////////
  nombreUsuario: string | undefined;
  // horarios
  Ohorarios: any; // datos horarios
  FormHorarios!: FormGroup;  // Formulario horarios
  showHorarios = false; // mostrar/ocultar horarios
  // avisos
  showAvisos = false; // mostrar/ocultar avisos
  Oavisos: any; // Usada para traer todos los avisos
  // rutas
  showRutas = false; // mostrar/ocultar rutas
  // contenedores
  showContenedores = false; //mostrar/ocultar contenedores

  constructor(private webServices: ServiciosService, 
    private authService: AuthService,
    private toastr: ToastrService) { }
  
  ngOnInit() {
    // Obtén la información del usuario al cargar la página
    const usuario = this.authService.onGetUsuario();
    console.log(usuario.value);
    this.nombreUsuario = usuario ? usuario.nombre : undefined;
    this.inicializarFormularioFrases();
    this.TraerFrases();
    this.TraerHorarios();
    this.TraerAvisos();
  }
///////// Frases
  inicializarFormularioFrases() {
    this.FormFrases = new FormGroup({
      id: new FormControl(),
      frase: new FormControl(),
      autor: new FormControl()
    });
  }
// Acciones añadir, editar y eliminar
opcFrases(accion: string, id?: number) {
  ///////////////////////////////////// Metodo añadir ///////////////////////////////
    switch (accion) {
      case 'añadir':
        this.webServices.crearFrase(this.FormFrases.value)
          .subscribe(
            (avisos: any) => {
              this.crearFrase = avisos.data;
              this.TraerFrases();
              this.toastr.success('Nueva frase creada', 'Éxito');
              this.Limpiar();
            }, error => {
              this.toastr.error('Error al crear la frase');
            });
        break;
   ////////////////////////////// Editar avisos ////////////////////////////////////////////    
      case 'editar':
        this.webServices.ActualizarFrase(this.FormFrases.value)
          .subscribe(
            (respuesta: any) => {
              this.editarF = respuesta;
              this.TraerFrases();
              this.Limpiar();
              this.toastr.success('Frase editada con éxito', 'Éxito');
            }, error => {
              this.toastr.error('Hubo un error en la edicion');
            });
        break;
  //////////////////////// eliminar avisos ///////////////////////
      case 'eliminar':
        if (confirm('¿Estás seguro de que deseas eliminar este aviso?')) {
        this.webServices.EliminarFrase(id!)
          .subscribe(
            (data: any) => {
              console.log(data);
              this.TraerFrases();
              this.toastr.success('Frase eliminada correctamente', 'Éxito');
            }, error => {
              this.toastr.error('Ha habido un error');
            });
          }
        break;
      default:
      console.log('Accion invalida');
    }
  }
  ////////// ver todos los avisos ///////////////////
  TraerFrases() {
    this.webServices.getFrases()
      .pipe(
        catchError((error: any) => {
          console.error('Error en la solicitud:', error);
          return throwError('Error en la solicitud');
        })
      )
      .subscribe(
        (frases: any) => {
          this.Ofrases = frases;
          console.log(this.Ofrases);
        }
      );
  }
  seleccionarFila(element: any) {
    this.FormFrases.patchValue({
      id: element.id,
      frase: element.frase,
      autor: element.autor,
    });
    this.elementoSeleccionado = element;
    this.seleccionado = true;
    this.toastr.success('Fila Seleccionada', 'Éxito');
  }
  ////////////////////////////////////
  TraerHorarios() {
    this.webServices.getHorarios()
      .subscribe(horarios => {
        this.Ohorarios = horarios;
      }) 
  }
  TraerAvisos() {
    this.webServices.getAvisos()
    .subscribe(avisos => {
      this.Oavisos = avisos;
    })
  }
  mostrarHorarios() {
    this.showHorarios = !this.showHorarios
  }
  mostrarAvisos() {
    this.showAvisos = !this.showAvisos
  }
  mostrarRutas(){
    this.showRutas = !this.showRutas
  }
  mostrarContenedores(){
    this.showContenedores = !this.showContenedores
  }
  // Resetea el formulario
  Limpiar() {
    this.FormFrases.reset();
  }
}
