import { Component, OnInit } from "@angular/core";
import {OnDestroy} from "@angular/core"
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
  
  private postSub: Subscription;

  constructor(public postService: PostService){}

  ngOnInit(){
    this.posts = this.postService.getPosts();
    this.postSub = this.postService.getPostsUpdateListerner().subscribe((posts: Post[]) =>{
      this.posts = posts;
    });
  }
  ngOnDestroy(){
    this.postSub.unsubscribe();
  }

  eliminarElemento(post:any): void {
   const index = this.posts.indexOf(post);
    if(index != -1){
      this.posts.splice(index, 1);
    }
    this.postService.deletePost(index);
  }
}