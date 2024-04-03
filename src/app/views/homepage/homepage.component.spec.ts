import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { HomepageComponent } from './homepage.component';
import { PostService } from '../../core/ports/post.service';
import { Observable, of } from 'rxjs';
import { Post } from '../../core/models/post.model';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('HomepageComponent', () => {
    let component: HomepageComponent;
    let fixture: ComponentFixture<HomepageComponent>;
    let getAllSpy: Observable<Post[]>;
    let updateSpy: Observable<Post>;
    let addoneSpy: Observable<Post>;

    beforeEach(async () => {
        const posts: Post[] = [
            {
                id: 42, userName: 'myname', createdDate: new Date(Date.now()), profilImage: 'image', text: 'string', likeCount: 12, isLiked: false
            },
            {
                id: 55, userName: 'azerty', createdDate: new Date(2023, 11, 31), profilImage: 'sdfs', text: 'dgffsgsg qdgs', likeCount: 8, isLiked: true
            },
            {
                id: 8, userName: 'wxcvbn', createdDate: new Date(2023, 2, 20), profilImage: 'eqfsfs', text: 'dgffsgsg sgsfxg qdgs', likeCount: 0, isLiked: false
            },
        ];
        const post: Post = {
            id: 42,
            userName: 'myname',
            createdDate: new Date(Date.now()),
            profilImage: 'image',
            text: 'string',
            likeCount: 12,
            isLiked: false,
        };
        const postServiceSpy = jasmine.createSpyObj('PostService', ['getAll', 'update', 'addone']);
        getAllSpy = postServiceSpy.getAll.and.returnValue(of(posts));
        updateSpy = postServiceSpy.update.and.returnValue(of(post));
        addoneSpy = postServiceSpy.addone.and.returnValue(of(post));
        await TestBed.configureTestingModule({
            imports: [
                HomepageComponent,
                NoopAnimationsModule
            ],
            providers: [
                { provide: PostService, useValue: postServiceSpy }
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(HomepageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display form', () => {
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('form')).toBeTruthy();
    });

    xit('should display one mat-card for each post');

    describe('on toggleLike', () => {

        it('should call service', () => {
            component.toggleLike(42, true);
            expect(updateSpy).toHaveBeenCalledTimes(1);
        });

    });

    describe('on submit', () => {

        it('should call service', () => {
            component.onSubmit();
            expect(addoneSpy).toHaveBeenCalledTimes(1);
        });

    });
});
