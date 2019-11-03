import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { User } from '../../interfaces/user';
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class TestProvService {
  private getAPI: string = 'http://127.0.0.1:5000/getcon';
  private upAPI: string = 'http://127.0.0.1:5000/upcon';

  constructor(public http: HttpClient) {
    console.log('Calling Test Provider');
  }

  getList() {
    return this.http.get<User[]>(this.getAPI).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError));
  }

  updateList(id, name) {

    const user = {
      sid: id,
      data: name
    };
    return this.http.post(this.upAPI, user, httpOptions);
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    // tslint:disable-next-line: deprecation
    return Observable.throw(errorMessage);
  }
}
