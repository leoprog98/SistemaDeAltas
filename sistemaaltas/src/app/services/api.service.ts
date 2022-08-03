import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  get(controlador: string){
    return this.http.get(environment.ApiUrl + controlador);
  }

  post(controlador: string, usuario: any){
    return this.http.post(environment.ApiUrl + controlador, usuario);
  }

  put(controlador: string, usuario: any){
    return this.http.put(environment.ApiUrl + controlador, usuario);
  }

  delete(controlador: any, idUsuario: number){
    return this.http.delete(environment.ApiUrl + controlador + '/' + idUsuario);
  }
}
