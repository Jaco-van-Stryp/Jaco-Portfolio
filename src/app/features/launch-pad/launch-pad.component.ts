import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  inject,
  OnDestroy,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  CdkDrag,
  CdkDropList,
  CdkDragDrop,
  CdkDragPlaceholder,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { MissionStateService } from '../../shared/services/mission-state.service';

export interface MissionComponent {
  id: string;
  label: string;
  icon: string;
  color: string;
  category: string;
  description: string;
}

const MISSION_COMPONENTS: MissionComponent[] = [
  {
    id: 'angular',
    label: 'Angular Frontend',
    icon: '🔺',
    color: '#dd0031',
    category: 'UI',
    description: 'Component framework',
  },
  {
    id: 'dotnet',
    label: 'C#/.NET Engine',
    icon: '🟣',
    color: '#9b4dca',
    category: 'API',
    description: 'Backend runtime',
  },
  {
    id: 'postgres',
    label: 'PostgreSQL Core',
    icon: '🐘',
    color: '#336791',
    category: 'DATA',
    description: 'Relational database',
  },
  {
    id: 'kubernetes',
    label: 'Kubernetes OPS',
    icon: '☸️',
    color: '#326ce5',
    category: 'OPS',
    description: 'Container orchestration',
  },
  {
    id: 'aws',
    label: 'AWS Platform',
    icon: '☁️',
    color: '#ff9900',
    category: 'CLOUD',
    description: 'Cloud infrastructure',
  },
];

@Component({
  selector: 'app-launch-pad',
  imports: [RouterLink, CdkDrag, CdkDropList, CdkDragPlaceholder],
  templateUrl: './launch-pad.component.html',
  styleUrl: './launch-pad.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('rocketLaunch', [
      state('idle', style({ transform: 'translateY(0)', opacity: 1 })),
      state('launching', style({ transform: 'translateY(-200vh)', opacity: 0 })),
      transition('idle => launching', animate('2200ms cubic-bezier(0.4, 0, 1, 1)')),
    ]),
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(24px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class LaunchPadComponent implements OnDestroy {
  private readonly router = inject(Router);
  private readonly missionState = inject(MissionStateService);

  protected readonly launching = signal(false);
  protected readonly countdown = signal(5);
  protected readonly rocketState = signal<'idle' | 'launching'>('idle');
  protected readonly flameActive = signal(false);

  private readonly _loadedCount = signal(0);
  readonly isLaunchReady = computed(() => this._loadedCount() >= this.totalComponents);

  protected readonly totalComponents = MISSION_COMPONENTS.length;

  protected available: MissionComponent[] = [...MISSION_COMPONENTS];
  protected loaded: MissionComponent[] = [];

  protected readonly quickStats = [
    { value: '5+', label: 'YEARS DEPLOYED' },
    { value: '30+', label: 'INSTITUTIONS SERVED' },
    { value: '10', label: 'COUNTRIES COVERED' },
    { value: '4.0', label: 'GPA ACHIEVED' },
  ];

  private countdownSub?: Subscription;

  protected onDrop(event: CdkDragDrop<MissionComponent[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this._loadedCount.set(this.loaded.length);
    }
  }

  protected initiateLaunch(): void {
    if (!this.isLaunchReady()) return;
    this.launching.set(true);
    this.flameActive.set(true);
    this.countdown.set(5);

    this.countdownSub = interval(1000)
      .pipe(take(5))
      .subscribe({
        next: () => this.countdown.update((n) => n - 1),
        complete: () => {
          this.rocketState.set('launching');
          setTimeout(() => {
            this.missionState.markLaunched();
            this.router.navigate(['/mission-control']);
          }, 2300);
        },
      });
  }

  protected abortLaunch(): void {
    this.countdownSub?.unsubscribe();
    this.launching.set(false);
    this.flameActive.set(false);
    this.rocketState.set('idle');
  }

  ngOnDestroy(): void {
    this.countdownSub?.unsubscribe();
  }
}
