import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { from, map } from 'rxjs';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return from(authService.initializeAuth()).pipe(
    map(() => authService.isAuthenticated() ? true : router.createUrlTree(['/auth/login']))
  );
};
