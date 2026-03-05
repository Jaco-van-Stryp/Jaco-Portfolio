import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  computed,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MissionStateService } from '../../services/mission-state.service';

const DOG_MESSAGES = [
  "Woof! Did you know Rocket Lab launched NZ's first orbital rocket?",
  'Bark! Jaco graduated Summa Cum Laude with a 4.0 GPA! *tail wag*',
  'Arf! Angular signals are like dog treats - once you try them, no going back!',
  'Woof! Vitals maintained near-100% uptime for 30+ banks across Africa!',
  'Bark! I heard there are easter eggs hidden in this portfolio...',
  'Woof! TypeScript strict mode is non-negotiable. Just like walkies.',
  'Arf! From Belgium Campus to Rocket Lab - what a trajectory!',
];

@Component({
  selector: 'app-space-dog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (visible()) {
      <div
        class="space-dog-container"
        role="complementary"
        aria-label="Space dog mascot"
        aria-live="polite"
      >
        <button
          class="dog-dismiss"
          (click)="dismiss()"
          aria-label="Dismiss space dog"
          title="Dismiss"
        >
          ×
        </button>
        <div class="dog-bubble">
          <p class="dog-message">{{ message() }}</p>
          <button class="dog-next-btn" (click)="nextMessage()" aria-label="Next message">
            Next tip
          </button>
        </div>
        <div
          class="dog-avatar"
          (click)="nextMessage()"
          role="button"
          tabindex="0"
          (keydown.enter)="nextMessage()"
          (keydown.space)="nextMessage()"
          aria-label="Space dog - click for another tip"
        >
          <div class="dog-emoji">🐶</div>
          <div class="dog-helmet">🪐</div>
        </div>
      </div>
    }
  `,
  styles: [
    `
      .space-dog-container {
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 1000;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 8px;
        animation: slide-in-right 0.4s ease-out;
      }
      @keyframes slide-in-right {
        from {
          opacity: 0;
          transform: translateX(40px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      .dog-bubble {
        background: rgba(11, 13, 26, 0.95);
        border: 1px solid rgba(0, 212, 255, 0.4);
        border-radius: 12px 12px 4px 12px;
        padding: 12px 14px;
        max-width: 240px;
        backdrop-filter: blur(12px);
        box-shadow: 0 0 20px rgba(0, 212, 255, 0.2);
      }
      .dog-message {
        font-size: 0.75rem;
        color: #e2e8f0;
        line-height: 1.5;
        margin: 0 0 8px;
      }
      .dog-next-btn {
        font-size: 0.65rem;
        color: var(--cyan);
        background: none;
        border: 1px solid rgba(0, 212, 255, 0.3);
        border-radius: 4px;
        padding: 2px 8px;
        cursor: pointer;
        font-family: 'Space Mono', monospace;
        transition: all 0.2s;
      }
      .dog-next-btn:hover {
        background: rgba(0, 212, 255, 0.1);
      }
      .dog-avatar {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: rgba(0, 212, 255, 0.1);
        border: 2px solid rgba(0, 212, 255, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        cursor: pointer;
        transition: transform 0.2s;
        align-self: flex-end;
      }
      .dog-avatar:hover {
        transform: scale(1.1);
      }
      .dog-emoji {
        font-size: 1.8rem;
        line-height: 1;
      }
      .dog-helmet {
        position: absolute;
        top: -8px;
        right: -4px;
        font-size: 1rem;
      }
      .dog-dismiss {
        align-self: flex-end;
        background: none;
        border: none;
        color: var(--text-muted);
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0 4px;
        line-height: 1;
        transition: color 0.2s;
      }
      .dog-dismiss:hover {
        color: var(--text);
      }
    `,
  ],
})
export class SpaceDogComponent {
  private readonly missionState = inject(MissionStateService);
  private readonly platformId = inject(PLATFORM_ID);

  readonly visible = this.missionState.dogVisible;
  private readonly _messageIndex = signal(0);

  readonly message = computed(() => DOG_MESSAGES[this._messageIndex() % DOG_MESSAGES.length]);

  nextMessage(): void {
    this._messageIndex.update((i) => (i + 1) % DOG_MESSAGES.length);
  }

  dismiss(): void {
    this.missionState.hideDog();
  }
}
