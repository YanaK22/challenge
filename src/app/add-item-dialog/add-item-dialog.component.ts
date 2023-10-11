import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ItemType } from '../../models/item-type.enum';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-item-dialog',
  templateUrl: './add-item-dialog.component.html',
  styleUrls: ['./add-item-dialog.component.scss']
})
export class AddItemDialogComponent {
  ItemType = ItemType;

  control = new FormControl('', Validators.required);

  constructor(
    public dialogRef: MatDialogRef<AddItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { type: ItemType }
  ) {}

  onSubmit() {
    // create item
    this.dialogRef.close('success');
  }
}
