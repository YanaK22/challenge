import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VotePageComponent } from './vote-page/vote-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IconService } from '../services/icon.service';
import { MatButtonModule } from '@angular/material/button';
import { VoteCardComponent } from './vote-card/vote-card.component';
import { AddItemDialogComponent } from './add-item-dialog/add-item-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NotificationDialogComponent } from './notification-dialog/notification-dialog.component';
import { QuizDialogComponent } from './quiz-dialog/quiz-dialog.component';
import { StartPageComponent } from './start-page/start-page.component';
import { VoteService } from '../services/vote.service';
import { LogService } from '../services/log.service';
import { DatePipe } from '@angular/common';
import { ResultsDialogComponent } from './results-dialog/results-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    VotePageComponent,
    VoteCardComponent,
    AddItemDialogComponent,
    NotificationDialogComponent,
    QuizDialogComponent,
    ResultsDialogComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    // Angular Material
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
  ],
  providers: [
    DatePipe,
    IconService,
    VoteService,
    LogService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
