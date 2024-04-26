import { ChangeDetectionStrategy, Component, OnInit, Signal, WritableSignal, inject } from '@angular/core';
import { PostService } from '../../core/ports/post.service';
import { AsyncPipe, NgStyle, DatePipe, TitleCasePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SortPipe } from '../../shared/pipes/sort.pipe';
import { Observable, take, tap } from 'rxjs';
import { Post } from '../../core/models/post.model';

@Component({
    selector: 'app-homepage',
    standalone: true,
    imports: [
        AsyncPipe,
        NgStyle,
        DatePipe,
        MatCardModule,
        MatButtonModule,
        MatDividerModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        SortPipe,
        TitleCasePipe
    ],
    templateUrl: './homepage.component.html',
    styleUrl: './homepage.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomepageComponent implements OnInit {

    private formBuilder = inject(FormBuilder);
    private postService = inject(PostService);

    protected posts: Signal<Post[] | undefined> = toSignal(this.postService.posts$);

    posts$: Observable<Post[] | undefined> = toObservable(this.posts);

    newPostForm: FormGroup = this.formBuilder.nonNullable.group({
        newPost: ''
    });

    ngOnInit(): void {
        this.postService.getPostsFromServer();
    }

    toggleLike(id: number, isLiked: boolean) {
        this.posts$.pipe(
            take(1),
            tap(() => {
                this.postService.updatePostOnServer(id, !isLiked);
            })
        ).subscribe();
    }

    onSubmit() {
        this.postService.addPostOnServer(this.newPostForm.value.newPost);
        this.newPostForm.reset();
    }

}
