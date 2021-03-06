
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppError } from '../common/app-error';
import { BadRequestError } from '../common/bad-request-error';
import { NotFoundError } from '../common/not-found-error';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(@Inject('urlink') private url: string, private http: HttpClient) { }

  getAll(){
    return this.http.get(this.url)
    .pipe(
        catchError(this.handleError)
    );
  }

  add(resource: any){
    return this.http.post(this.url, JSON.stringify(resource))
    .pipe(
      catchError(this.handleError)
    );
  }

  patch(resource: any){
    return this.http.patch(this.url + '/' + resource.id, JSON.stringify({isRead: true}))
    .pipe(
      catchError(this.handleError)
    );
  }

  del(id: any){
    return this.http.delete(this.url + '/' + id)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: Response){
    if (error.status === 400) {
    return throwError(new BadRequestError(error.json()));
    }

    if (error.status === 404) {
    return throwError(new NotFoundError());
    }

    return throwError(new AppError(error));
  }
}
