import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersUrl = 'https://reqres.in/api/users';
  private userDetailsCache: { [userId: number]: any } = {};

  constructor(private http: HttpClient) {}

  getUsers(page: number): Observable<any> {
    const url = `${this.usersUrl}?page=${page}`;
    return this.http.get<any>(url).pipe(
      tap((_) => console.log('fetched users')),
      catchError(this.handleError<any>('getUsers', []))
    );
  }

  getUserDetails(id: number): Observable<any> {
    if (this.userDetailsCache[id]) {
      return of(this.userDetailsCache[id]);
    } else {
      const url = `${this.usersUrl}/${id}`;
      return this.http.get<any>(url).pipe(
        tap((user) => {
          console.log(`fetched user details for id=${id}`);
          this.userDetailsCache[id] = user;
        }),
        catchError(this.handleError<any>(`getUserDetails id=${id}`))
      );
    }
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
