import { EventEmitter, Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Log } from '../models/log.model';
import { ItemType } from '../models/item-type.enum';

@Injectable({ providedIn: 'root' })
export class LogService {
  logs: Log[] = [];
  startDate!: number;
  voteFinished = new EventEmitter<void>();

  duration = 300000; // 5 min

  constructor(private datePipe: DatePipe) {
    this.startDate = Date.now();

    setTimeout(() => {
      this.logFinishVoting();
      this.voteFinished.emit();
    }, this.duration);

    this.logStartVoting();
  }

  getTime() {
    return Date.now() - this.startDate; // ms
  }

  getTimeFormat() {
    return this.datePipe.transform(this.getTime(), 'mm:ss') ?? '';
  }

  getValidatedTimeFormat() {
    const max = this.duration; //s
    const current = this.getTime();
    return this.datePipe.transform((current < max? current : max), 'mm:ss') ?? '';
  }

  logStartVoting() {
    this.logs.unshift({ time: '00:00', text: 'Voting started' });
  }

  logFinishVoting() {
    setTimeout(() => this.logs.unshift({ time: '05:00', text: 'Voting ended' }), 1000);
  }

  logCreateItem(text: string, type: ItemType) {
    this.logs.unshift({ time: this.getTimeFormat(), text: `"${text}" added to ${type}` });
  }

  logLike(text: string, count: number) {
    this.logs.unshift({ time: this.getTimeFormat(), text: `"${text}" liked (${count})` });
  }

  logDislike(text: string, count: number) {
    this.logs.unshift({ time: this.getTimeFormat(), text: `"${text}" disliked (${count})` });
  }
}
