import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate { //'CanActivate' es la instruccion que Angular ejecuta para confirmar si se puede ejecutar dicha ruta o no
  // canActivate(
  //   next: ActivatedRouteSnapshot, //'Next' contiene la siguiente ruta a la cual el usuario puede navegar
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {//'State' es el estado actual de la ruta
  //   return true;
  // }

  constructor ( private auth: AuthService ) {}

  canActivate(): boolean {
    console.log('Guard activo');
    return this.auth.estaAutenticado();
  }

}
