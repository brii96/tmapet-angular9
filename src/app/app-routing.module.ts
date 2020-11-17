import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// App routing - Rutas de la aplicacion
import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { FormReactiveComponent } from './pages/form-reactive/form-reactive.component';
import { TemplateComponent } from './pages/template/template.component';

const routes: Routes = [
  { path: 'home'    , component: HomeComponent, canActivate: [ AuthGuard ] }, //Se manda la definicion de la clase... toda la clase... Angular se encarga de buscar el guard
  { path: 'registro', component: RegistroComponent },
  { path: 'login'   , component: LoginComponent },
  { path: 'form-reactive', component: FormReactiveComponent},
  { path: 'template', component: TemplateComponent},
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

//Modulo que se importa en los "imports" de la aplicacion
export class AppRoutingModule { }
