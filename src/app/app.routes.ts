import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/launch-pad/launch-pad.component').then((m) => m.LaunchPadComponent),
    title: 'Launch Pad | Orbital Launchpad',
  },
  {
    path: 'mission-control',
    loadComponent: () =>
      import('./features/mission-control/mission-control.component').then(
        (m) => m.MissionControlComponent,
      ),
    title: 'Mission Control | Orbital Launchpad',
  },
  {
    path: 'orbital-trajectory',
    loadComponent: () =>
      import('./features/orbital-trajectory/orbital-trajectory.component').then(
        (m) => m.OrbitalTrajectoryComponent,
      ),
    title: 'Orbital Trajectory | Orbital Launchpad',
  },
  {
    path: 'payload-bay',
    loadComponent: () =>
      import('./features/payload-bay/payload-bay.component').then((m) => m.PayloadBayComponent),
    title: 'Payload Bay | Orbital Launchpad',
  },
  {
    path: 'engine-diagnostics',
    loadComponent: () =>
      import('./features/engine-diagnostics/engine-diagnostics.component').then(
        (m) => m.EngineDiagnosticsComponent,
      ),
    title: 'Engine Diagnostics | Orbital Launchpad',
  },
  {
    path: 'reentry',
    loadComponent: () =>
      import('./features/reentry-capsule/reentry-capsule.component').then(
        (m) => m.ReentryCapsuleComponent,
      ),
    title: 'Re-Entry Capsule | Orbital Launchpad',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
