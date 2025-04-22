import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list'
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-header',
  imports: [RouterOutlet,MatToolbarModule,MatIconModule,MatButtonModule,MatSidenavModule,MatListModule,RouterModule,FormsModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isCollapsed:boolean=false;
  constructor(private router:Router,private authService:AuthService){}
  menuItems = [
    {"icon":"home","label":"Home","route":"home"},
    {"icon":"code_blocks","label":"Console","route":"console"},
    {"icon":"description","label":"Log","route":"log"},
    {"icon":"menu_book","label":"Repo","route":"repo"},
    {"icon":"history","label":"History","route":"history"}
    
  ]
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
