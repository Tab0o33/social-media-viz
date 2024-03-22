import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { PostService } from './core/ports/post.service';
import { InMemoryPostService } from './core/adapters/in-memory-post-service';

import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { InMemoryAuthService } from './core/adapters/in-memory-auth.service';
import { AuthService } from './core/ports/auth.service';

registerLocaleData(localeFr);

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideClientHydration(),
        provideAnimationsAsync(),
        { provide: LOCALE_ID, useValue: 'fr-FR' },
        { provide: PostService, useClass: InMemoryPostService },
        { provide: AuthService, useClass: InMemoryAuthService }
    ]
};
