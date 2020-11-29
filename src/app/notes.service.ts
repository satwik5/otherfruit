import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from './note';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

const baseUrl = '/api/userinformation';
@Injectable()
export class NotesService {

  constructor(private _http: HttpClient) {

  }
  getNotes(): Observable<Array<Note>>{
    return this._http.get<Array<Note>>(`${baseUrl}/getnotes/`,{withCredentials:true})
    .pipe( 
      map(
        (res)=> {
          return res;
        }),
        catchError(this.handleError)
     );
  }
  addNote(note: Note): Observable<Array<Note>>{
    return this._http.post<Array<Note>>(`${baseUrl}/savenotes/`,{note:note},{withCredentials:true})
    .pipe( 
      map(
        (res)=> {
          return res;
        }),
       catchError(this.handleError)
     );
  }
  editNote(note:Note): Observable<Array<Note>>{
    return this._http.post<Array<Note>>(`${baseUrl}/editnotes/`,{withCredentials:true})
    .pipe( 
      map(
        (res)=> {
          return res;
        }),
        catchError(this.handleError)
     );
  }
  deleteNote(id:number): Observable<Array<Note>>{
    return this._http.get<Array<Note>>(`${baseUrl}/deletenotes/${id}`,{withCredentials:true})
    .pipe( 
      map(
        (res)=> {
          return res;
        }),
        catchError(this.handleError)
     );
  }


  private handleError(error: HttpErrorResponse){
    //console.log(error)
    return throwError(error);
  }
}
