import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1';
  private apiKey = 'AIzaSyDl4eXuYyheuuemntHWv0WfSAM2v9jMWJg';
  userToken: String;
  //Crear nuevo usuario
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  //Login
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  //injeccion del servicio http
  constructor(private http:HttpClient) {
    this.leerToken();
  }

  logout(){

    localStorage.removeItem('token');

  }


  login(usuario: UsuarioModel){
    const authData = {
      //Creacion de un objeto para autenticar; otra manera de tomar los datos del 'modelo' usuario: -...usuario-
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}/accounts:signInWithPassword?key=${this.apiKey}`,
      authData
    ).pipe(
      map( resp => {
        // console.log('Entro en el mapa del Rxjs');
        this.guardarToken( resp['idToken'] );
        return resp;
      })
    );
  }

  nuevoUsuario (usuario:UsuarioModel){
    const authData = {
      //Creacion de un objeto para autenticar; otra manera de tomar los datos del 'modelo' usuario: -...usuario-
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}/accounts:signUp?key=${this.apiKey}`,
      authData
    ).pipe(
      map( resp => {
        // console.log('Entro en el mapa del Rxjs');
        this.guardarToken( resp['idToken'] );
        return resp;
      })
    );

  }

  //Metodos para almacenar el toke_id

  private guardarToken( idToken:string ){
    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    let hoy = new Date();
    hoy.setSeconds( 3600 );

    localStorage.setItem( 'expira', hoy.getTime().toString() ); //Obtengo la fecha y hora en la que expira el token
  }

  private leerToken(){
    if ( localStorage.getItem('token') ){
      this.userToken = localStorage.getItem('token');
    }else {
      this.userToken = '';
    }

    // return this.userToken;
  }

  estaAutenticado(): boolean{

    if ( this.userToken.length < 2 ){
      return false;
    }

    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();

    expiraDate.setTime(expira);

    if ( expiraDate > new Date() ){
      return true;
    }else{
      return false;
    }
    // return this.userToken.length > 2; //validacion basica --> si es mayor a dos caracteres
  }

}
