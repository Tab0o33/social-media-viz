import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of } from 'rxjs';
import { Post } from '../../core/models/post.model';
import { AuthService } from '../../core/ports/auth.service';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let loginSpy: Observable<Post>;

    beforeEach(async () => {
        const post: Post = {
            id: 42,
            userName: 'myname',
            createdDate: new Date(Date.now()),
            profilImage: 'image',
            text: 'string',
            likeCount: 12,
            isLiked: false,
        };
        const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
        loginSpy = authServiceSpy.login.and.returnValue(of(post));
        await TestBed.configureTestingModule({
            imports: [
                LoginComponent,
                NoopAnimationsModule
            ],
            providers: [
                { provide: AuthService, useValue: authServiceSpy },
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(LoginComponent);
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

    describe('on submit', () => {

        it('should call service', () => {
            component.onSubmit();
            expect(loginSpy).toHaveBeenCalledTimes(1);
        });

    });
});
