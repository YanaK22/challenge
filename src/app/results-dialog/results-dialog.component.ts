import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemType } from '../../models/item-type.enum';

@Component({
  selector: 'app-results-dialog',
  templateUrl: './results-dialog.component.html',
  styleUrls: ['./results-dialog.component.scss']
})
export class ResultsDialogComponent {
  ItemType = ItemType;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { winner: ItemType }) {}
}
