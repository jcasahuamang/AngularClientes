import  swal  from 'sweetalert2';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Cliente} from './cliente';
import { CLIENTES } from './clientes.json';
import { Observable, throwError } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';


@Injectable()
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:7070/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  constructor(private http: HttpClient,private router: Router) { }

  getClientes(): Observable<Cliente[]>{
    //return of(CLIENTES);
    return this.http.get<Cliente[]>(this.urlEndPoint);
    /*return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Cliente[])
    );*/

  }

  create(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(this.urlEndPoint,cliente,{headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje,e.error.error,'error');
        return throwError(e);
      })
    );
  }

  getCliente(id): Observable<Cliente>{
        return this.http.get<Cliente>(this.urlEndPoint+'/'+id).pipe(
          catchError(e => {
            this.router.navigate(['/clientes']);
            console.error(e.error.mensaje);
            swal.fire('Error al editar',e.error.mensaje,'error');
            return throwError(e);
          })
        );

  }

  update(cliente: Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(this.urlEndPoint+'/'+cliente.id,cliente,{headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje,e.error.error,'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(this.urlEndPoint+'/'+id,{headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje,e.error.error,'error');
        return throwError(e);
      })
    );
  }
}
