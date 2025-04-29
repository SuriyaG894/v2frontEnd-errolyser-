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
  username:string=''
  ngOnInit(): void {
    this.loadErrorDetails();
    this.username = localStorage.getItem('token') || ''
  }

  errorDetailsList:ErrorDetails[]=[]
  constructor(private errorDetailsService:ErrorAnalyzerServiceService){}
  loadErrorDetails(){
    this.errorDetailsService.getAllErrorDetails(this.username).subscribe(data=>{
      this.errorDetailsList = data;
    });
  }





}
