import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

/**
 * Sets parameters and opens up a modal dialog.
 */
@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openDialog(dialogComponent: any, disableCloseFeature: boolean, boxWidth: string, boxHeight: string, msg: any) {
    return this.dialog.open(dialogComponent, {
      width: boxWidth,
      height: boxHeight,
      panelClass: 'dialog-container',
      disableClose: disableCloseFeature,
      position: { top: '10px' },
      data: {
        message: msg,
      },
    });
  }
}
