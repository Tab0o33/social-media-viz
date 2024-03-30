import { Observable, delay, of } from "rxjs";
import { Post } from "../models/post.model";
import { PostService } from "../ports/post.service";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class InMemoryPostService extends PostService {

    private posts: Post[] = [
        {
            id: 1,
            userName: 'William Moinet',
            createdDate: new Date(2023, 11, 31),
            profilImage: 'https://sm.ign.com/ign_fr/cover/a/avatar-gen/avatar-generations_bssq.jpg',
            image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
            text: 'Cecii est une photo de mon chien. On s\'est promené hier dans le parc.',
            likeCount: 5,
            isLiked: false
        },
        {
            id: 2,
            userName: 'Johnn Doe',
            createdDate: new Date(2024, 2, 15),
            profilImage: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
            image: 'https://i.pinimg.com/originals/84/fe/93/84fe9316210420884fb842adf1bd4852.jpg',
            text: 'Voici une photo du Fitz Roy en Patagonie. J\'y était l\'été dernier !!',
            likeCount: 8,
            isLiked: true
        }
    ];

    getAll(): Observable<Post[]> {
        return of(this.posts).pipe(
            delay(1000)
        );
    }

    update(id: number, isLiked: boolean): Observable<Post> {
        const updatedPost = this.posts.find(el => el.id === id);
        if (updatedPost) {
            updatedPost.isLiked = isLiked;
            isLiked ? updatedPost.likeCount++ : updatedPost.likeCount--;
            return of(updatedPost).pipe(
                delay(1000)
            );
        } else {
            throw Error(`Post with id ${id} not found`);
        }
    }

    addone(text: string): Observable<Post> {
        const maxPostId = Math.max(...this.posts.map(p => p.id));
        const newPost: Post = {
            id: maxPostId + 1,
            userName: 'me',
            createdDate: new Date(Date.now()),
            profilImage: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
            text,
            likeCount: 0,
            isLiked: false
        }
        this.posts.unshift(newPost);

        return of(newPost).pipe(
            delay(1000)
        );
    }
}