import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/WebServices/servicios.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ruta-tr',
  templateUrl: './ruta-tr.component.html',
  styleUrls: ['./ruta-tr.component.css']
})
export class RutaTRComponent implements OnInit {

  constructor(private http: HttpClient, private webServices: ServiciosService) {}

  ngOnInit(): void {
  }

  Limpiar() {
    this.webServices.limpiarTabla().subscribe({
      next: (response) => console.log(response),
      error: (err) => console.error(err),
    });
}
}
