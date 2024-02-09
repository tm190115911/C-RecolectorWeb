import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../../WebServices/servicios.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

interface Zona {
  Id_zona: number;
  nombreZona: string;
  // Otros campos si los hay
}


@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})

export class HorariosComponent implements OnInit {
  elementoSeleccionado: any;    // indica el elemento seleccionado 
  seleccionado: boolean = false;  // Nos permite ver el fomulario cuando el valor es true
  FormHorarios!: FormGroup;  // Formulario
  editarH: any;     // Editar horarios
  CrearHorario: any;  // Crear horarios 
  Ohorarios: any;   // Obtenemos todos los horarios de la base de datos
  OhorariosZ: any;  // Obtenemos todas las zonas
  //Para generar el id
  gID: any;
  turno: any;


  constructor(private webServices: ServiciosService, private toastr: ToastrService) { }

  ngOnInit() {
    this.TraerHorarios();
    this.TraerHorariosZ();
    this.inicializarFormulario();
  }

  inicializarFormulario() {
    this.FormHorarios = new FormGroup({
      id_horario: new FormControl(),
      turno: new FormControl(),
      zona: new FormControl(),
      dias: new FormControl(),
      horario: new FormControl()
    })
  }
  // habilita el horario para poder escribir
  habilitarIdHorario() {
    this.FormHorarios.get('id_horario')?.enable();
  }
 /* genera el id toma las las 2 primeras iniciales de cada palabra 
 y agrega un numero de 3 digitos al final */
  generarId() {
    function obtenerIniciales(frase: string): string {
      const palabras = frase.split(' ');
      const iniciales = palabras.map(palabra => palabra.substr(0, 2));
      return iniciales.join('');
    }
    const zonaSelect = document.querySelector('.zona-input') as HTMLSelectElement;
    const turnoInput = document.querySelector('.turno-input') as HTMLSelectElement;

    // Obtén el valor del Id_zona seleccionado
    const idZona = zonaSelect.value;
    const idTurno = turnoInput.value;

    const nombreZona = zonaSelect.options[zonaSelect.selectedIndex].text;
    const nombreInput = turnoInput.options[turnoInput.selectedIndex].text;

    const zonaInicio = obtenerIniciales(nombreZona);
    const turnoInicio = nombreInput.substr(0, 2) || '';

    const id = turnoInicio + "-" + zonaInicio + Math.floor(100 + Math.random() * 900);
    this.FormHorarios.get('id_horario')?.setValue(id);
  }

  opcHorarios(accion: string) {
    switch (accion) {
      //////////////// añade un nuevo horario ////////////////
      case 'añadir':
        this.webServices.crearHorario(this.FormHorarios.value)
          .subscribe((horario: any) => {
            this.CrearHorario = horario.data;
            this.Limpiar()
            this.TraerHorarios()
            this.toastr.success('Horario creado con éxito', 'Éxito');
          }, error => {
            this.toastr.error('Error al crear el horario', 'Error');
          });
        break;
      /////////// editar horarios //////////////
      case 'editar':
        if (this.seleccionado) {
          this.webServices.ActualizarHorario(this.FormHorarios.value)
            .subscribe(respuesta => {
              this.editarH = respuesta
              this.TraerHorarios()
              this.toastr.success('Horario actualizado con éxito', 'Éxito');
            }, error => {
              this.toastr.error('Error al editar el horario', 'Error');
            });
        } else {
          console.log('Ningun horario seleccionado');
        }
        break;
      default:
        console.log('Accion invalida');
    }
  }
  eliminarHorario(id: string) {
    if (confirm('¿Estás seguro de que deseas eliminar este horario?')) {
      this.webServices.EliminarHorario(id)
        .subscribe(() => {
          this.TraerHorarios(); // Actualiza la lista después de la eliminación
          this.Limpiar();
          this.toastr.success('Horario eliminado con éxito', 'Éxito');
        }, error => {
          this.toastr.error('Error al eliminar el horario', 'Error');
        });
    }
  }
  ////////////// ver todos los horarios horarios ///////////////////
  TraerHorarios() {
    this.webServices.getHorarios()
      .subscribe(horarios => {
        this.Ohorarios = horarios;
      })
  }
  TraerHorariosZ() {
    this.webServices.getHorariosZonas()
      .subscribe(zonas => {
        this.OhorariosZ = zonas;
      })
  }
  /////////////// traer horarios por id //////////////////////
  TraerHorariosId(id: string) {
    this.webServices.EliminarHorario(id)
      .subscribe(horarios => {
        this.Ohorarios = horarios;
      })
  }
  // asigna el elemento seleccionado y indica que hay un elemento seleccionado
  seleccionarFila(element: any) {
    this.FormHorarios.patchValue({
      id_horario: element.id_horario,
      turno: element.turno,
      zona: element.zona,
      dias: element.dias,
      horario: element.horario
    });
    this.seleccionado = true;
    this.elementoSeleccionado = element;
    this.toastr.success('Fila Seleccionada', 'Éxito');
  }
  Limpiar() {
    this.FormHorarios.reset();
  }
}