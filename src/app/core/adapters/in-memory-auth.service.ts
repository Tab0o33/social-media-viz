import { Injectable, inject } from '@angular/core';
import { AuthService } from '../ports/auth.service';
import { Login } from '../models/login.model';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class InMemoryAuthService extends AuthService {

    private router = inject(Router);

    private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
    get isLoggedIn$(): Observable<boolean> {
        return this._isLoggedIn$.asObservable();
    }

    public login(login: Login): void {
        setTimeout(() => {
            this.loginSucceeded();
        }, 1000);
    }

    public logout(): void {
        this._isLoggedIn$.next(false);
        this.router.navigateByUrl('/login');
    }

    private loginSucceeded() {
        this._isLoggedIn$.next(true);
        this.router.navigateByUrl('');
    }

}
