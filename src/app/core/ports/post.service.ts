import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
    providedIn: 'root'
})
export abstract class PostService {

    abstract get posts$(): Observable<Post[]>;

    abstract getAll(): Observable<Post[]>;
    abstract update(id: number, isLiked: boolean): Observable<Post>;
    abstract addone(message: string): Observable<Post>;

    abstract getPostsFromServer(): void;
    abstract updatePostOnServer(id: number, isLiked: boolean): void;
    abstract addPostOnServer(text: string): void;

}
