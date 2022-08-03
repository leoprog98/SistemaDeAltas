import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, RequiredValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mensaje = '';
  form: FormGroup;

  constructor(private loginService: LoginService, private fb: FormBuilder, private router : Router) {
    this.form = fb.group({
      cUsuario: [''],
      contrasena: ['']
    })
   }

  ngOnInit(): void {
  }

  login(){
    this.mensaje = '';
    this.loginService.login({cUsuario: this.form.get('cUsuario')?.value, contrasena: this.form.get('contrasena')?.value}).subscribe(data => {
      this.loginService.autenticado=data.exito;
      if(!this.loginService.autenticado){
        this.mensaje = data.mensaje;
      }else{
        this.loginService.tipoUsuario = data.usuario.tipoUsuario;
      }
    },
      error => {
        this.mensaje = 'Error al conectarse con el servidor';
      }, () => {
        if(this.loginService.autenticado){
          this.router.navigateByUrl('usuarios');
        }
      });
  }
}
