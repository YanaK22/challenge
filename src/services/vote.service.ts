import { Injectable } from '@angular/core';
import { MOCK_CONS, MOCK_PROS } from '../models/mock.constants';
import { Item } from '../models/item.model';
import { ItemType } from '../models/item-type.enum';

@Injectable({ providedIn: 'root' })
export class VoteService {
  pros: Item[];
  cons: Item[];

  constructor() {
    // init 5 pros & cons using mock
    this.pros = MOCK_PROS.splice(0, 5);
    this.cons = MOCK_CONS.splice(0, 5);
  }

  like(id: string, type: ItemType) {
    const items = type === ItemType.Pros ? this.pros : this.cons;
    const index= items.findIndex(item => item.id === id);
    if (index !== -1) {
      items[index].likes++;
    }
  }

  dislike(id: string, type: ItemType) {
    const items = type === ItemType.Pros ? this.pros : this.cons;
    const index= items.findIndex(item => item.id === id);
    if (index !== -1) {
      items[index].dislikes++;
    }
  }
}
