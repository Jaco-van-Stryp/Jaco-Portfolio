import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/launch-pad/launch-pad.component').then((m) => m.LaunchPadComponent),
    title: 'Portfolio | Jaco van Stryp',
  },
  {
    path: 'mission-control',
    loadComponent: () =>
      import('./features/mission-control/mission-control.component').then(
        (m) => m.MissionControlComponent,
      ),
    title: 'Mission Control | Jaco van Stryp',
  },
  {
    path: 'orbital-trajectory',
    loadComponent: () =>
      import('./features/orbital-trajectory/orbital-trajectory.component').then(
        (m) => m.OrbitalTrajectoryComponent,
      ),
    title: 'Orbital Trajectory | Jaco van Stryp',
  },
  {
    path: 'payload-bay',
    loadComponent: () =>
      import('./features/payload-bay/payload-bay.component').then((m) => m.PayloadBayComponent),
    title: 'Payload Bay | Jaco van Stryp',
  },
  {
    path: 'engine-diagnostics',
    loadComponent: () =>
      import('./features/engine-diagnostics/engine-diagnostics.component').then(
        (m) => m.EngineDiagnosticsComponent,
      ),
    title: 'Engine Diagnostics | Jaco van Stryp',
  },
  {
    path: 'reentry',
    loadComponent: () =>
      import('./features/reentry-capsule/reentry-capsule.component').then(
        (m) => m.ReentryCapsuleComponent,
      ),
    title: 'Re-Entry Capsule | Jaco van Stryp',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
