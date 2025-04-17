import { Component, OnInit } from '@angular/core';
import { ErrorAnalyzerServiceService } from '../services/error-analyzer-service.service';
import { ErrorDetails } from '../models/error-details.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-details',
  imports: [CommonModule],
  templateUrl: './error-details.component.html',
  styleUrl: './error-details.component.css'
})
export class ErrorDetailsComponent implements OnInit {
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
