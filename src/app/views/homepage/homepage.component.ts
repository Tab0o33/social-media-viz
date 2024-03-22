import { Component, inject } from '@angular/core';
import { PostService } from '../../core/ports/post.service';
import { AsyncPipe, NgStyle, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { toSignal } from '@angular/core/rxjs-interop';

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
        MatIconModule
    ],
    templateUrl: './homepage.component.html',
    styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

    private userService = inject(PostService);

    protected posts = toSignal(this.userService.getAll());

    toggleLike(id: number, isLiked: boolean) {
        this.userService.update(id, !isLiked).subscribe();
    }

}
