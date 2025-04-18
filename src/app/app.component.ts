import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterModule,FormsModule,CommonModule,HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'layout';
  showContent = false;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Only run this code in the browser
      setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        if (splash) {
          splash.style.display = 'none';
        }
        this.showContent = true;
      }, 5000);
    } else {
      // If SSR, just show content directly
      this.showContent = true;
    }
  }
  
}
