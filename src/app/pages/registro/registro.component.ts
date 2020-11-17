import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';
import {NgForm} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  //constructor e inicializacion----- (Se pudo inicializar el objeto en esta parte, pero vamos a inicializarlo en gnOnInit)
  usuario: UsuarioModel;
  recordarme: false;
  // this.usuario = new UsuarioModel();//Aca tambien se puede instanciar el objeto
  constructor(private auth: AuthService,
              private router: Router) { }
  //Inicializo el objeto en gnOnInit para seguir un patron logico.
  ngOnInit() {
    this.usuario = new UsuarioModel();
    // this.usuario.email = 'brianleonelh@gmail.com';
    // this.usuario.nombre = 'elBrii';
    // this.usuario.password = 'elGuachin123';
  }

  onSubmit( form: NgForm ){

    if ( form.invalid ) { return console.log('Formulario no valido'); }
    // console.log("Formulario Enviado");
    // console.log(this.usuario);
    // console.log(form);

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor....'
    });
    Swal.showLoading();

    this.auth.nuevoUsuario(this.usuario)
      .subscribe (resp => {
        console.log(resp);
        Swal.fire(
          'Registrado!!',
          'Cuenta registrada correctamente'
        )
        // Swal.close();

        if ( this.recordarme ){
          localStorage.setItem('email', this.usuario.email);
        }

        this.router.navigateByUrl('/home');
      }, (err) => { //Manejo de errores: Caso en el que se intenta crear una cuenta ya existente
        console.log(err.error.error.message);//Se muestra por pantalla: 'EMAIL_EXISTS' (manejo de error)
        Swal.fire({
          icon: 'error',
          title: 'Error al autenticar',
          text: err.error.error.message
        });
      });

  }

}
