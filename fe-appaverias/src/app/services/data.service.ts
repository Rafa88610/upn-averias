import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDataResponse } from '../model/IDataResponse';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  options = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  urlLogin = 'http://localhost:4000/api/auth';
  urlListarAverias = 'http://localhost:4000/api/averias/';
  urlProductos = 'http://localhost:4000/api/productos';
  urlBuscarCliente = 'http://localhost:4000/api/clientes/';
  urlRegistrarAveria = 'http://localhost:4000/api/averias';
  urlUsuarios ='http://localhost:4000/api/usuarios';

  constructor(private http: HttpClient) { }

  login(user: any) {
    return this.http.post<IDataResponse>(this.urlLogin, user, this.options);
  }
  listarAverias(idAsesor: number) {
    return this.http.get<IDataResponse>(this.urlListarAverias+idAsesor, this.options);
  }

  listarProductos() {
    return this.http.get<IDataResponse>(this.urlProductos, this.options);
  }

  buscarCliente(numDoc: string) {
    return this.http.get<IDataResponse>(this.urlBuscarCliente + numDoc, this.options);
  }

  registrarAveria(averia: any) {
    return this.http.post<IDataResponse>(this.urlRegistrarAveria, averia, this.options);
  }

  listarUsuarios(){
    return this.http.get<IDataResponse>(this.urlUsuarios,this.options);
  }

  registrarUsuario(user:any){
    return this.http.post<IDataResponse>(this.urlUsuarios,user,this.options);
  }


}
