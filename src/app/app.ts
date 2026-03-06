import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

import { StarFieldComponent } from './shared/components/star-field/star-field.component';
import { MissionStateService } from './shared/services/mission-state.service';

interface NavLink {
  path: string;
  label: string;
  icon: string;
  exact: boolean;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, StarFieldComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly missionState = inject(MissionStateService);
  protected readonly mobileOpen = signal(false);

  protected readonly navLinks: NavLink[] = [
    { path: '/', label: 'LAUNCH PAD', icon: '🚀', exact: true },
    { path: '/mission-control', label: 'MISSION CONTROL', icon: '🎛️', exact: false },
    { path: '/orbital-trajectory', label: 'TRAJECTORY', icon: '🛸', exact: false },
    { path: '/payload-bay', label: 'PAYLOAD', icon: '📦', exact: false },
    { path: '/engine-diagnostics', label: 'DIAGNOSTICS', icon: '⚡', exact: false },
    { path: '/reentry', label: 'RE-ENTRY', icon: '📡', exact: false },
  ];

  protected toggleMobile(): void {
    this.mobileOpen.update((v) => !v);
  }

  protected closeMobile(): void {
    this.mobileOpen.set(false);
  }
}
