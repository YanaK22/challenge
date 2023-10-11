import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemType } from '../../models/item-type.enum';

@Component({
  selector: 'app-notification-dialog',
  templateUrl: './notification-dialog.component.html',
  styleUrls: ['./notification-dialog.component.scss']
})
export class NotificationDialogComponent {
  ItemType = ItemType;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { type: ItemType }) {}
}
