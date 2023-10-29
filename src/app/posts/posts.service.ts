import { Injectable } from "@angular/core"
import { Post } from "./post.model";
import { Subject } from "rxjs";

@Injectable({providedIn: 'root'})

export class PostService {

    private posts: Post[] = []; //Primer matriz
    
    private postUpdate = new Subject<Post[]>();

    getPosts(){
        return [...this.posts]; //segunda matriz
    }

    getPostsUpdateListerner(){
        return this.postUpdate.asObservable();
    }

    addPost(title:string, content: string){
        const post: Post = {
            title: title, 
            content: content
        }
        
        this.posts.push(post);
        this.postUpdate.next([...this.posts]);
    }

    deletePost(index:any){
        this.posts.splice(index, 1);
    }
}

    