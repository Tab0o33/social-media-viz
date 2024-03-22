import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, Routes } from '@angular/router';
import { AuthService } from './core/ports/auth.service';

const authGuard: CanActivateFn = (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) => {

    const isLoggedIn = inject(AuthService).isLoggedIn;
    const router = inject(Router);
    if (isLoggedIn) {
        return true;
    } else {
        router.navigateByUrl('/login');
        return false;
    }
}

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./views/homepage/homepage.component').then((x) => x.HomepageComponent),
        title: 'Accueil',
        canActivate: [authGuard],
    },
    {
        path: 'login',
        loadComponent: () => import('./views/login/login.component').then((x) => x.LoginComponent),
        title: 'Login'
    }
];
