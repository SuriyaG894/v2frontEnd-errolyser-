import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LogCountServiceService {
  private LogCountSubject = new BehaviorSubject<string>('');
  logCount$ = this.LogCountSubject.asObservable();

  updateLogCount(count: string) {
    this.LogCountSubject.next(count);
  }
}
