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

  isVoteProsAdv;

  constructor(private logService: LogService) {
    // init 5 pros & cons using mock
    for (let i = 0; i < 5; i++) {
      this.createMockProsItem();
      this.createMockConsItem();
    }

    this.generateRandomCreateItemSec();
    this.isVoteProsAdv = !!this.getRandomNumber(0, 1);
    console.log(`Pros has adv: ${this.isVoteProsAdv}`);

    // START EMULATION
    // this.emitRandomCreateItemEvents();
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

  like(id: string, type: ItemType, count = 1, isUser = false) {
    const items = this[type];
    const index= items.findIndex(item => item.id === id);
    if (index !== -1) {
      items[index].likes += count;
      this.logService.logLike(items[index].text, count);

      if (isUser) {
        items[index].isUserLiked = true;
      }
    }
  }

  dislike(id: string, type: ItemType, count = 1, isUser = false) {
    const items = this[type];
    const index= items.findIndex(item => item.id === id);
    if (index !== -1) {
      items[index].dislikes += count;
      this.logService.logDislike(items[index].text, count);

      if (isUser) {
        items[index].isUserDisliked = true;
      }
    }
  }

  createItem(text: string, type: ItemType) {
    const id = uuid();
    this[type].unshift({
      id,
      text,
      likes: 0,
      dislikes: 0,
      isUserLiked: false,
      isUserDisliked: false,
    });
    this.logService.logCreateItem(text, type);
  }

  getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
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
    }, 1000);
  }

  uniq(arr: number[]) {
    const result: any = {};
    arr.forEach(function(a){
      if (result[a] != undefined)
        ++result[a];
      else
        result[a] = 1;
    });

    return result;
  }

  emitRandomVoteEvents() {
    // ATTENTION:  Sorry for this simplification, if I had more I time, I would do this better * crying *
    const interval = setInterval(() => {
      if (this.isVoteFinished) {
        clearInterval(interval);
      }

      const voteCount = this.getRandomNumber(20, 60);
      const randomProsIndexes: number[] = [];
      const randomConsIndexes: number[] = [];
      for (let i = 0; i < voteCount; i++) {
        const type = this.getRandomNumber(0, 1) ? ItemType.Pros : ItemType.Cons;

        if (type === ItemType.Pros) {
          const randomIndex = this.getRandomNumber(0, this.pros.length - 1);
          randomProsIndexes.push(randomIndex);
        } else {
          const randomIndex = this.getRandomNumber(0, this.cons.length - 1);
          randomConsIndexes.push(randomIndex);
        }
      }

      // for more difference, but not needed
      if (this.isVoteProsAdv) {
        randomConsIndexes.splice(0, 5);
      } else {
        randomProsIndexes.splice(0, 5);
      }

      const randomProsIndexesUniq = this.uniq(randomProsIndexes);
      for (const key in randomProsIndexesUniq) {
        const index = +key;
        const isLike = this.getRandomNumber(0, 1);
        if (isLike) {
          this.like(this.pros[index].id, ItemType.Pros, randomProsIndexesUniq[key]);
        } else {
          this.dislike(this.pros[index].id, ItemType.Pros, randomProsIndexesUniq[key]);
        }
      }

      const randomConsIndexesUniq = this.uniq(randomConsIndexes);
      for (const key in randomConsIndexesUniq) {
        const index = +key;
        const isLike = this.getRandomNumber(0, 1);
        if (isLike) {
          this.like(this.cons[index].id, ItemType.Cons, randomConsIndexesUniq[key]);
        } else {
          this.dislike(this.cons[index].id, ItemType.Cons, randomConsIndexesUniq[key]);
        }
      }
    }, 1000);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
