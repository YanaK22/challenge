import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

enum Icons {
  Github= 'github',
  Add = 'add',
  Like = 'like',
  Dislike = 'dislike',
  CurrentResults = 'currentResults',
  Log = 'log',
  Pros = 'pros',
  Cons = 'cons',
  Close = 'close',
}

@Injectable({ providedIn: 'root' })
export class IconService {
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {}

  loadIcons() {
    Object.values(Icons).forEach(key => {
      this.matIconRegistry.addSvgIcon(
        key,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/icons/${key}.svg`)
      );
    });
  }
}
