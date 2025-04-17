import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorServiceService } from '../services/error-service.service';
import { ErrorDTO } from '../models/error-dto.model';
import { ErrorAnalyzerServiceService } from '../services/error-analyzer-service.service';

@Component({
  selector: 'app-detailed-blog',
  imports: [],
  templateUrl: './detailed-blog.component.html',
  styleUrl: './detailed-blog.component.css'
})
export class DetailedBlogComponent {
  id: string = ''
  errorData: ErrorDTO = {
    title: '',
    category: '',
    howToFix: '',
    beforeExample: '',
    afterExample: '',
    notes: '',
    stacktrace:''
  };
  constructor(private activatedRouter: ActivatedRoute,private errorService:ErrorServiceService,private router:Router,private errorDetailsService:ErrorAnalyzerServiceService) {
    this.id = this.activatedRouter?.snapshot?.queryParamMap?.get("Id") || '';
  }

  ngOnInit(): void {
    this.id = this.activatedRouter.snapshot.queryParamMap.get("Id") || '';
    
    this.getErrorById();
  }
  getErrorById() {
    this.errorService.getErrorById(this.id).subscribe(data=>{
       this.errorData = data;
    })
  }
  goBack(): void {
    this.router.navigate(['/errorList']);
  }

 
  }



