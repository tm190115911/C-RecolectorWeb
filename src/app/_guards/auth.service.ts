import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private Registrado: boolean
  
  constructor() {
    this.Registrado = false;
  }
  onGetUsuario(): any {
    let lsUsuario = JSON.parse(sessionStorage.getItem('tbUsuario')|| '{}');
    return lsUsuario;
  }

  onSetCerrarSession(): boolean {
    try {
      sessionStorage.removeItem('tbUsuario');
      this.Registrado = false;
      return true;
    } catch (error) {
      console.log('onSerCerrarSession', error);
      return false;
    }
  }

  onSetUsuario(Usuario: any): boolean {
    try {
      this.Registrado = true;
      sessionStorage.setItem('tbUsuario', JSON.stringify(Usuario));
      return true;
    } catch (error) {
      console.log('onSerCerrarSession', error);
      return false;
    }
  }

  onGetStatusUsuario(): boolean {
    return this.Registrado;
  }

}