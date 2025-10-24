import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { authGuardGuard } from './core/guard/auth-guard.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuardGuard] },
  { path: 'blog', component: BlogComponent, canActivate: [authGuardGuard] },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuardGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuardGuard],
  },

  { path: '**', component: NotFoundComponent, canActivate: [authGuardGuard] },
];
