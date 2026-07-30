import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  //private apiUrl = 'https://pessoal-proj-java-registro.sjj3wv.easypanel.host/api/usuarios';
  private baseURL = `${environment.apiUrl}`


  constructor(private http: HttpClient) {}

  listar(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseURL}`, { withCredentials: true });
  }

  salvar(usuario: Usuario): Observable<Usuario> {
    if (usuario.id) {
      return this.http.put<Usuario>(`${this.baseURL}/${usuario.id}`, usuario, { withCredentials: true });
    }
    return this.http.post<Usuario>(this.baseURL, usuario, { withCredentials: true });
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/${id}`, { withCredentials: true });
  }
}
