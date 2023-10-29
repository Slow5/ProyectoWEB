import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { PostService } from "../posts.service";

@Component({
    selector: 'app-form',
    templateUrl: './post-form.component.html',
    styleUrls: ['./post-form.component.css']
  })

export class PostFormComponent{

  constructor(public postService:PostService){}

  onAddPost(form: NgForm){
    
    if(form.invalid){
      alert("No ingreso datos");
      return;
    }

   this.postService.addPost(form.value.title, form.value.content);
   form.resetForm();
   form.onReset();
  }
}