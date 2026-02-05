import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confimation-popup',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confimation-popup.html',
  styleUrl: './confimation-popup.scss',
  standalone: true,
})
export class ConfimationPopup {
  constructor(
    public dialogRef: MatDialogRef<ConfimationPopup>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string },
  ) {}
}
