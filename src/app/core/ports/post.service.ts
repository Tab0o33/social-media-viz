import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
    providedIn: 'root'
})
export abstract class PostService {

    abstract getAll(): Observable<Post[]>;
    abstract update(id: number, isLiked: boolean): Observable<Post>;
    abstract addone(message: string): Observable<Post>;

}
