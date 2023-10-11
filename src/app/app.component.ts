import { Component, OnInit } from '@angular/core';
import { IconService } from '../services/icon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private iconService: IconService) {
    this.iconService.loadIcons();
  }

  ngOnInit() {}

  navigateToGitHub() {
    window.open('https://github.com/YanaK22/challenge', '_blank')
  }
}
