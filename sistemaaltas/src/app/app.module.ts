import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr'
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { LoginService } from './components/login/login.service';
import { AuthenticationGuard } from './components/login/authentication.guard';
import { CustomToastComponent } from './components/custom-toast/custom-toast.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsuariosComponent,
    CustomToastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [LoginService, AuthenticationGuard],
  entryComponents: [CustomToastComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
