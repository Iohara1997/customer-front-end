import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartComponent } from './COMPONENTS/start/start.component';
import { AddComponent } from './COMPONENTS/add/add.component';
import { UpdateComponent } from './COMPONENTS/update/update.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home', component: StartComponent,
    children: [
      { path: 'add', component: AddComponent },
      { path: 'update', component: UpdateComponent }]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
