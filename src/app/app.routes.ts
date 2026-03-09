import { Routes } from '@angular/router';
import { guestGuard } from './features/auth/guards/guest-guard';
import { authGuard } from './features/auth/guards/auth-guard';

export const routes: Routes = [
  // Rutas de autenticación (solo para usuarios NO autenticados)
  {
    path: 'auth/register',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./features/auth/pages/register-page/register-page')
        .then(m => m.RegisterPage)
  },
  {
    path: 'auth/login',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./features/auth/pages/login-page/login-page')
        .then(m => m.LoginPage)
  },
  {
    path: 'auth/profile',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/auth/pages/profile-page/profile-page')
        .then(m => m.ProfilePage)
  },
  // Rutas de characters (solo para usuarios autenticados)
  {
    path: 'characters',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/characters/characters-page/characters-page')
        .then(m => m.CharactersPage)
  },
  {
    path: 'characters/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/characters/character-detail/character-detail')
        .then(m => m.CharacterDetail)
  },
  // Rutas de Episodes y Locations
  {
    path: 'episodes',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/characters/episodes-page/episodes-page')
        .then(m => m.EpisodesPage)
  },
  {
    path: 'locations',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/characters/locations-page/locations-page')
        .then(m => m.LocationsPage)
  },
  // Redirect por defecto a characters (si está autenticado irá a characters, si no, el guard redirige a login)
  {
    path: '',
    redirectTo: 'characters',
    pathMatch: 'full'
  }
];
