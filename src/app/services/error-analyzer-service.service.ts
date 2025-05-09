import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ErrorDetails } from '../models/error-details.model';
import { ErrorDTO } from '../models/error-dto.model';

@Injectable({
  providedIn: 'root'
})
export class ErrorAnalyzerServiceService {
  

  private baseUrl = 'http://localhost:8080'; // Endpoint for Spring Boot backend

  constructor(private http: HttpClient) { }

  // Save error details to the backend
  saveErrorDetails(errorDetails: ErrorDetails): Observable<any> {
    return this.http.post(`${this.baseUrl}/saveErrorDetails`, errorDetails);
  }

  public getAllErrors(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAllErrors`);
  }


  saveNewError(errorData: ErrorDTO):Observable<any> {
    return this.http.post(`${this.baseUrl}/addNewError`,errorData)
  }
  

  // Get all error details
  public getAllErrorDetails(username:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAllErrorDetails/${username}`);
  }

  // Get error details by ID
  getErrorDetailsById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Delete error details
  deleteErrorDetails(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  searchError(etype: string): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/search`, {
      params: new HttpParams().set('type', etype)
    });
  }

  //Get errorDetails Count
  public getConsoleErrorCount(username:string):Observable<any>{
    return this.http.get(`${this.baseUrl}/getConsoleErrorCount/${username}`);
  }

  public getConsoleErrorByExceptionType(exceptionType:string,username:string):Observable<any>{
    return this.http.get(`${this.baseUrl}/getConsoleErrorByException/${exceptionType}/${username}`)
  }
}
