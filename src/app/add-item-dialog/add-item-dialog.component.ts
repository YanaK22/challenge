import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ItemType } from '../../models/item-type.enum';
import { FormControl, Validators } from '@angular/forms';
import { VoteService } from '../../services/vote.service';

@Component({
  selector: 'app-add-item-dialog',
  templateUrl: './add-item-dialog.component.html',
  styleUrls: ['./add-item-dialog.component.scss']
})
export class AddItemDialogComponent {
  ItemType = ItemType;

  control = new FormControl('', Validators.required);

  constructor(
    private voteService: VoteService,
    public dialogRef: MatDialogRef<AddItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { type: ItemType }
  ) {}

  onSubmit() {
    if (this.control.value) {
      this.voteService.createItem(this.control.value, this.data.type);
      this.dialogRef.close('success');
    } else {
      console.log('Something went wrong...');
      this.dialogRef.close('error');
    }
  }
}
