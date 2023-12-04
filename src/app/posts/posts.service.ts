import { Injectable } from "@angular/core"
import { Post } from "./post.model";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs'
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})

export class PostService {

    private posts: Post[] = []; //Primer matriz
    private postUpdate = new Subject<Post[]>();

    constructor(private http: HttpClient, private router: Router){}
    
    getPost(id:string){
        return this.http.get<{_id:string, title:string, content:string, imagePath: string}>(
            "http://localhost:3000/api/posts/" + id
        );
    }

    getPosts(){
        this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
        
        .pipe(map((postData)=>{
            return postData.posts.map(post=> {
                return{
                    title: post.title,
                    content: post.content,
                    id: post._id, 
                    imagePath: post.imagePath, 
                    usuario: post.usuario
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

    addPost(title:string, content: string, image: File, usuario: string){
        
        const postData = new FormData();

        postData.append("title", title);
        postData.append("content", content);
        postData.append("image", image, title);
        postData.append("usuario", usuario);

        this.http.post<{message:string, post: Post}>('http://localhost:3000/api/posts', postData)
        .subscribe((ResponseData) =>{

            console.log(usuario) 
            
            const post: Post = {
                id: ResponseData.post.id, 
                title: title, 
                content: content,
                imagePath: ResponseData.post.imagePath, 
                usuario: usuario
            };
            this.posts.push(post);
            this.postUpdate.next([...this.posts]);
        });
    }
    
    deletePost(postId: string){
        this.http.delete("http://localhost:3000/api/posts/" + postId)
        .subscribe(()=>{
            const updatePost = this.posts.filter(post => post.id !== postId);
            this.posts = updatePost;
            this.postUpdate.next([...this.posts])
        });
    }

    updatePost(id: string, title: string, content: string, image: File | string, usuario:string){

        let postData;
        
        if(typeof image === "object"){

            postData = new FormData();
            
            postData.append("id", id);
            postData.append("title", title);
            postData.append("content", content);
            postData.append("image", image, title);
            postData.append("usuario", usuario)

        }else {
            const postData = {
                id:id,
                title: title,
                content: content, 
                imagePath: image, 
                usuario: usuario
            };
        }

        this.http.put("http://localhost:3000/api/posts/" + id, postData)
        .subscribe(response =>{
            const updatePost = [...this.posts];
            const oldPostIndex = updatePost.findIndex(p => p.id === id);
            const post: Post = {
                id: id, 
                title: title, 
                content: content, 
                imagePath: "",
                usuario: usuario
            }
            updatePost[oldPostIndex] = post;
            this.posts = updatePost;
            this.postUpdate.next([...this.posts]); 
            this.router.navigate(["/main"]);
        });
    }
}

    