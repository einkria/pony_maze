import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

/**
 * Displays either winner or loser image to user. Image name is given in data.message.
 */
@Component({
  selector: 'app-winning-dialog',
  templateUrl: './winning-dialog.component.html',
  styleUrls: ['./winning-dialog.component.css'],
})
export class WinningDialogComponent implements OnInit {
  imagePath: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<WinningDialogComponent>) {}

  ngOnInit() {
    this.imagePath = 'assets/images/' + this.data.message;
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
