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
  randomVoteSec: number[] = [];

  constructor(private logService: LogService) {
    // init 5 pros & cons using mock
    for (let i = 0; i < 5; i++) {
      this.createMockProsItem();
      this.createMockConsItem();
    }

    this.generateRandomCreateItemSec();
    this.generateRandomVoteSec();
    // START EMULATION
    this.emitRandomCreateItemEvents();
    // this.emitRandomVoteEvents();

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

  like(id: string, type: ItemType, count = 1) {
    const items = this[type];
    const index= items.findIndex(item => item.id === id);
    if (index !== -1) {
      items[index].likes += count;
      this.logService.logLike(items[index].text, count);
    }
  }

  dislike(id: string, type: ItemType, count = 1) {
    const items = this[type];
    const index= items.findIndex(item => item.id === id);
    if (index !== -1) {
      items[index].dislikes += count;
      this.logService.logDislike(items[index].text, count);
    }
  }

  createItem(text: string, type: ItemType) {
    const id = uuid();
    this[type].unshift({ id, text, likes: 0, dislikes: 0 });
    this.logService.logCreateItem(text, type);
  }

  getRandomNumber(min: number, max: number) {
    // 5min = 300s, generate random second
    return +(Math.random() * (max - min) + min).toFixed();
  }

  generateRandomCreateItemSec() {
    // 5 items (pros/cons) I render by default, for other 15 I generate creation time (by asc)
    for (let i = 0; i < 15; i++) {
      this.randomCreateProsSec.push(this.getRandomNumber(1, 300));
      this.randomCreateConsSec.push(this.getRandomNumber(1, 300));
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

      console.log(timeSec);
    }, 1000);
  }

  generateRandomVoteSec() {
    // ATTENTION:  Sorry for this simplification, if I had more I time, I would do this better * crying *
    for (let i = 0; i < 100; i++) {
      this.randomVoteSec.push(this.getRandomNumber(1, 300));
    }
  }

  emitRandomVoteEvents() {
    // ATTENTION:  Sorry for this simplification, if I had more I time, I would do this better * crying *
    const interval = setInterval(() => {
      if (this.isVoteFinished) {
        clearInterval(interval);
      }

      const timeSec = +(this.logService.getTime() / 1000).toFixed();

      this.randomVoteSec.forEach(s => {
        if (s === timeSec) {
           const type = this.getRandomNumber(1, 10) < 6 ? ItemType.Pros : ItemType.Cons;
           const itemIndex = this.getRandomNumber(0, this[type].length - 1);
           const item = this[type][itemIndex];
           const count = this.getRandomNumber(1, 100);
           const isLike = this.getRandomNumber(1, 10) < 6;
           if (isLike) {
             this.like(item.id, type, count);
           } else {
             this.dislike(item.id, type, count);
           }
        }
      });

    }, 1000);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
