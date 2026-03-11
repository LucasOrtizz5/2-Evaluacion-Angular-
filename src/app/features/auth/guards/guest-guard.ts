import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { from, map } from 'rxjs';
import { AuthService } from '../services/auth';

export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return from(authService.initializeAuth()).pipe(
    map(() => authService.isAuthenticated() ? router.createUrlTree(['/characters']) : true)
  );
};
