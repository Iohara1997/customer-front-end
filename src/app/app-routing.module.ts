import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartComponent } from './COMPONENTS/start/start.component';
import { AddComponent } from './COMPONENTS/add/add.component';
import { UpdateComponent } from './COMPONENTS/update/update.component';
import { LoginComponent } from './COMPONENTS/login/login.component';
import { AuthenticatedUserGuard } from './SERVICES/guards/authenticated-user.guard';
import { UnauthenticatedUserGuard } from './SERVICES/guards/unauthenticated-user.guard';
import { RegisterComponent } from './COMPONENTS/register/register.component';
import { ListComponent } from './COMPONENTS/list/list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [UnauthenticatedUserGuard] },
  { path: 'register', component: RegisterComponent },
  {
    path: '', component: StartComponent, canActivate: [AuthenticatedUserGuard],
    children: [
      { path: '', component: ListComponent },
      { path: 'add', component: AddComponent },
      { path: 'edit/:id', component: UpdateComponent }]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
