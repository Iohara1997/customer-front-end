import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartComponent } from './COMPONENTS/start/start.component';
import { AddComponent } from './COMPONENTS/add/add.component';
import { UpdateComponent } from './COMPONENTS/update/update.component';
import { LoginComponent } from './COMPONENTS/login/login.component';
import { AuthenticatedUserGuard } from './SERVICES/guards/authenticated-user.guard';
import { UnauthenticatedUserGuard } from './SERVICES/guards/unauthenticated-user.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [UnauthenticatedUserGuard] },
  {
    path: '', component: StartComponent, canActivate: [AuthenticatedUserGuard],
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
