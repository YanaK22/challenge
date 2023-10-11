import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VotePageComponent } from './vote-page/vote-page.component';
import { StartPageComponent } from './start-page/start-page.component';

const routes: Routes = [
  {
    path: 'vote-page',
    component: VotePageComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    component: StartPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
