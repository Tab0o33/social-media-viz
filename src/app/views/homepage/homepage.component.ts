import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PostService } from '../../core/ports/post.service';
import { AsyncPipe, NgStyle, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SortPipe } from '../../shared/pipes/sort.pipe';

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
        SortPipe
    ],
    templateUrl: './homepage.component.html',
    styleUrl: './homepage.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomepageComponent {

    private formBuilder = inject(FormBuilder);
    private postService = inject(PostService);

    protected posts = toSignal(this.postService.getAll());

    newPostForm: FormGroup = this.formBuilder.nonNullable.group({
        newPost: ''
    });

    toggleLike(id: number, isLiked: boolean) {
        this.postService.update(id, !isLiked).subscribe();
    }

    onSubmit() {
        this.postService.addone(this.newPostForm.value.newPost).subscribe();
        this.newPostForm.reset();
    }

}
