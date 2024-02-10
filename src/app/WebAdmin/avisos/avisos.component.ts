import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../../WebServices/servicios.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-avisos',
  templateUrl: './avisos.component.html',
  styleUrls: ['./avisos.component.css']
})

export class AvisosComponent implements OnInit {
  Oavisos: any; // Usada para traer todos los avisos
  FormAvisos!: FormGroup; // Formulario
  crearAviso: any; // crear aviso 
  editarA: any; // editar aviso
  // Para el boton seleccionar
  seleccionado: boolean = false;
  elementoSeleccionado: any;

  constructor(private webServices: ServiciosService, 
    private toastr: ToastrService) { }

  ngOnInit() {
    this.TraerAvisos();
    this.inicializarFormulario();
  }
// { value: null, disabled: true }
// (change)="generarId()"
  // Inicializa el formulario
  inicializarFormulario() {
    this.FormAvisos = new FormGroup({
      id_aviso: new FormControl(),
      titulo: new FormControl(),
      descripcion: new FormControl(),
      fecha: new FormControl(),
      hora: new FormControl(),
      foto: new FormControl()
    });
  }

   // habilita el horario para poder escribir
   habilitarIdHorario() {
    this.FormAvisos.get('id_aviso')?.enable();
  }

  generarId() {
    const P = "Av-"
    const Titulo = this.FormAvisos.get('titulo')?.value;
    // Convierte los números a texto y obtén las dos primeras letras
    const TituloInicio = Titulo.toString().substr(0, 2);
    // Genera el id_horario
    const id = P + TituloInicio + Math.floor(100 + Math.random() * 900);
    this.FormAvisos.get('id_aviso')?.setValue(id);
  }

  archivoSeleccionado(event: any) {
    const file: File | null = event.target.files[0];
    if (file) {
      if (this.esImagenValida(file)) {
        this.convertirImagenABase64(file);
      } else {
        console.error('El archivo seleccionado no es una imagen válida.');
      }
    } else {
      console.error('No se ha seleccionado un archivo válido.');
    }
  }
  // Valida si el archivo es una imagen
  esImagenValida(file: File): boolean {
    const tiposMIMEPermitidos = 
    ['image/jpeg', 
    'image/png',
    'image/gif',
    'image/bmp',
    'image/webp',
    'image/avif'];
    return tiposMIMEPermitidos.includes(file.type);
  }

  // Convierte la imagen a Base64
  convertirImagenABase64(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const base64Image = reader.result as string;
      this.FormAvisos.get('foto')?.setValue(base64Image);
      console.log('Imagen en base64:', base64Image);
    };
    reader.onerror = (error) => {
      console.error('Error al leer el archivo:', error);
    };
    reader.readAsDataURL(file);
  }

  // Acciones añadir, editar y eliminar
  opcAvisos(accion: string, id_aviso?: string) {
  ///////////////////////////////////// Metodo añadir ///////////////////////////////
    switch (accion) {
      case 'añadir':
        this.generarId();
        const avisoData = { ...this.FormAvisos.value, foto: 
          this.FormAvisos.get('foto')?.value, id_aviso: 
          this.FormAvisos.get('id_aviso')?.value };
        console.log(avisoData);
        this.webServices.crearAviso(avisoData)
          .subscribe(
            (avisos: any) => {
              console.log(this.FormAvisos.value);
              console.log(avisos.foto)
              this.crearAviso = avisos.data;
              this.TraerAvisos();
              this.toastr.success('Nuevo aviso creado', 'Éxito');
              this.Limpiar();
            }, error => {
              this.toastr.error('Error al crear el aviso');
            });
        break;
   ////////////////////////////// Editar avisos ////////////////////////////////////////////    
      case 'editar':
        const avisoDataE = { ...this.FormAvisos.value, 
          foto: this.FormAvisos.get('foto')?.value };
        this.webServices.ActualizarAviso(avisoDataE)
          .subscribe(
            (respuesta: any) => {
              this.editarA = respuesta;
              this.TraerAvisos();
              this.Limpiar();
              this.toastr.success('Aviso editado con éxito', 'Éxito');
            }, error => {
              this.toastr.error('No se editó ningun aviso');
            });
        break;
  //////////////////////// eliminar avisos ///////////////////////
      case 'eliminar':
        if (confirm('¿Estás seguro de que deseas eliminar este aviso?')) {
        this.webServices.EliminarAviso("" + id_aviso + "")
          .subscribe(
            (data: any) => {
              console.log(data);
              this.TraerAvisos();
              this.toastr.success('Aviso eliminado correctamente', 'Éxito');
            }, error => {
              this.toastr.error('No se elimino ningun aviso')
            });
          }
        break;
      default:
      console.log('Accion invalida');
    }
  }
  ////////// ver todos los avisos ///////////////////
  TraerAvisos() {
    this.webServices.getAvisos()
      .pipe(
        catchError((error: any) => {
          console.error('Error en la solicitud:', error);
          return throwError('Error en la solicitud');
        })
      )
      .subscribe(
        (avisos: any) => {
          this.Oavisos = avisos;
          console.log(this.Oavisos);
        }
      );
  }

  //////////// traer aviso por id ////////////////
  TraerAvisosId(id: string) {
    this.webServices.getAvisosId(id)
      .subscribe(
        (avisos: any) => {
          this.Oavisos = avisos;
        }
      );
  }
  
  seleccionarFila(element: any) {
    this.FormAvisos.patchValue({
      id_aviso: element.id_aviso,
      titulo: element.titulo,
      descripcion: element.descripcion,
      fecha: element.fecha,
      hora: element.hora
    });
    this.elementoSeleccionado = element;
    this.seleccionado = true;
    this.toastr.success('Fila Seleccionada', 'Éxito');
  }
  // Resetea el formulario
  Limpiar() {
    this.FormAvisos.reset();
  }
}