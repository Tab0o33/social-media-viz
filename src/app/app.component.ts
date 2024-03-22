import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';
import { AuthService } from './core/ports/auth.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        AsyncPipe,
        HeaderComponent
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

    protected isLoggedIn = toSignal(inject(AuthService).isLoggedIn$);

}
