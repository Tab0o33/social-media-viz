import { Injectable } from '@angular/core';
import { Login } from '../models/login.model';

@Injectable({
    providedIn: 'root'
})
export abstract class AuthService {

    abstract get isLoggedIn(): boolean;
    abstract login(login: Login): void;
    abstract logout(): void;

}
