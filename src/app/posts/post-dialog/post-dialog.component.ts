import { Component } from "@angular/core";
import { PostInfoComponent } from "../post-Info/post-info.component";
import { MatDialog} from '@angular/material/dialog';
import { User } from "../user.model"; 
import { Subscription } from "rxjs";
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.services";

@Component({
    selector: 'app-dialog',
    templateUrl: './post-dialog.component.html',
    styleUrls: ['./post-dialog.component.css']
  })

export class PostDialogComponent{

  //currentUser: String | null = localStorage.getItem("userid");

  constructor(public dialog:MatDialog, public authService: AuthService) {}

  openDialogII(){
    this.dialog.open(PostInfoComponent);
  }

  users:User[] = [];
  private userSub: Subscription;


  ngOnInit(){
    this.authService.getUser();
    this.userSub = this.authService.getUserUpdateListerner().subscribe((users: User[]) =>{
    this.users = users;
    });
  }

  onDelete(id: string){
    this.authService.deleteUser(id);
  }

  validar(){
    let usuario = localStorage.getItem('usertype');
    let validar = false;
      if(usuario?.includes("admin")){
          validar = true;
      }else{
        validar = false;
      }
      return validar;
  }

  SignUp(form: NgForm){
    if(form.invalid){
      alert("Debes llenar los campos!")
      return
    }
    this.authService.signUp(form.value.email, form.value.password, "admin").subscribe( res =>{
      console.log(res)
      window.location.reload();
    },
    err =>{
      console.log(err)
    })
  }

  validarUsuario(){
    let usuario = localStorage.getItem("userid");
    return usuario;
  }

}