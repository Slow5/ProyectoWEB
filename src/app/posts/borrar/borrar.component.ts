import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { mimeType } from '../post-form/mime-type.validator';
import { AuthService } from '../auth.services';
import { User } from '../user.model';
@Component({
  selector: 'app-borrar',
  templateUrl: './borrar.component.html',
  styleUrls: ['./borrar.component.css']
})
export class BorrarComponent {

  form: FormGroup;
  imagePreview: string;

  private mode = 'create'
  private userId: string 
  public user: User

  constructor(public postService:AuthService, private router: ActivatedRoute){}

  ngOnInit(){ 
    this.form = new FormGroup({
      'nombre': new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }), 
        'apellido': new FormControl(null, {
          validators: [Validators.required, Validators.minLength(3)]
        }),
        'numero': new FormControl(null, {
          validators: [Validators.required, Validators.minLength(3)]
        }), 
        'image': new FormControl(null, {
          validators: [Validators.required],
          asyncValidators: [mimeType]
        })
    });

    this.router.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('userid')){
        
        this.mode = 'edit';
      
        this.userId = paramMap.get('userid');
        
        this.postService.getUsuario(this.userId)
        .subscribe(postData => {
          
          this.user = {
            id: postData._id, 
            email: postData.email, 
            password: postData.password,
            nombre: postData.nombre,
            apellido: postData.apellido,
            numero: postData.numero,
            usertype: postData.usertype,
            image: postData.image
          };
         
          this.form.setValue({
            //email: this.user.email,
            //password: this.user.password,
            nombre: this.user.nombre, 
            apellido: this.user.apellido,
            numero: this.user.numero,
            //usertype: this.user.usertype, 
            image: this.user.image
          });
        });
      }else{
        this.mode = 'create'
        this.userId = null;
      }
    })
  }

  onAddPost(){

    if(this.form.invalid){
      alert("No ingreso datos");
      return;
    }

    if(this.mode == "create"){
      //this.postService.add(this.form.value.title, this.form.value.content, this.form.value.image)
      alert("Campo no editado")
    }else{

      alert("hola")

      //this.userId = localStorage.getItem('userid')
      
      const email = localStorage.getItem('email')
      const password = localStorage.getItem('contraseña')
      const usertype = localStorage.getItem('usertype')
      
      this.postService.UpdateUser(
      this.userId, 
      email, 
      password, 
      this.form.value.nombre, 
      this.form.value.apellido,
      this.form.value.numero, 
      usertype,
      this.form.value.image
        )
      }
      this.form.reset();
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

}
