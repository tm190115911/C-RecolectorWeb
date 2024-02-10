import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_guards/auth.service';
import { ServiciosService } from '../../WebServices/servicios.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{
  Form!: FormGroup;
  sLogin: any;
  constructor(private loginService: ServiciosService, private aService: AuthService, 
    private fb: FormBuilder, private router: Router, private toastr: ToastrService)
  {}
  ngOnInit(): void {
    this.Form = this.fb.group({
      id_usuario: [""],
      Correo: ["", [Validators.required]],
      Clave: ["", [Validators.required]]
    });
  }
  ngOnLogin() {
    this.loginService.onPostLogin(this.Form.value).subscribe((respuesta: any) => {
      if (respuesta.status) {
        this.sLogin = respuesta.data;
        console.log(this.sLogin);
        this.toastr.success('Bienvenido', 'Éxito' , { timeOut: 1500 });
        this.router.navigate(['../home']);
      } else {
        alert("Datos incorrectos");
      }
    }, (error) => {
      console.error(error);
      if (error.status === 0) {
        // Error de desconexión o falta de conexión
        this.toastr.error('No hay conexión con el servidor', 'Error');
      } else if (error.status === 500) {
        // Error interno del servidor (Error 500)
        this.toastr.error('Error en el servidor', 'Error');
      } else {
        // Otro tipo de error
        alert('Error desconocido');
      }
    });
  }
}