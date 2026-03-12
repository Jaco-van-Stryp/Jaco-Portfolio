import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { MissionStateService } from '../../shared/services/mission-state.service';
import { SeoService } from '../../shared/services/seo.service';

export interface Project {
  id: string;
  name: string;
  codename: string;
  description: string;
  longDescription: string;
  tech: string[];
  type: 'MES' | 'fintech' | 'consultancy' | 'open-source' | 'portfolio' | 'saas';
  status: 'ACTIVE' | 'DEPLOYED' | 'ARCHIVED';
  statusColor: string;
  icon: string;
  color: string;
  githubUrl?: string;
  liveUrl?: string;
  videoUrl?: string;
  highlights: string[];
  impact?: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'electron-mes',
    name: 'Rocket Lab MES',
    codename: 'ROCKETLAB-MES-001',
    description:
      "Manufacturing execution system for Rocket Lab's Electron and Neutron rocket programs.",
    longDescription:
      'I build the software that builds Rocket Lab rockets. Production teams at Rocket Lab use this system daily to assemble Electron and Neutron rockets. I also play a role in the hiring process, conducting technical interviews for new software engineering positions.',
    tech: ['Angular', 'C#/.NET', 'PostgreSQL', 'SQL Server', 'Docker', 'Kubernetes', 'AWS'],
    type: 'MES',
    status: 'ACTIVE',
    statusColor: '#10b981',
    icon: '🚀',
    color: '#dc2626',
    liveUrl: 'https://rocketlabcorp.com/',
    videoUrl: 'https://youtu.be/4aJ5NPt5fSM',
    highlights: [
      'Used daily by Rocket Lab production teams',
      'Supports both Electron & Neutron programs',
      'Involved in hiring and technical interviews',
    ],
    impact: 'Powers the assembly of Rocket Lab rockets',
  },
  {
    id: 'vitals',
    name: 'Vitals',
    codename: 'VITALS-SYSTEM',
    description:
      'Automated recovery system maintaining near-100% uptime for 30+ banking institutions.',
    longDescription:
      'An automated recovery solution that identifies and resolves systemic issues in legacy banking software before they cause outages. Maintains near-100% uptime across 30+ financial institutions in 14 African countries with zero manual intervention.',
    tech: ['C#/.NET', 'SQL Server', 'Azure', 'Angular'],
    type: 'fintech',
    status: 'DEPLOYED',
    statusColor: '#3b82f6',
    icon: '💓',
    color: '#3b82f6',
    liveUrl: 'https://sybrin.com/hyperautomation-service/vitals/',
    videoUrl: 'https://youtu.be/e_abT320ly0',
    githubUrl: 'https://github.com/Jaco-van-Stryp/Vitals',
    highlights: [
      '30+ banking institutions served',
      '14 African countries covered',
      'Near-100% uptime maintained',
      'Fully automated recovery',
      'Zero manual intervention for common failures',
    ],
    impact: 'Keeps African banking infrastructure running',
  },
  {
    id: 'invoicer',
    name: 'Invoicer',
    codename: 'INVOICER-NZ-001',
    description:
      'Cloud-based invoicing platform for freelancers and small businesses. Create professional invoices in under a minute.',
    longDescription:
      'A fully-featured invoicing SaaS built from the ground up. Supports professional invoice generation, estimates and quotes (with one-click conversion to invoices), client management, a reusable product catalogue, multi-company accounts, and cloud document storage. Passwordless authentication for frictionless onboarding. Permanently free and open source.',
    tech: ['Angular', 'PrimeNG', 'Tailwind CSS', 'ASP.NET', 'PostgreSQL', 'Cloudflare', 'CI/CD'],
    type: 'saas',
    status: 'ACTIVE',
    statusColor: '#10b981',
    icon: '🧾',
    color: '#f59e0b',
    liveUrl: 'https://invoicer.co.nz/',
    githubUrl: 'https://github.com/Jaco-van-Stryp/invoicer',
    highlights: [
      'Invoice generation in under one minute',
      'Estimates & quotes with one-click invoice conversion',
      'Multi-company support from a single account',
      'Passwordless authentication, permanently free and open source',
      'Cloud storage for receipts and contracts',
    ],
    impact: 'Simplifying invoicing for freelancers across NZ',
  },
  {
    id: 'orbital-launchpad',
    name: 'Orbital Launchpad',
    codename: 'PORTFOLIO-001',
    description:
      'This very portfolio - an interactive space mission simulator built with Angular 21.',
    longDescription:
      'An immersive, gamified portfolio website themed around space exploration and rocketry. Built with Angular 21 using signals, standalone components, lazy loading, CDK drag-drop, and SSR. Features a cinematic launch sequence, career trajectory map, and interactive skill diagnostics.',
    tech: ['Angular', 'Cloudflare', 'CI/CD'],
    type: 'portfolio',
    status: 'ACTIVE',
    statusColor: '#8b5cf6',
    icon: '🌌',
    color: '#8b5cf6',
    liveUrl: 'https://jacovanstryp.com',
    githubUrl: 'https://github.com/Jaco-van-Stryp/Jaco-Portfolio',
    highlights: [
      'Angular 21 with signals & standalone',
      'CDK drag-drop mini-game',
      'SSR with hydration',
      'Lazy-loaded feature routes',
      'Chart.js skill radar',
      'View Transitions API',
    ],
    impact: "You're experiencing it right now",
  },
  {
    id: 'jaxify-platform',
    name: 'Jaxify Platform',
    codename: 'JAXIFY-PLATFORM',
    description:
      'Full-stack web platform built for multiple clients during consultancy operations.',
    longDescription:
      'A range of custom web applications built for clients through Jaxify Software. Managed a team through full project lifecycles, from requirements gathering and system design through to cloud deployment and client handover.',
    tech: ['C#/.NET', 'Angular', 'React', 'PostgreSQL', 'Azure', 'Cloudflare', 'CI/CD'],
    type: 'consultancy',
    status: 'ARCHIVED',
    statusColor: '#6b7280',
    icon: '⚡',
    color: '#10b981',
    highlights: [
      'Multiple client projects delivered',
      'Managed a team through full project lifecycles',
      'Responsive web applications',
      'Azure cloud deployments',
    ],
    impact: 'Powered client business operations',
  },
  {
    id: 'smart-voting',
    name: 'Smart Voting System',
    codename: 'EDUPLEX-VOTE-001',
    description:
      'Electronic school voting system built independently in grade 10, replacing weeks of paper ballot counting with instant automated results.',
    longDescription:
      'Built entirely on my own in grade 10 at Eduplex High School. The entire school previously voted for student council on paper - counting all the ballots took weeks before winners could be announced. I designed and built a fully electronic voting system that automated the entire process end-to-end, delivering instant results. The school used it for multiple years.',
    tech: ['Java', 'SQL Server'],
    type: 'open-source',
    status: 'ARCHIVED',
    statusColor: '#6b7280',
    icon: '🗳️',
    color: '#6b7280',
    githubUrl:
      'https://github.com/Jaco-van-Stryp/Eduplex-High-School-Electronic-Smart-Voting-System',
    highlights: [
      'Built independently at age ~16 (grade 10)',
      'Used by the entire school for multiple years',
      'Replaced weeks of manual paper counting with instant results',
      'Automated student council elections end-to-end',
    ],
    impact: 'Eliminated weeks of manual vote counting school-wide',
  },
];

@Component({
  selector: 'app-payload-bay',
  imports: [RouterLink],
  templateUrl: './payload-bay.component.html',
  styleUrl: './payload-bay.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayloadBayComponent implements OnInit {
  private readonly missionState = inject(MissionStateService);
  private readonly http = inject(HttpClient);
  private readonly seoService = inject(SeoService);

  protected readonly projects = signal<Project[]>(PROJECTS);
  protected readonly selectedProject = signal<Project | null>(null);
  protected readonly activeFilter = signal<string>('ALL');
  protected readonly filters = [
    'ALL',
    'MES',
    'FINTECH',
    'SAAS',
    'CONSULTANCY',
    'PORTFOLIO',
    'OPEN-SOURCE',
  ];

  ngOnInit(): void {
    this.missionState.visitSection('projects');
    this.loadGithubData();
    this.seoService.setPageMeta({
      title: 'Projects | Jaco van Stryp',
      description:
        'Projects by Jaco van Stryp - software projects including Rocket Lab MES, Vitals banking automation, Invoicer, and more.',
      url: 'https://jacovanstryp.com/projects',
    });
  }

  protected filteredProjects() {
    const filter = this.activeFilter();
    if (filter === 'ALL') return this.projects();
    return this.projects().filter((p) => p.type.toUpperCase() === filter);
  }

  protected setFilter(filter: string): void {
    this.activeFilter.set(filter);
  }

  protected openProject(project: Project): void {
    this.selectedProject.set(project);
  }

  protected closeProject(): void {
    this.selectedProject.set(null);
  }

  protected getStatusLabel(status: Project['status']): string {
    const map: Record<Project['status'], string> = {
      ACTIVE: 'ACTIVE',
      DEPLOYED: 'DEPLOYED',
      ARCHIVED: 'ARCHIVED',
    };
    return map[status];
  }

  private loadGithubData(): void {
    // Stub - in production fetch from GitHub API
    this.http
      .get('https://api.github.com/users/Jaco-van-Stryp/repos')
      .pipe(catchError(() => of([])))
      .subscribe();
  }
}
