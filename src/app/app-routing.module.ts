import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VotePageComponent } from '../features/vote-page/vote-page.component';

const routes: Routes = [
  {
    path: 'vote-page',
    component: VotePageComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'vote-page',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
