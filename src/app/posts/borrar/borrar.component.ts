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
        }),
        'password': new FormControl(null, {
          validators: [Validators.required, Validators.minLength(3)]
        }), 
        'passwordDos': new FormControl(null, {
          validators: [Validators.required, Validators.minLength(3)]
        }), 
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
            nombre: this.user.nombre, 
            apellido: this.user.apellido,
            numero: this.user.numero,
            image: this.user.image, 
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
      alert("Campo no editado")
    }else{
      console.log(this.form.value.password)
      console.log(this.form.value.passwordDos)

      if(this.form.value.password == this.form.value.passwordDos){
        alert("Campos Actualizados")
     
      const email = localStorage.getItem('email')
      const usertype = localStorage.getItem('usertype')
      
      this.postService.UpdateUser(this.userId,email,this.form.value.password,this.form.value.nombre, 
        this.form.value.apellido, this.form.value.numero, usertype, this.form.value.image)

      }else if(this.form.value.password != this.form.value.passwordDos){
        alert("Contraseñas Incorrectas")
      }else{
        alert("Error")
      }
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
