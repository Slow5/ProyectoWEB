import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './posts/login/login.component';
import { ConteinerComponent } from './posts/container/conteiner.component';
import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './posts/register/register.component';
import { PostMenuComponent } from './posts/post-menu/post-menu.component';
import { TreeDynamicExample } from './posts/post-tree/post-tree.component';
import { PostInfoComponent } from './posts/post-Info/post-info.component';
import { PostCardComponent } from './posts/post-card/post-card.component';
import { PostFormComponent } from './posts/post-form/post-form.component';
import { PostDialogComponent } from './posts/post-dialog/post-dialog.component';
import { PrComponent } from './posts/pr/pr.component';
import { PerfilComponent } from './posts/perfil/perfil.component';
import { BorrarComponent } from './posts/borrar/borrar.component';
import { RecuperarComponent } from './posts/recuperar/recuperar.component';
import { IngresarMenuComponent } from './posts/ingresar-menu/ingresar-menu.component';

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
  }, {
    path: 'entrada', 
    component: PostMenuComponent
  }, {
    path: 'bebida', 
    component: TreeDynamicExample
  }, {
    path: 'info', 
    component: PostInfoComponent
  }, {
    path: 'publicacion', 
    component: PostFormComponent
  },{
    path: 'publicacion/:postId', 
    component: PostFormComponent
  }
  , {
    path: 'admin',
    component: PostDialogComponent
  }, {
    path: 'codigo', 
    component: PrComponent
  }, {
    path: 'perfil', 
    component: PerfilComponent
  }, {
    path: 'edit/:userid',
    component: BorrarComponent     
  },{
    path: 'recuperar',
    component: RecuperarComponent
  },{
    path: 'ingresarMenu', 
    component: IngresarMenuComponent
  }
];

@NgModule({                       
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
