import { Component } from '@angular/core';
import { ErrorDetails } from '../models/error-details.model';
import { ErrorAnalyzerServiceService } from '../services/error-analyzer-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history',
  imports: [CommonModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {
  ngOnInit(): void {
    this.loadErrorDetails();
  }

  errorDetailsList:ErrorDetails[]=[]
  constructor(private errorDetailsService:ErrorAnalyzerServiceService){}
  loadErrorDetails(){
    this.errorDetailsService.getAllErrorDetails().subscribe(data=>{
      this.errorDetailsList = data;
    });
  }

}
