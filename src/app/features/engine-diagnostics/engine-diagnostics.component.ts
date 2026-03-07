import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  OnInit,
  ElementRef,
  viewChild,
  effect,
  untracked,
  PLATFORM_ID,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { MissionStateService } from '../../shared/services/mission-state.service';
import { SeoService } from '../../shared/services/seo.service';

interface Skill {
  name: string;
  level: number;
  category: string;
  icon: string;
  color: string;
  description: string;
}

interface SkillCategory {
  id: string;
  label: string;
  icon: string;
  color: string;
  skills: Skill[];
}

@Component({
  selector: 'app-engine-diagnostics',
  imports: [RouterLink],
  templateUrl: './engine-diagnostics.component.html',
  styleUrl: './engine-diagnostics.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EngineDiagnosticsComponent implements OnInit {
  private readonly missionState = inject(MissionStateService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly seoService = inject(SeoService);

  protected readonly radarCanvas = viewChild<ElementRef<HTMLCanvasElement>>('radarCanvas');
  protected readonly activeCategory = signal<string>('frontend');
  protected readonly hoveredSkill = signal<Skill | null>(null);
  private readonly _chartInitialized = signal(false);

  protected readonly categories: SkillCategory[] = [
    {
      id: 'frontend',
      label: 'FRONTEND',
      icon: '🔺',
      color: '#dd0031',
      skills: [
        {
          name: 'Angular',
          level: 95,
          category: 'frontend',
          icon: '🔺',
          color: '#dd0031',
          description: 'Expert - 6+ years, current at Rocket Lab',
        },
        {
          name: 'TypeScript',
          level: 92,
          category: 'frontend',
          icon: '🔷',
          color: '#3178c6',
          description: 'Expert - strict typing throughout all projects',
        },
        {
          name: 'React',
          level: 75,
          category: 'frontend',
          icon: '⚛️',
          color: '#61dafb',
          description: 'Proficient - used at Jaxify & Sybrin for 4+ years',
        },
        {
          name: 'HTML/CSS',
          level: 90,
          category: 'frontend',
          icon: '🎨',
          color: '#f97316',
          description: 'Expert - semantic, accessible markup',
        },
        {
          name: 'Tailwind CSS',
          level: 80,
          category: 'frontend',
          icon: '💨',
          color: '#38bdf8',
          description: 'Proficient - used in recent projects',
        },
      ],
    },
    {
      id: 'backend',
      label: 'BACKEND',
      icon: '🟣',
      color: '#9b4dca',
      skills: [
        {
          name: 'C#',
          level: 92,
          category: 'backend',
          icon: '🟣',
          color: '#9b4dca',
          description: 'Expert - primary language for 6+ years',
        },
        {
          name: 'ASP.NET / .NET',
          level: 90,
          category: 'backend',
          icon: '⚙️',
          color: '#512bd4',
          description: 'Expert - REST APIs, microservices',
        },
        {
          name: 'PostgreSQL',
          level: 82,
          category: 'backend',
          icon: '🐘',
          color: '#336791',
          description: 'Advanced - used at Rocket Lab daily',
        },
        {
          name: 'SQL Server',
          level: 88,
          category: 'backend',
          icon: '🗄️',
          color: '#cc2927',
          description: 'Expert - banking systems at Sybrin',
        },
        {
          name: 'REST API Design',
          level: 88,
          category: 'backend',
          icon: '🌐',
          color: '#10b981',
          description: 'Advanced - extensive API design experience',
        },
      ],
    },
    {
      id: 'devops',
      label: 'DEVOPS',
      icon: '☸️',
      color: '#326ce5',
      skills: [
        {
          name: 'Docker',
          level: 80,
          category: 'devops',
          icon: '🐳',
          color: '#0db7ed',
          description: 'Advanced - containerization at Rocket Lab',
        },
        {
          name: 'Kubernetes',
          level: 75,
          category: 'devops',
          icon: '☸️',
          color: '#326ce5',
          description: 'Proficient - production k8s at Rocket Lab',
        },
        {
          name: 'AWS',
          level: 72,
          category: 'devops',
          icon: '☁️',
          color: '#ff9900',
          description: 'Proficient - cloud infrastructure',
        },
        {
          name: 'Azure',
          level: 78,
          category: 'devops',
          icon: '🔵',
          color: '#0078d4',
          description: 'Advanced - extensive Sybrin cloud work',
        },
        {
          name: 'CI/CD',
          level: 78,
          category: 'devops',
          icon: '🔄',
          color: '#10b981',
          description: 'Advanced - automated deployment pipelines',
        },
        {
          name: 'Git',
          level: 92,
          category: 'devops',
          icon: '🌿',
          color: '#f05032',
          description: 'Expert - daily version control',
        },
      ],
    },
    {
      id: 'soft',
      label: 'LEADERSHIP',
      icon: '🌟',
      color: '#fbbf24',
      skills: [
        {
          name: 'Team Leadership',
          level: 85,
          category: 'soft',
          icon: '👥',
          color: '#fbbf24',
          description: 'Experienced - led dev team at Sybrin',
        },
        {
          name: 'Mentoring',
          level: 80,
          category: 'soft',
          icon: '🎓',
          color: '#a78bfa',
          description: 'Experienced - mentored junior developers',
        },
        {
          name: 'System Design',
          level: 85,
          category: 'soft',
          icon: '📐',
          color: '#f472b6',
          description: 'Advanced - designed Vitals architecture',
        },
        {
          name: 'Problem Solving',
          level: 94,
          category: 'soft',
          icon: '🧩',
          color: '#34d399',
          description: 'Expert - systematic debugging & design',
        },
        {
          name: 'Communication',
          level: 88,
          category: 'soft',
          icon: '💬',
          color: '#60a5fa',
          description: 'Strong - client-facing consultancy experience',
        },
      ],
    },
  ];

  readonly activeCategoryData = () =>
    this.categories.find((c) => c.id === this.activeCategory()) ?? this.categories[0];

  ngOnInit(): void {
    this.missionState.visitSection('skills');
    this.seoService.setPageMeta({
      title: 'Skills | Jaco van Stryp',
      description:
        'Technical skills of Jaco van Stryp: Angular, C#/.NET, TypeScript, PostgreSQL, Docker, Kubernetes, AWS, and more.',
      url: 'https://jacovanstryp.com/skills',
    });
  }

  constructor() {
    effect(() => {
      const canvas = this.radarCanvas()?.nativeElement;
      if (!canvas || this._chartInitialized() || !isPlatformBrowser(this.platformId)) return;
      this._chartInitialized.set(true);
      untracked(() => this.initRadarChart());
    });
  }

  protected setCategory(id: string): void {
    this.activeCategory.set(id);
  }

  protected hoverSkill(skill: Skill | null): void {
    this.hoveredSkill.set(skill);
  }

  protected getLevelLabel(level: number): string {
    if (level >= 90) return 'EXPERT';
    if (level >= 80) return 'ADVANCED';
    if (level >= 70) return 'PROFICIENT';
    return 'FAMILIAR';
  }

  protected getLevelColor(level: number): string {
    if (level >= 90) return '#10b981';
    if (level >= 80) return '#00d4ff';
    if (level >= 70) return '#8b5cf6';
    return '#fbbf24';
  }

  private async initRadarChart(): Promise<void> {
    const canvas = this.radarCanvas()?.nativeElement;
    if (!canvas) return;

    const {
      Chart,
      RadarController,
      LineElement,
      PointElement,
      LinearScale,
      RadialLinearScale,
      Filler,
      Tooltip,
    } = await import('chart.js');

    Chart.register(
      RadarController,
      LineElement,
      PointElement,
      LinearScale,
      RadialLinearScale,
      Filler,
      Tooltip,
    );

    const allSkills = [
      { label: 'Angular', value: 95 },
      { label: 'C#/.NET', value: 92 },
      { label: 'TypeScript', value: 92 },
      { label: 'PostgreSQL', value: 82 },
      { label: 'Kubernetes', value: 75 },
      { label: 'AWS', value: 72 },
      { label: 'Docker', value: 80 },
      { label: 'Azure', value: 78 },
    ];

    new Chart(canvas, {
      type: 'radar',
      data: {
        labels: allSkills.map((s) => s.label),
        datasets: [
          {
            label: 'Skill Level',
            data: allSkills.map((s) => s.value),
            borderColor: '#00d4ff',
            backgroundColor: 'rgba(0, 212, 255, 0.1)',
            borderWidth: 2,
            pointBackgroundColor: '#00d4ff',
            pointBorderColor: '#00d4ff',
            pointRadius: 4,
            pointHoverRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(11, 13, 26, 0.9)',
            borderColor: 'rgba(0, 212, 255, 0.3)',
            borderWidth: 1,
            titleColor: '#00d4ff',
            bodyColor: '#e2e8f0',
            callbacks: {
              label: (ctx) => ` ${ctx.raw}% proficiency`,
            },
          },
        },
        scales: {
          r: {
            min: 0,
            max: 100,
            ticks: { display: false, stepSize: 25 },
            grid: { color: 'rgba(0, 212, 255, 0.08)', lineWidth: 1 },
            angleLines: { color: 'rgba(0, 212, 255, 0.08)', lineWidth: 1 },
            pointLabels: {
              color: '#94a3b8',
              font: { family: "'Space Mono', monospace", size: 10 },
            },
          },
        },
      },
    });
  }
}
