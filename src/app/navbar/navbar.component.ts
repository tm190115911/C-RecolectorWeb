import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router) { }

  isMenuOpen = false;

  // ocultar y mostrar los li > a al presionar el boton de hamburgesa
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Función para determinar si un enlace está activo
  isActive(route: string): boolean {
    return this.router.isActive(route, true);
  }
}
