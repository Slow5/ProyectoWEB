import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './posts/footer/footer.component';
import { HeaderComponent } from './posts/header/header.component';
import { PostbackComponent } from './posts/posts-back/post-back.component';
import { PostDialogComponent } from './posts/post-dialog/post-dialog.component';
import { PostMenuComponent } from './posts/post-menu/post-menu.component';
import { PostInfoComponent } from './posts/post-Info/post-info.component';
import { PostCarruselComponent } from './posts/post-carrusel/post-carrusel.component';
import { TreeDynamicExample } from './posts/post-tree/post-tree.component';
import { PostCardComponent } from './posts/post-card/post-card.component';
import { PostFormComponent } from './posts/post-form/post-form.component';
import { PostGaleryComponent } from './posts/post-galery/post-galery.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './posts/auth.services';

import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTableModule} from '@angular/material/table';
import {MatChipsModule} from '@angular/material/chips';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatExpansionModule} from '@angular/material/expansion';

import { PostService } from './posts/posts.service';
import { LoginComponent } from './posts/login/login.component';
import { ConteinerComponent } from './posts/container/conteiner.component';
import { RegisterComponent } from './posts/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import  {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { PrComponent } from './posts/pr/pr.component';
import { PerfilComponent } from './posts/perfil/perfil.component';
import { BorrarComponent } from './posts/borrar/borrar.component';
import { RecuperarComponent } from './posts/recuperar/recuperar.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent, 
    PostbackComponent,
    PostDialogComponent, 
    PostMenuComponent,
    PostInfoComponent, 
    PostCarruselComponent, 
    TreeDynamicExample,
    PostCardComponent,
    PostFormComponent,
    PostGaleryComponent,
    LoginComponent,
    ConteinerComponent,
    RegisterComponent,
    PrComponent,
    PerfilComponent,
    BorrarComponent,
    RecuperarComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    MatToolbarModule,
    MatChipsModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    MatTabsModule,
    MatTableModule,
    MatTreeModule,
    MatIconModule,
    MatProgressBarModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    FormsModule, 
    MatGridListModule,
    HttpClientModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  providers: [
    PostService,
    AuthGuard,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
