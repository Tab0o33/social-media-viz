import { Injectable, inject } from '@angular/core';
import { AuthService } from '../ports/auth.service';
import { Login } from '../models/login.model';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class InMemoryAuthService extends AuthService {

    private router = inject(Router);

    private _isLoggedIn: boolean = false;
    get isLoggedIn(): boolean {
        return this._isLoggedIn;
    }

    public login(login: Login): void {
        setTimeout(() => {
            this.loginSucceeded();
        }, 1000);
    }

    public logout(): void {
        this._isLoggedIn = false;
        this.router.navigateByUrl('/login');
    }

    private loginSucceeded() {
        this._isLoggedIn = true;
        this.router.navigateByUrl('');
    }

}
