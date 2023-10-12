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

  //random
  randomCreateProsSec: number[] = [];
  randomCreateConsSec: number[] = [];

  constructor(private logService: LogService) {
    // init 5 pros & cons using mock
    for (let i = 0; i < 5; i++) {
      this.createMockProsItem();
      this.createMockConsItem();
    }

    this.generateRandomCreateItemSec();
    // START EMULATION
    this.emitRandomCreateItemEvents();

    this.subscriptions.add(
      this.logService.voteFinished.subscribe(() => {
        this.isVoteFinished = true;
        console.log('Vote finished!');
      })
    );
  }

  createMockProsItem() {
    PROS_TEXT
      .splice(0, 1)
      .map(text => this.createItem(text, ItemType.Pros));
  }

  createMockConsItem() {
    CONS_TEXT
      .splice(0, 1)
      .map(text => this.createItem(text, ItemType.Cons));
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

  getRandomFrom1To300() {
    // 5min = 300s, generate random second
    return +(Math.random() * (300 - 1) + 1).toFixed();
  }

  generateRandomCreateItemSec() {
    // 5 items (pros/cons) I render by default, for other 15 I generate creation time (by asc)
    for (let i = 0; i < 15; i++) {
      this.randomCreateProsSec.push(this.getRandomFrom1To300());
      this.randomCreateConsSec.push(this.getRandomFrom1To300());
      this.randomCreateProsSec.sort();
      this.randomCreateConsSec.sort();
    }
  }

  emitRandomCreateItemEvents() {
    // check every second: compare randomCreateProsTimeSec with time
    const interval = setInterval(() => {
      if (this.isVoteFinished) {
        clearInterval(interval);
      }

      const timeSec = +(this.logService.getTime() / 1000).toFixed();

      this.randomCreateProsSec.forEach(s => {
        if (s === timeSec) {
          this.createMockProsItem();
        }
      });

      this.randomCreateConsSec.forEach(s => {
        if (s === timeSec) {
          this.createMockConsItem();
        }
      });

      console.log(timeSec)
    }, 1000);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
