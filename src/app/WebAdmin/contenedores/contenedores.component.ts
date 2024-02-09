import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ServiciosService } from 'src/app/WebServices/servicios.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-contenedores',
  templateUrl: './contenedores.component.html',
  styleUrls: ['./contenedores.component.css']
})

export class ContenedoresComponent implements OnInit {
  OContenedores: any;
  FormContenedores!: FormGroup;
  EditarC: any;
  CrearC: any;
  seleccionado: boolean = false;
  elementoSeleccionado: any;

  constructor(private webServices: ServiciosService, private toastr: ToastrService) { }

  ngOnInit() {
    this.TraerContenedores();
    this.inicializarFormulario();
  }

  inicializarFormulario() {
    this.FormContenedores = new FormGroup({
      id_contenedor: new FormControl( {value: null, disabled: true} ),
      nombre: new FormControl(),
      foto: new FormControl(),
      descripcion: new FormControl(),
      LatitudLongitud: new FormControl()
    });
  }

  // habilita el horario para poder escribir
  habilitarIdHorario() {
    this.FormContenedores.get('id_contenedor')?.enable();
  }

  generarId() {
    const P = "C-"
    const Titulo = this.FormContenedores.get('nombre')?.value;
    // Convierte los números a texto y obtén las dos primeras letras
    const TituloInicio = Titulo.toString().substr(0, 4);
    // Genera el id_horario
    const id = P + TituloInicio + Math.floor(100 + Math.random() * 900);
    this.FormContenedores.get('id_contenedor')?.setValue(id);
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
    const tiposMIMEPermitidos = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp', 'imege/avif'];
    return tiposMIMEPermitidos.includes(file.type);
  }

  // Convierte la imagen a Base64
  convertirImagenABase64(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const base64Image = reader.result as string;
      this.FormContenedores.get('foto')?.setValue(base64Image);
      console.log('Imagen en base64:', base64Image);
    };
    reader.onerror = (error) => {
      console.error('Error al leer el archivo:', error);
    };
    reader.readAsDataURL(file);
  }

  opcContenedores(accion: string, id_contenedor?: string) {
    switch (accion) {
      case 'añadir':
        const ContenedorData = { ...this.FormContenedores.value, foto: this.FormContenedores.get('foto')?.value, id_contenedor: this.FormContenedores.get('id_contenedor')?.value };
        this.webServices.crearContenedor(ContenedorData)
          .subscribe(
            (contenedores: any) => {
            this.CrearC = contenedores.data;
            this.TraerContenedores();
            this.toastr.success('Nuevo contenedor creado', 'Éxito');
            this.Limpiar();
          },
          (error: any) => {
            this.toastr.error('Error al crear el contenedor');
          }
        );
        break;
      case 'editar':
          const ContenedorDataE = { ...this.FormContenedores.value, foto: this.FormContenedores.get('foto')?.value };
          console.log(ContenedorDataE)
          this.webServices.ActualizarInfContenedor(ContenedorDataE)
            .subscribe(
              (respuesta: any) => {
              this.EditarC = respuesta;
              this.TraerContenedores();
              this.toastr.success('Contenedor editado', 'Éxito');
              this.Limpiar();
            }, error => {
              this.toastr.error('Error al editar el contenedor');
            }
          );
        break;
        case 'eliminar':
          this.webServices.EliminarContenedor("" + id_contenedor + "")
            .subscribe(
              (data: any) => {
                console.log(data);
                this.TraerContenedores();
                this.toastr.success('Contenedor eliminado con éxito','Éxito');
              }, error => {
                this.toastr.error('Error al eliminar el contenedor');
              }
            );
          break;
      default:
        console.log('Accion invalida')
    }
  }
  //////////// ver todos los contenedores //////////////////
  TraerContenedores() {
    this.webServices.getContenedores()
      .subscribe(contenedores => {
        console.log(contenedores);
        this.OContenedores = contenedores;
      })
  }
  ////////////// traer contenedor por id ////////////////////
  TraerContenedoresId(id: string) {
    this.webServices.getContenedoresId(id)
      .subscribe(contenedores => {
        this.OContenedores = contenedores;
      })
  }
  seleccionarFila(element: any) {
    this.FormContenedores.patchValue({
      id_contenedor: element.id_contenedor,
      nombre: element.nombre,
      descripcion: element.descripcion,
      ubicacion: element.ubicacion
    })
    this.elementoSeleccionado = element
    this.seleccionado = true;
    this.toastr.success('Fila Seleccionada', 'Éxito');
  }
  Limpiar() {
    this.FormContenedores.reset()
  }
}