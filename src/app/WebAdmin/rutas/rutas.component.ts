import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/WebServices/servicios.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.component.html',
  styleUrls: ['./rutas.component.css']
})

export class RutasComponent implements OnInit{
  ORutas: any;
  FormRutas!: FormGroup;
  EditarR: any;
  CrearR: any;
  seleccionado: boolean = false;
  elementoSeleccionado: any;

  constructor(private webServices: ServiciosService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.TraerRutas();
    this.inicializarFormulario();
  }

  inicializarFormulario() {
    this.FormRutas = new FormGroup({
      id_rutas: new FormControl( {value: null, disabled: true} ),
      nombreRuta: new FormControl(),
      dias: new FormControl(),
      zonasRecoleccion: new FormControl(),
      foto: new FormControl()
    });
  }

   // habilita el horario para poder escribir
   habilitarIdHorario() {
    this.FormRutas.get('id_rutas')?.enable();
  }

  generarId() {
    function obtenerIniciales(frase: string): string {
      const palabras = frase.split(' ');
      const iniciales = palabras.map(palabra => palabra.substr(0, 2));
      return iniciales.join('');
    }
    const nombreRuta = document.querySelector('.ruta-input') as HTMLSelectElement;
    const zonasRecoleccion = this.FormRutas.get('zonasRecoleccion')?.value;
    // Convierte los números a texto y obtén las dos primeras letras
    const Ruta = nombreRuta.options[nombreRuta.selectedIndex].text;
    const Zonas = zonasRecoleccion.toString().substr(0, 2);
    // Genera el id_horario
    const Rutan = obtenerIniciales(Ruta);
    const id = Rutan + Zonas + Math.floor(100 + Math.random() * 900);
    this.FormRutas.get('id_rutas')?.setValue(id);
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
    const tiposMIMEPermitidos = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp', 'image/avif'];
    return tiposMIMEPermitidos.includes(file.type);
  }

  // Convierte la imagen a Base64
  convertirImagenABase64(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const base64Image = reader.result as string;
      this.FormRutas.get('foto')?.setValue(base64Image);
      console.log('Imagen en base64:', base64Image);
    };
    reader.onerror = (error) => {
      console.error('Error al leer el archivo:', error);
    };
    reader.readAsDataURL(file);
  }

  opcRutas(accion: string, id_rutas?: string) {
    switch (accion) {
      case 'añadir':
        const RutasData = { ...this.FormRutas.value, foto: this.FormRutas.get('foto')?.value, id_rutas: this.FormRutas.get('id_rutas')?.value };
        this.webServices.crearRuta(RutasData)
          .subscribe(
            (rutas: any) => {
            this.CrearR = rutas.data;
            this.TraerRutas();
            this.toastr.success('Nueva ruta creada', 'Éxito');
            this.Limpiar();
          }, error => {
            this.toastr.error('Error al crear la ruta');
          }
        );
        break;
      case 'editar':
          const RutasDataE = { ...this.FormRutas.value, foto: this.FormRutas.get('foto')?.value };
          this.webServices.ActualizarRuta(RutasDataE)
            .subscribe(
              (respuesta: any) => {
              this.EditarR = respuesta;
              this.TraerRutas();
              this.toastr.success('Se ha editado la ruta', 'Éxito');
              this.Limpiar();
            },error => {
              this.toastr.error('Error al editar la ruta');
            }
          );
        break;
      case 'eliminar':
          this.webServices.EliminarRutas("" + id_rutas + "")
            .subscribe(
              (data: any) => {
                console.log(data);
                this.TraerRutas();
                this.toastr.success('Ruta eliminada con exito', 'Éxito');
            },error => {
                this.toastr.error('Error al eliminar la ruta');
            }
          );
        break;
      default:
        console.log('Accion invalida')
    }
  }
  //////////// ver todos los contenedores //////////////////
  TraerRutas() {
    this.webServices.getRutas()
     .subscribe((rutas: any) => {
      this.ORutas = rutas;
      console.log(this.ORutas);
     });
  }
  ////////////// traer contenedor por id ////////////////////
  TraerContenedoresId(id: string) {
    this.webServices.getRutasId(id)
      .subscribe(rutas => {
        this.ORutas = rutas;
      })
  }

  seleccionarFila(element: any) {
    this.FormRutas.patchValue({
      id_rutas: element.id_rutas,
      nombreRuta: element.nombreRuta,
      dias: element.dias,
      zonasRecoleccion: element.zonasRecoleccion
    })
    this.elementoSeleccionado = element;
    this.seleccionado = true;
    this.toastr.success('Fila Seleccionada', 'Éxito');
  }

  Limpiar() {
    this.FormRutas.reset()
  }
  //// boton limpiar tabla de rutatr en la base de datos
  LimpiarTrutatr() {
    this.webServices.limpiarTabla().subscribe({
      next: (response) => console.log(response),
      error: (err) => console.error(err),
    });
}
}