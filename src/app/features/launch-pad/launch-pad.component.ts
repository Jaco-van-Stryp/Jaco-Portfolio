import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  inject,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
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
import { SeoService } from '../../shared/services/seo.service';
import { PROJECTS } from '../payload-bay/payload-bay.component';

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
    id: 'frontend',
    label: 'Angular & React',
    icon: '🔺',
    color: '#dd0031',
    category: 'UI',
    description: 'Frontend frameworks',
  },
  {
    id: 'api',
    label: 'C# / ASP.NET API',
    icon: '🟣',
    color: '#9b4dca',
    category: 'API',
    description: 'Backend framework',
  },
  {
    id: 'database',
    label: 'PostgreSQL & MSSQL',
    icon: '🐘',
    color: '#336791',
    category: 'DATA',
    description: 'Relational databases',
  },
  {
    id: 'ops',
    label: 'Docker / Kubernetes',
    icon: '☸️',
    color: '#326ce5',
    category: 'OPS',
    description: 'Container orchestration',
  },
  {
    id: 'cloud',
    label: 'AWS & Azure',
    icon: '☁️',
    color: '#ff9900',
    category: 'CLOUD',
    description: 'Cloud infrastructure',
  },
];

@Component({
  selector: 'app-launch-pad',
  imports: [RouterLink, NgOptimizedImage, CdkDrag, CdkDropList, CdkDragPlaceholder],
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
export class LaunchPadComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly missionState = inject(MissionStateService);
  private readonly seoService = inject(SeoService);

  protected readonly launching = signal(false);
  protected readonly photoLightbox = signal(false);
  protected readonly countdown = signal(5);
  protected readonly rocketState = signal<'idle' | 'launching'>('idle');
  protected readonly flameActive = signal(false);

  private readonly _loadedCount = signal(0);
  readonly isLaunchReady = computed(() => this._loadedCount() >= this.totalComponents);

  protected readonly totalComponents = MISSION_COMPONENTS.length;

  protected available: MissionComponent[] = [...MISSION_COMPONENTS];
  protected loaded: MissionComponent[] = [];

  private readonly yearsExperience = new Date().getFullYear() - 2019;

  protected readonly quickStats = [
    { value: `${this.yearsExperience}+`, label: 'YRS EXPERIENCE' },
    { value: `${PROJECTS.length}`, label: 'MAJOR PROJECTS' },
    { value: '15+', label: 'COUNTRIES REACHED' },
    { value: 'A+', label: 'TOP GRADUATE' },
  ];

  private countdownSub?: Subscription;

  ngOnInit(): void {
    this.seoService.setPageMeta({
      title: 'Jaco van Stryp — Software Engineer II at Rocket Lab',
      description:
        'Portfolio of Jaco van Stryp, Software Engineer II at Rocket Lab building software for Electron & Neutron rockets.',
      url: 'https://jacovanstryp.com/',
    });
  }

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
            this.router.navigate(['/about']);
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
