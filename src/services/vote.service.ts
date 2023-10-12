import { Injectable, OnDestroy } from '@angular/core';
import { CONS_TEXT, PROS_TEXT } from '../models/mock.constants';
import { Item } from '../models/item.model';
import { ItemType } from '../models/item-type.enum';
import { v4 as uuid } from 'uuid';
import { LogService } from './log.service';
import { Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VoteService implements OnDestroy  {
  pros: Item[] = [];
  cons: Item[] = [];
  isVoteFinished = false;
  private subscriptions: Subscription = new Subscription();

  constructor(private logService: LogService) {
    // init 5 pros & cons using mock
    PROS_TEXT
      .splice(0, 5)
      .map(text => this.createItem(text, ItemType.Pros));

    CONS_TEXT
      .splice(0, 5)
      .map(text => this.createItem(text, ItemType.Cons));

    this.subscriptions.add(
      this.logService.voteFinished.subscribe(() => {
        this.isVoteFinished = true;
        console.log('Vote finished!');
      })
    );
  }

  like(id: string, type: ItemType) {
    const items = this[type];
    const index= items.findIndex(item => item.id === id);
    if (index !== -1) {
      items[index].likes++;
      this.logService.logLike(items[index].text);
    }
  }

  dislike(id: string, type: ItemType) {
    const items = this[type];
    const index= items.findIndex(item => item.id === id);
    if (index !== -1) {
      items[index].dislikes++;
      this.logService.logDislike(items[index].text);
    }
  }

  createItem(text: string, type: ItemType) {
    const id = uuid();
    this[type].unshift({ id, text, likes: 0, dislikes: 0 });
    this.logService.logCreateItem(text, type);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
