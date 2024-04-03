import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from './core/ports/auth.service';

let component: AppComponent;
let fixture: ComponentFixture<AppComponent>;
let authServiceSpy: jasmine.SpyObj<AuthService>;

describe('AppComponent', () => {

    describe('with loggedIn', () => {

        beforeEach(async () => {
            authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn$']);
            (authServiceSpy as any).isLoggedIn$ = of(true);
            await TestBed.configureTestingModule({
                imports: [AppComponent],
                providers: [
                    provideRouter([{ path: '**', component: AppComponent }]),
                    { provide: AuthService, useValue: authServiceSpy },
                ]
            }).compileComponents();

            fixture = TestBed.createComponent(AppComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should create the app', () => {
            expect(component).toBeTruthy();
        });

        it('should display header', async () => {
            const compiled = fixture.nativeElement;
            expect(compiled.querySelector('app-header')).toBeTruthy();
        });

    });

    describe('without loggedIn', () => {

        beforeEach(async () => {
            authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn$']);
            (authServiceSpy as any).isLoggedIn$ = of(false);
            await TestBed.configureTestingModule({
                imports: [AppComponent],
                providers: [
                    provideRouter([{ path: '**', component: AppComponent }]),
                    { provide: AuthService, useValue: authServiceSpy },
                ]
            }).compileComponents();

            fixture = TestBed.createComponent(AppComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should create the app', () => {
            expect(component).toBeTruthy();
        });

        it('should not display header', async () => {
            const compiled = fixture.nativeElement;
            expect(compiled.querySelector('app-header')).toBeNull();
        });

    });
});
