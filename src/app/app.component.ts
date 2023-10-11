import { Component, OnInit } from '@angular/core';
import { IconService } from '../services/icon.service';
import { MatDialog } from '@angular/material/dialog';
import { QuizDialogComponent } from './quiz-dialog/quiz-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private iconService: IconService,
    public dialog: MatDialog
  ) {
    this.iconService.loadIcons();
  }

  ngOnInit() {}

  openQuizDialog() {
    this.dialog.open(QuizDialogComponent);
  }

  navigateToGitHub() {
    window.open('https://github.com/YanaK22/challenge', '_blank')
  }
}
