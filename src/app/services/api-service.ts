import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User, UsersInterfaces } from '../models/user-interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly baseUrl = 'https://dummyjson.com/users';


  getUsersMOCK(): Observable<User[]> {
    const campos = 'firstName,lastName,age,username,image';
    return this.http.get<UsersInterfaces>(`${this.baseUrl}?limit=30&select=${campos}`)
      .pipe(map((respuesta: UsersInterfaces) => respuesta.users));
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  getUserByFilter(filtro: string[], limit: number): Observable<User[]> {
    return this.http.get<UsersInterfaces>(`${this.baseUrl}?limit=${limit}&select=${filtro.join(',')}`)
      .pipe(map((respuesta: UsersInterfaces) => respuesta.users));
  }

}
