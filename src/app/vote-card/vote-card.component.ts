import { Component, Input } from '@angular/core';
import { Item } from '../../models/item.model';
import { VoteService } from '../../services/vote.service';
import { ItemType } from '../../models/item-type.enum';

@Component({
  selector: 'c-vote-card',
  templateUrl: './vote-card.component.html',
  styleUrls: ['./vote-card.component.scss']
})
export class VoteCardComponent {
  @Input() item!: Item;
  @Input() type!: ItemType;
  @Input() isNew? = false;
  @Input() isMostLiked? = false;
  @Input() isMostDisliked? = false;

  constructor(private voteService: VoteService) {}

  get isVoteFinished() {
    return this.voteService.isVoteFinished;
  }

  isActionsDisabled(item: Item) {
    return item.isUserLiked || item.isUserDisliked || this.isVoteFinished;
  }

  onLikeClick(id: string) {
    this.voteService.like(id, this.type, 1, true);
  }

  onDislikeClick(id: string) {
    this.voteService.dislike(id, this.type, 1, true);
  }
}
