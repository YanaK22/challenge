import { Component, Input } from '@angular/core';
import { Item } from '../../models/item.model';

@Component({
  selector: 'c-vote-card',
  templateUrl: './vote-card.component.html',
  styleUrls: ['./vote-card.component.scss']
})
export class VoteCardComponent {
  @Input() item!: Item;
  @Input() isNew? = false;
  @Input() isMostLiked? = false;
  @Input() isMostDisliked? = false;

  constructor() {}
}
