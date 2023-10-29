import { Injectable } from "@angular/core"
import { Post } from "./post.model";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs'

@Injectable({providedIn: 'root'})

export class PostService {

    private posts: Post[] = []; //Primer matriz
    private postUpdate = new Subject<Post[]>();

    constructor(private http: HttpClient){

    }

    getPosts(){
        this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
        
        .pipe(map((postData)=>{
            return postData.posts.map(post=> {
                return{
                    title: post.title,
                    content: post.content,
                    id: post._id
                }
            })
        }))

        .subscribe((publicacionTrasnformada) => {
            this.posts = publicacionTrasnformada;
            this.postUpdate.next([...this.posts]);
        });
    }

    getPostsUpdateListerner(){
        return this.postUpdate.asObservable();
    }

    addPost(title:string, content: string){
        const post: Post = {
            id: null, 
            title: title, 
            content: content
        };

        this.http.post<{message:string}>('http://localhost:3000/api/posts', post).subscribe((ResponseData) =>{
            console.log(ResponseData.message);
            this.posts.push(post);
            this.postUpdate.next([...this.posts]);
        });
    }
    
    deletePost(postId: string){
        this.http.delete("http://localhost:3000/api/posts/" + postId)
        .subscribe(()=>{
            console.log('Eliminado')
            this.postUpdate.next([...this.posts]);
            this.getPosts();
        });
    }

    /*
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
    }*/
}

    