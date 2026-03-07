import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/launch-pad/launch-pad.component').then((m) => m.LaunchPadComponent),
    title: 'Jaco van Stryp — Software Engineer II at Rocket Lab',
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./features/mission-control/mission-control.component').then(
        (m) => m.MissionControlComponent,
      ),
    title: 'About | Jaco van Stryp',
  },
  {
    path: 'experience',
    loadComponent: () =>
      import('./features/orbital-trajectory/orbital-trajectory.component').then(
        (m) => m.OrbitalTrajectoryComponent,
      ),
    title: 'Experience | Jaco van Stryp',
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./features/payload-bay/payload-bay.component').then((m) => m.PayloadBayComponent),
    title: 'Projects | Jaco van Stryp',
  },
  {
    path: 'skills',
    loadComponent: () =>
      import('./features/engine-diagnostics/engine-diagnostics.component').then(
        (m) => m.EngineDiagnosticsComponent,
      ),
    title: 'Skills | Jaco van Stryp',
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./features/reentry-capsule/reentry-capsule.component').then(
        (m) => m.ReentryCapsuleComponent,
      ),
    title: 'Contact | Jaco van Stryp',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
