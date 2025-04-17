import { Component, OnInit } from '@angular/core';
import { ErrorServiceService } from '../services/error-service.service';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ErrorDTO } from '../models/error-dto.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-list',
  imports: [CommonModule,RouterLink,CommonModule],
  templateUrl: './error-list.component.html',
  styleUrl: './error-list.component.css'
})
export class ErrorListComponent implements OnInit {

  constructor(private errorService:ErrorServiceService,private router:Router,private http:HttpClient){}
  ngOnInit(): void {
    this.loadErrors();
  }


  errors:ErrorDTO[]=[];


  loadErrors(){
    this.errorService.getAllErrors().subscribe(data=>{
      this.errors = data;
    })
  }



}
