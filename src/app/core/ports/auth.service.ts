import { Injectable } from '@angular/core';
import { Login } from '../models/login.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export abstract class AuthService {

    abstract get isLoggedIn$(): Observable<boolean>;
    abstract login(login: Login): void;
    abstract logout(): void;

}
