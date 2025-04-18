import { Component, OnInit } from '@angular/core';
import { ErrorServiceService } from '../services/error-service.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ErrorDTO } from '../models/error-dto.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ErrorAnalyzerServiceService } from '../services/error-analyzer-service.service';

@Component({
  selector: 'app-repo',
  imports: [CommonModule,RouterLink,FormsModule,RouterLinkActive],
  templateUrl: './repo.component.html',
  styleUrl: './repo.component.css'
})
export class RepoComponent {

  searchText: string = '';
  errors: ErrorDTO[] = [];
  filteredErrors: ErrorDTO[] = [];

  constructor(private errorService: ErrorServiceService, private router: Router, private http: HttpClient,private errorAnalyzer:ErrorAnalyzerServiceService) {}

  ngOnInit(): void {
    this.loadErrors();
  }

  loadErrors() {
    this.errorAnalyzer.getAllErrors().subscribe(data => {
      this.errors = data;
      // console.log(this.errors);
      this.filterErrors(); // filter after loading
    });
  }
  // this is to search everything if i search 'io' it will search and find everything in the object so im going with other method
  // filterErrors() {
  //   const search = this.searchText.toLowerCase();

  //   this.filteredErrors = this.errors.filter(error =>
  //     error.title?.toLowerCase().includes(search) ||
  //     error.category?.toLowerCase().includes(search) ||
  //     error.howToFix?.toLowerCase().includes(search) ||
  //     error.afterExample?.toLowerCase().includes(search) ||
  //     error.beforeExample?.toLowerCase().includes(search) ||
  //     error.stacktrace?.toLowerCase().includes(search) ||
  //     error.notes?.toLowerCase().includes(search) ||
  //     error.id?.toString().includes(search)
  //   );
  // }

  filterErrors() {
    const search = this.searchText.toLowerCase();

    this.filteredErrors = this.errors.filter(error =>
      error.title?.toLowerCase().includes(search) ||
      error.category?.toLowerCase().includes(search)
    );
  }

}
