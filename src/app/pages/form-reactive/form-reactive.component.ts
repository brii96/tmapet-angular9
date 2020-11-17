import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';

@Component({
  selector: 'app-form-reactive',
  templateUrl: './form-reactive.component.html',
  styleUrls: ['./form-reactive.component.css']
})
export class FormReactiveComponent implements OnInit {

  forma: FormGroup;
  mascotas: string[] = ["Gatos", "Perros"];

  constructor( private fb: FormBuilder,
               private validadores: ValidadoresService) {
    //Se inyecta el servicio FormBuilder para implementar sus metodos y facilitar la creacion de formularios
    //Es conviente que el formulario este configurado en el html antes de que se empiece a construir el mismo
    this.crearFormulario();
    // this.cargarDatosAlForm();
   }

  ngOnInit(): void {
  }

  crearFormulario(){
    this.forma = this.fb.group({
      //Manejamos las propiedades del formulario en forma de arreglos para tomar Valor por defecto, Validaciones Sincronas y Validaciones Asincronas
      name: ['', [Validators.required, Validators.minLength(5), Validators.minLength(15)]],
      mail: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      username: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._-]+'), Validators.minLength(4), Validators.maxLength(15)]],
      password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._-]+'), Validators.minLength(6), Validators.maxLength(16)]],
      password2: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._-]+'), Validators.minLength(6), Validators.maxLength(16)]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+$'), Validators.minLength(8), Validators.maxLength(15)]],
      desc: ['', [Validators.minLength(5), Validators.maxLength(128)]],
      loc: ['', [Validators.minLength(3), Validators.maxLength(40)]],
      exp: ['']
    }, {
      validators: this.validadores.passIguales('password', 'password2')
    });
  }

  // cargarDatosAlForm(){
  //   this.forma.setValue({

  //   });
  // }

  //Optimizar validando todo en un metodo que le pasa por parametro la propiedad de 'crearFormulario()'
  get nombreValido(){
    return this.forma.get('name').invalid && this.forma.get('name').touched;
  }

  get mailValido(){
    return this.forma.get('mail').invalid && this.forma.get('mail').touched;
  }
  get usernameValido(){
    return this.forma.get('username').invalid && this.forma.get('username').touched;
  }

  get passwordValido(){
    return this.forma.get('password').invalid && this.forma.get('password').touched;
  }

  get password2Valido(){
    const pass1 = this.forma.get('password').value;
    const pass2 = this.forma.get('password2').value;
    return ( pass1 === pass2 )? false : true;
  }

  get phoneValido(){
    return this.forma.get('phone').invalid && this.forma.get('phone').touched;
  }

  get descValido(){
    return this.forma.get('desc').invalid && this.forma.get('desc').touched;
  }

  get locValido(){
    return this.forma.get('loc').invalid && this.forma.get('loc').touched;
  }

  get expValido(){
    return this.forma.get('exp').invalid && this.forma.get('exp').touched;
  }

  guardar(){
    console.log(this.forma);
    if( this.forma.invalid ){
      return Object.values(this.forma.controls).forEach(control => {
        // console.log(control);
        // control.markAsTouched();
        control.markAsTouched();
      });
      // return console.log("Ingrese un valor en los campos");
    }
  }

}
