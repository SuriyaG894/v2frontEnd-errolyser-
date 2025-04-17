import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-dialog',
  standalone: true, // ✅ make sure this is here
  imports: [MatDialogModule, MatButtonModule, CommonModule], // ✅ standalone-compatible
  templateUrl: './custom-dialog.component.html',
  styleUrls: ['./custom-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log("CustomDialog");
    console.log(data.rows);
  }
  
}
