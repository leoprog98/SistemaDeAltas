import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})

export class LoginService {
  tipoUsuario: number | undefined; 
  autenticado = false;

  callBackUrl!: string;

  constructor(private http: HttpClient) {}

  login(usuario: any): Observable<any> {
    return this.http.post(environment.ApiUrl + 'login', usuario);
  }
}