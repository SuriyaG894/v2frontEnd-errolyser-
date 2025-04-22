import { Component, OnInit } from '@angular/core';
import { ErrorDetails } from '../models/error-details.model';
import { ErrorAnalyzerServiceService } from '../services/error-analyzer-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { Modal } from 'bootstrap';
@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  searchText: string = '';
  errorDetailsList: ErrorDetails[] = [];
  newDetails: ErrorDetails[] = [];
  selectedStackTrace: string = '';
  isModalOpen: boolean = false;
  constructor(private errorDetailsService: ErrorAnalyzerServiceService) {}

  ngOnInit(): void {
    this.loadErrorDetails();
    this.filterErrors();
  }
  
  loadErrorDetails() {
    this.errorDetailsService.getAllErrorDetails().subscribe(data => {
      this.errorDetailsList = data;
      console.log(this.errorDetailsList); // Show all by default
      console.log(this.filterErrors());
    });
  }

  filterErrors():ErrorDetails[] {
    return this.errorDetailsList.filter(error =>
      error.exceptionType?.toLowerCase().includes(this.searchText.toLowerCase()) ||
      error.errorMessage?.toLowerCase().includes(this.searchText.toLowerCase()) ||
      error.errorType?.toLowerCase().includes(this.searchText.toLowerCase()) ||
      error.fileName?.toLowerCase().includes(this.searchText.toLowerCase())
  );
}

openStackTraceModal(error: any) {
  this.selectedStackTrace = error.stackTrace;
  this.isModalOpen = true;
  // Prevent scrolling of body when modal is open
  document.body.style.overflow = 'hidden';
}

// Close modal
closeModal() {
  this.isModalOpen = false;
  // Re-enable scrolling of body
  document.body.style.overflow = 'auto';
}
}