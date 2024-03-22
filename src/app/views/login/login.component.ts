import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../core/ports/auth.service';
import { Login } from '../../core/models/login.model';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatCardModule,
        MatProgressSpinnerModule,
        ReactiveFormsModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {

    private formBuilder = inject(FormBuilder);
    private authService = inject(AuthService);

    loginForm: FormGroup = this.formBuilder.nonNullable.group({
        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
    });

    isLoading = signal(false);
    emailErrorMessage = signal(this.loginForm.get('email')?.hasError('required') ? 'You must enter a value' : '');
    passwordErrorMessage = signal(this.loginForm.get('password')?.hasError('required') ? 'You must enter a value' : '');


    onSubmit() {
        this.isLoading.set(true);
        const loginData: Login = { ...this.loginForm.value };
        this.authService.login(loginData);
        this.isLoading.set(false);
    }

}
