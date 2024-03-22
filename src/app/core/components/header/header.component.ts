import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../ports/auth.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        RouterModule,
        MatToolbarModule,
        MatButtonModule
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {

    private authService = inject(AuthService);

    protected logout() {
        this.authService.logout();
    }

}
