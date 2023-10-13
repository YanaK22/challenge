import { Component } from '@angular/core';
import { ItemType } from '../../models/item-type.enum';
import { MatDialog } from '@angular/material/dialog';
import { AddItemDialogComponent } from '../add-item-dialog/add-item-dialog.component';
import { NotificationDialogComponent } from '../notification-dialog/notification-dialog.component';
import { VoteService } from '../../services/vote.service';
import { Item } from '../../models/item.model';
import { LogService } from '../../services/log.service';

@Component({
  selector: 'c-vote-page',
  templateUrl: './vote-page.component.html',
  styleUrls: ['./vote-page.component.scss'],
})
export class VotePageComponent {
  ItemType = ItemType

  constructor(
    public dialog: MatDialog,
    private voteService: VoteService,
    private logService: LogService,
  ) {
  }

  get pros() {
    return this.voteService.pros;
  }

  get cons() {
    return this.voteService.cons;
  }

  get logs() {
    return this.logService.logs;
  }

  get isVoteFinished() {
    return this.voteService.isVoteFinished;
  }

  getTop3(type: ItemType) {
    const items = [...(type === ItemType.Pros ? this.pros : this.cons)];
    const top3Items = [];

    for (let i = 0; i < 3; i++) {
      const maxValue = Math.max(...items.map(o => o.likes));
      const index = items.findIndex(item => item.likes === maxValue);
      top3Items.push(...items.splice(index, 1));
    }

    return top3Items;
  }

  get diagramData() {
    const prosLikes = this.voteService.prosLikes;
    const consLikes = this.voteService.consLikes;
    const prosLikesPct = (prosLikes >= consLikes) ? '100' : (prosLikes * 100 / consLikes).toFixed();
    const consLikesPct = (consLikes >= prosLikes) ? '100' : (consLikes * 100 / prosLikes).toFixed();

    return { prosLikes, consLikes, prosLikesPct, consLikesPct };
  }

  isItemMostLiked(items: Item[], item: Item) {
    const maxValue = Math.max(...items.map(o => o.likes));
    return !!maxValue && maxValue === item.likes;
  }

  isItemMostDisliked(items: Item[], item: Item) {
    const maxValue = Math.max(...items.map(o => o.dislikes));
    return !!maxValue && maxValue === item.dislikes;
  }

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
