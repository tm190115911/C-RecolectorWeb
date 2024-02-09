import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../../WebServices/servicios.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-recoleccion-especial',
  templateUrl: './recoleccion-especial.component.html',
  styleUrls: ['./recoleccion-especial.component.css']
})

export class RecoleccionEspecialComponent implements OnInit {
  ORE: any;
  FormRE!: FormGroup; // Formulario
  editarRE: any; // editar 
  seleccionado: boolean = false;
  elementoSeleccionado: any;

  constructor(private webServices: ServiciosService, private toastr: ToastrService) { }

  ngOnInit() {
    this.inicializarFormulario();
    this.TraerRE();
  }
  
  inicializarFormulario() {
    this.FormRE = new FormGroup({
      Id_RE: new FormControl(),
      nombreSolicitante: new FormControl(),
      nombreCalle: new FormControl(),
      descripcion: new FormControl(),
      foto: new FormControl(),
      tipoMaterial: new FormControl(),
      entreCalles: new FormControl(),
      numeroInterior: new FormControl(),
      numeroExterior: new FormControl(),
      colonia: new FormControl(),
      codigoPostal: new FormControl(),
      tipoLugar: new FormControl(),
      numeroTelefono: new FormControl(),
      correoElectronico: new FormControl()
    });
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
      this.FormRE.get('foto')?.setValue(base64Image);
      console.log('Imagen en base64:', base64Image);
    };
    reader.onerror = (error) => {
      console.error('Error al leer el archivo:', error);
    };
    reader.readAsDataURL(file);
  }

  // Acciones añadir, editar y eliminar
  opcRE(accion: string, Id_RE?: string) {
    ///////////////////////////////////// Metodo añadir ///////////////////////////////
      switch (accion) {
        case 'añadir':
          const REData = { ...this.FormRE.value, foto: this.FormRE.get('foto')?.value };
          this.webServices.crearRE(REData)
            .subscribe(
              (re: any) => {
                console.log(this.FormRE.value);
                console.log(re.foto)
                this.ORE = re.data;
                this.TraerRE();
                this.toastr.success('Nuevo mensaje creado', 'Éxito');
                this.Limpiar();
              }, error => {
                this.toastr.error('A surgido un error al crear el mensaje');
              });
          break;
     ////////////////////////////// Editar avisos ////////////////////////////////////////////    
        case 'editar':
          const REDataE = { ...this.FormRE.value, foto: this.FormRE.get('foto')?.value };
          this.webServices.ActualizarAviso(REDataE)
            .subscribe(
              (re: any) => {
                this.editarRE = re;
                this.TraerRE();
                this.Limpiar();
                this.toastr.success('Mensaje editado con éxito', 'Éxito');
              }, error => {
                this.toastr.error('No se editó ningun mensaje');
              });
          break;
    //////////////////////// eliminar avisos ///////////////////////
        case 'eliminar':
          if (confirm('¿Estás seguro de que deseas eliminar esto?')) {
          this.webServices.EliminarAviso("" + Id_RE + "")
            .subscribe(
              (data: any) => {
                console.log(data);
                this.TraerRE();
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
    TraerRE() {
      this.webServices.getRE()
        .pipe(
          catchError((error: any) => {
            console.error('Error en la solicitud:', error);
            return throwError('Error en la solicitud');
          })
        )
        .subscribe(
          (re: any) => {
            this.ORE = re;
            console.log(this.ORE);
          }
        );
    }
  
    //////////// traer aviso por id ////////////////
    TraerAvisosId(id: string) {
      this.webServices.getAvisosId(id)
        .subscribe(
          (re: any) => {
            this.ORE = re;
          }
        );
    }
    seleccionarFila(element: any) {
      this.FormRE.patchValue({
        Id_RE: element.Id_RE,
        nombreSolicitante: element.nombreSolicitante,
        nombreCalle: element.nombreCalle,
        descripcion: element.descripcion,
        foto: element.foto,
        tipoMaterial: element.tipoMaterial,
        entreCalles: element.entreCalles,
        numeroInterior: element.numeroInterior,
        numeroExterior: element.numeroExterior,
        colonia: element.colonia,
        codigoPostal: element.codigoPostal,
        tipoLugar: element.tipoLugar,
        numeroTelefono: element.numeroTelefono,
        correoElectronico: element.correoElectronico,
      });
      this.elementoSeleccionado = element;
      this.seleccionado = true;
      this.toastr.success('Fila Seleccionada', 'Éxito');
    }
    // Resetea el formulario
    Limpiar() {
      this.FormRE.reset();
    }
}