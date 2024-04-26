import { Injectable, inject } from '@angular/core';
import { PostService } from '../ports/post.service';
import { BehaviorSubject, Observable, map, switchMap, take, tap } from 'rxjs';
import { Post } from '../models/post.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const HTTP_OPTIONS = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    })
};

@Injectable({
    providedIn: 'root'
})
export class ApiPostService extends PostService {

    private http = inject(HttpClient);

    private _posts$ = new BehaviorSubject<Post[]>([]);
    get posts$(): Observable<Post[]> {
        return this._posts$.asObservable();
    }

    override getAll(): Observable<Post[]> {
        return this.http.get<Post[]>(`${environment.apiUrl}/public/posts/details`);
    }

    override getPostsFromServer(): void {
        this.getAll().pipe(
            tap(posts => { this._posts$.next(posts) })
        ).subscribe();
    }

    override update(id: number, isLiked: boolean): Observable<Post> {
        return this.http.patch<Post>(`${environment.apiUrl}/public/posts/${id}`, { isLiked });
    }

    override updatePostOnServer(id: number, isLiked: boolean): void {
        this.posts$.pipe(
            take(1),
            map(posts => posts
                .map(post => post.id === id ?
                    { ...post, isLiked, likeCount: isLiked ? post.likeCount + 1 : post.likeCount - 1 }
                    : post
                )
            ),
            tap(updatedPosts => this._posts$.next(updatedPosts)),
            switchMap(() => this.update(id, isLiked))
        ).subscribe();
    }

    override addone(text: string): Observable<Post> {
        return this.http.post<Post>(`${environment.apiUrl}/public/posts`, { text }, HTTP_OPTIONS);
    }

    override addPostOnServer(text: string): void {
        this.addone(text).pipe(
            tap(() => { this.getPostsFromServer() })
        ).subscribe();
    }

}
