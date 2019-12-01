import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css'],
})
export class ErrorDialogComponent implements OnInit {
  message: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<ErrorDialogComponent>) {}

  ngOnInit() {
    this.message = this.data.message;
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
