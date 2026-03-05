import { Injectable, PLATFORM_ID, inject, signal, computed, effect } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface MissionBadge {
  id: string;
  name: string;
  description: string;
  earned: boolean;
  icon: string;
}

interface PersistedState {
  launched: boolean;
  visitedSections: string[];
}

@Injectable({ providedIn: 'root' })
export class MissionStateService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private readonly _launched = signal(false);
  private readonly _visitedSections = signal<Set<string>>(new Set());
  private readonly _dogVisible = signal(false);

  readonly launched = this._launched.asReadonly();
  readonly visitedSections = this._visitedSections.asReadonly();
  readonly dogVisible = this._dogVisible.asReadonly();

  readonly badges = computed<MissionBadge[]>(() => [
    {
      id: 'explorer',
      name: 'Space Explorer',
      description: 'Visited 3+ sections',
      earned: this._visitedSections().size >= 3,
      icon: '🌌',
    },
    {
      id: 'astronaut',
      name: 'Astronaut',
      description: 'Launched the rocket',
      earned: this._launched(),
      icon: '👨‍🚀',
    },
    {
      id: 'completionist',
      name: 'Mission Complete',
      description: 'Visited all sections',
      earned: this._visitedSections().size >= 6,
      icon: '🏆',
    },
  ]);

  readonly earnedBadges = computed(() => this.badges().filter((b) => b.earned));

  constructor() {
    if (this.isBrowser) {
      this.loadFromStorage();
      effect(() => {
        this.saveToStorage();
      });
      setTimeout(() => this.triggerDog(), 18000);
    }
  }

  markLaunched(): void {
    this._launched.set(true);
  }

  visitSection(section: string): void {
    this._visitedSections.update((set) => new Set([...set, section]));
  }

  triggerDog(): void {
    this._dogVisible.set(true);
    setTimeout(() => this._dogVisible.set(false), 9000);
  }

  hideDog(): void {
    this._dogVisible.set(false);
  }

  private saveToStorage(): void {
    if (!this.isBrowser) return;
    try {
      const state: PersistedState = {
        launched: this._launched(),
        visitedSections: [...this._visitedSections()],
      };
      localStorage.setItem('orbital-mission-state', JSON.stringify(state));
    } catch {
      // storage unavailable
    }
  }

  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem('orbital-mission-state');
      if (stored) {
        const state: PersistedState = JSON.parse(stored);
        if (state.launched) this._launched.set(true);
        if (state.visitedSections) this._visitedSections.set(new Set(state.visitedSections));
      }
    } catch {
      // corrupted storage
    }
  }
}
