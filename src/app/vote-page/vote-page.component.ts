import { Component } from '@angular/core';
import { ItemType } from '../../models/item-type.enum';
import { MatDialog } from '@angular/material/dialog';
import { AddItemDialogComponent } from '../add-item-dialog/add-item-dialog.component';
import { NotificationDialogComponent } from '../notification-dialog/notification-dialog.component';

@Component({
  selector: 'c-vote-page',
  templateUrl: './vote-page.component.html',
  styleUrls: ['./vote-page.component.scss'],
})
export class VotePageComponent {
  ItemType = ItemType

  constructor(public dialog: MatDialog) {}

  openAddItemDialog(type: ItemType) {
    const dialog = this.dialog.open(AddItemDialogComponent, {
      data: { type }
    });

    dialog.afterClosed().subscribe((result) => {
      if (result === 'success') {
        this.openNotificationDialog(type);
      }
    })
  }

  openNotificationDialog(type: ItemType) {
    this.dialog.open(NotificationDialogComponent, {
      data: { type }
    });
  }
}
