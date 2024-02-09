import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router'; 
import { ServiciosService } from '../../WebServices/servicios.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  Formr!: FormGroup;
  datosLogin: any;
  constructor(private datos: ServiciosService,
    private router: Router, 
    ){}
  ngOnInit(): void {
      this.Formr = new FormGroup({
        Correo: new FormControl(),
        Clave: new FormControl(),
        numeroTelefono: new FormControl()
      })
  }
  GuardarDatosLogin(){
    this.datos.createRegistroLogin(this.Formr.value)
    .subscribe((res:any) => {
      this.datosLogin = res.data
      this.router.navigate(['../login']);
    })
  }  
}