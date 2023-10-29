import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './posts/login/login.component';
import { ConteinerComponent } from './posts/conteiner/conteiner.component';
import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './posts/register/register.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login', 
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  }, 
  {
    path: 'main', 
    component: ConteinerComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
