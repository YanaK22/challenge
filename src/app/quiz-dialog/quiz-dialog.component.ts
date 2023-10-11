import { Component } from '@angular/core';

@Component({
  selector: 'app-quiz-dialog',
  templateUrl: './quiz-dialog.component.html',
  styleUrls: ['./quiz-dialog.component.scss']
})
export class QuizDialogComponent {
  slide = 1;

  loadSlide(n: number) {
    this.slide = 0;
    setTimeout(() => this.slide = n, 4000);
  }
}
