import { Component, OnInit } from "@angular/core";
import { OnDestroy } from "@angular/core"
import { Subscription } from "rxjs";
import { Post } from "../post.model"; 
import { PostService } from "../posts.service";

@Component({
    selector: 'app-card',
    templateUrl: './post-card.component.html',
    styleUrls: ['./post-card.component.css']
  })

export class PostCardComponent implements OnInit, OnDestroy{

  posts:Post[] = [];
  user: string

  cols
  private postSub: Subscription;
  isLoading = false;

  constructor(public postService: PostService){}
  
  ngOnInit(){
    this.postService.getPosts();
    this.postSub = this.postService.getPostsUpdateListerner().subscribe((posts: Post[]) =>{
      this.isLoading = false;
      this.posts = posts;
    });

    if(window.innerWidth>1200){
      this.cols=3;
    } else if(window.innerWidth>768){
      this.cols=2;
    }else{
      this.cols=1;
    }

    window.addEventListener('resize', ()=> {
      if(window.innerWidth>1200){
        this.cols=3;
      } else if(window.innerWidth>768){
        this.cols=2;
      }else{
        this.cols=1;
      }
    })
  }

  onDelete(postId: string){
    this.postService.deletePost(postId);
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

  ngOnDestroy(){
    this.postSub.unsubscribe();
  }

  usuario(){

    this.user = localStorage.getItem('usuario')
    return this.user
  }

}