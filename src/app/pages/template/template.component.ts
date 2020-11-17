import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  user = {
    name: '',
    mail: '',
    username: '',
    phone: '',
    password: '',
    desc: '',
    loc: '',
    exp: ''
  }

  animales: string[] = ["Gatos", "Perros"];


  constructor() { }

  ngOnInit(): void {
  }

  guardar( forma: NgForm ){ //Esta es una forma de testing para saber el estado de los datos almacenados

    if( forma.invalid ){
      Object.values(forma.controls).forEach(control => {
        // console.log(control);
        // control.markAsTouched();
        control.markAsTouched();
      });
      return console.log("Ingrese un valor en los campos");
    }
    console.log(forma);
    console.log(forma.value);
  }

}
