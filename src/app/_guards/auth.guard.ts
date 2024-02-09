import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard {

  constructor(
    private router: Router,
    private aServicio: AuthService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.aServicio.onGetStatusUsuario()) {
      return true;
    } else {
    this.router.navigate(['/principal-login']);
    return false;
    }
  }
}