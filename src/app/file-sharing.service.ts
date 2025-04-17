import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FileSharingService {
  private fileNameSubject = new BehaviorSubject<string>('');
  fileName$ = this.fileNameSubject.asObservable();

  updateFileName(name: string) {
    this.fileNameSubject.next(name);
  }
}