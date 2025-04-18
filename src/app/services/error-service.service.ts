import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ErrorDTO } from '../models/error-dto.model';

@Injectable({
  providedIn: 'root'
})
export class ErrorServiceService {

  
  private baseUrl = "http://localhost:8080"
  constructor(private http:HttpClient) { }

  public addErrors(error: Error): Observable<any> {
    return this.http.post(`${this.baseUrl}/addErrors`, error);
  }

  // Tell to santhan
  
  
  public getAllErrors(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAllErrors`);
  }

  public getErrorById(id:string):Observable<any>{
    return this.http.get(`${this.baseUrl}/getById/${id}`)
  }
  


}
