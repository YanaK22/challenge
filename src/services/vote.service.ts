import { Injectable } from '@angular/core';
import { MOCK_CONS, MOCK_PROS } from '../models/mock.constants';
import { Item } from '../models/item.model';

@Injectable({ providedIn: 'root' })
export class VoteService {
  pros: Item[];
  cons: Item[];

  constructor() {
    // init 5 pros & cons using mock
    this.pros = MOCK_PROS.splice(0, 5);
    this.cons = MOCK_CONS.splice(0, 5);
  }
}
