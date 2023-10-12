import { EventEmitter, Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Log } from '../models/log.model';
import { ItemType } from '../models/item-type.enum';

@Injectable({ providedIn: 'root' })
export class LogService {
  logs: Log[] = [];
  startDate!: number;
  voteFinished = new EventEmitter<void>();

  constructor(private datePipe: DatePipe) {
    this.startDate = Date.now();
    setTimeout(() => this.voteFinished.emit(), 300000);
    this.logStartVoting();
  }

  getTime() {
    return this.datePipe.transform(Date.now() - this.startDate, 'mm:ss') ?? '';
  }

  logStartVoting() {
    this.logs.unshift({ time: '00:00', text: 'Voting started' });
  }

  logCreateItem(text: string, type: ItemType) {
    this.logs.unshift({ time: this.getTime(), text: `"${text}" added to ${type}` });
  }

  logLike(text: string) {
    this.logs.unshift({ time: this.getTime(), text: `"${text}" liked` });
  }

  logDislike(text: string) {
    this.logs.unshift({ time: this.getTime(), text: `"${text}" disliked` });
  }
}
