import { Component } from "@angular/core";
import { PostService } from "../posts.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { mimeType } from "./mime-type.validator";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Post } from "../post.model";

@Component({
    selector: 'app-form',
    templateUrl: './post-form.component.html',
    styleUrls: ['./post-form.component.css']
  })

export class PostFormComponent{
  
  enteredTitle = ""
  entederContent = ""

  usuario: string

  form: FormGroup;
  imagePreview: string;

  private mode = 'create'
  private postId: string 

  public post: Post
  isLoading = false;

  constructor(public postService:PostService, private router: ActivatedRoute, private routers: Router){}

  ngOnInit(){
    this.form = new FormGroup({
      'title': new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }), 
        'content': new FormControl(null, {
          validators: [Validators.required]
        }), 
        'image': new FormControl(null, {
          validators: [Validators.required],
          asyncValidators: [mimeType]
        })
    });

    this.router.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('postId')){
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true
        
        this.postService.getPost(this.postId)
        .subscribe(postData => {
          
          this.isLoading = false;

          this.post = {
            id: postData._id, 
            title: postData.title, 
            content: postData.content, 
            imagePath: postData.imagePath,
            usuario: localStorage.getItem('usuario') // Asegúrate de obtener el usuario correctamente
          };
         
          this.form.setValue({
            title: this.post.title,
            content: this.post.content, 
            image: this.post.imagePath
          });
        });
      }else{
        this.mode = 'create'
        this.postId = null;
      }
    })
  }

  onAddPost(){
    if(this.form.invalid){
      alert("No ingreso datos");
      return;
    }

    this.isLoading = true;
    
    if(this.mode == "create"){
      this.usuario = localStorage.getItem('usuario')
      this.postService.addPost(this.form.value.title, this.form.value.content, this.form.value.image, this.usuario)
    }else{
      this.usuario = localStorage.getItem('usuario')
      this.postService.updatePost(
        this.postId, 
        this.form.value.title, 
        this.form.value.content,
        this.form.value.image, 
        this.usuario
        )
    }
   this.form.reset();
    this.routers.navigate(["/main"]);
  }

  onImagePicked(event : Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    console.log(file)

    const reader = new FileReader();
    
    reader.onload = () =>{
      this.imagePreview = reader.result as string;
    }

    reader.readAsDataURL(file); 
  }

  validar(){
    let usuario = localStorage.getItem('usertype');
    let validar = false;
      if(usuario?.includes("usuario")){
          validar = true;
      }else{
        validar = false;
      }
      return validar;
  }
}