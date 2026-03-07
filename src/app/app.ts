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
    { path: '/', label: 'HOME', icon: '🚀', exact: true },
    { path: '/about', label: 'ABOUT', icon: '🎛️', exact: false },
    { path: '/experience', label: 'EXPERIENCE', icon: '🛸', exact: false },
    { path: '/projects', label: 'PROJECTS', icon: '📦', exact: false },
    { path: '/skills', label: 'SKILLS', icon: '⚡', exact: false },
    { path: '/contact', label: 'CONTACT', icon: '📡', exact: false },
  ];

  protected toggleMobile(): void {
    this.mobileOpen.update((v) => !v);
  }

  protected closeMobile(): void {
    this.mobileOpen.set(false);
  }
}
