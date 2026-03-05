import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { MissionStateService } from '../../shared/services/mission-state.service';

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
  highlights: string[];
  impact?: string;
}

const PROJECTS: Project[] = [
  {
    id: 'electron-mes',
    name: 'Electron MES',
    codename: 'ELECTRON-MES-001',
    description: "Manufacturing execution system for Rocket Lab's Electron rocket program.",
    longDescription:
      'Building the software that production teams at Rocket Lab use daily to assemble Electron and Neutron rockets. Covers operation management, routing systems, and UI components that streamline complex manufacturing workflows.',
    tech: ['Angular', 'C#/.NET', 'PostgreSQL', 'Docker', 'Kubernetes', 'AWS'],
    type: 'MES',
    status: 'ACTIVE',
    statusColor: '#10b981',
    icon: '🚀',
    color: '#dc2626',
    highlights: [
      'Used daily by Rocket Lab production teams',
      'Supports Electron & Neutron programs',
      'Operation management and routing',
      'Manufacturing workflow optimization',
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
      'An automated recovery solution that identifies and resolves systemic issues in legacy banking software before they cause outages. Maintains near-100% uptime across 30+ financial institutions in 10 African countries with zero manual intervention.',
    tech: ['C#', 'ASP.NET', 'SQL Server', 'Azure', 'Angular'],
    type: 'fintech',
    status: 'DEPLOYED',
    statusColor: '#3b82f6',
    icon: '💓',
    color: '#3b82f6',
    liveUrl: 'https://sybrin.co.za/vitals',
    githubUrl: 'https://github.com/Jaco-van-Stryp/Vitals',
    highlights: [
      '30+ banking institutions served',
      '10 African countries covered',
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
      'A fully-featured invoicing SaaS built from the ground up. Supports professional invoice generation, estimates and quotes (with one-click conversion to invoices), client management, a reusable product catalogue, multi-company accounts, and cloud document storage. Passwordless authentication for frictionless onboarding with a permanently free tier.',
    tech: ['Angular', 'PrimeNG', 'Tailwind CSS', 'TypeScript', 'Node.js'],
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
      'Passwordless authentication',
      'Permanently free tier — no credit card required',
      'Cloud storage for receipts and contracts',
    ],
    impact: 'Simplifying invoicing for freelancers across NZ',
  },
  {
    id: 'jaxify-platform',
    name: 'Jaxify Platform',
    codename: 'JAXIFY-PLATFORM',
    description:
      'Full-stack web platform built for multiple clients during consultancy operations.',
    longDescription:
      'A range of custom web applications built for clients through Jaxify Software. Handled end-to-end delivery — from requirements gathering and system design through to cloud deployment and client handover.',
    tech: ['C#', 'ASP.NET', 'Angular', 'React', 'SQL', 'Azure'],
    type: 'consultancy',
    status: 'ARCHIVED',
    statusColor: '#6b7280',
    icon: '⚡',
    color: '#10b981',
    highlights: [
      'Multiple client projects delivered',
      'Full lifecycle ownership',
      'Responsive web applications',
      'Azure cloud deployments',
    ],
    impact: 'Powered client business operations',
  },
  {
    id: 'orbital-launchpad',
    name: 'Orbital Launchpad',
    codename: 'PORTFOLIO-001',
    description:
      'This very portfolio — an interactive space mission simulator built with Angular 21.',
    longDescription:
      'An immersive, gamified portfolio website themed around space exploration and rocketry. Built with Angular 21 using signals, standalone components, lazy loading, CDK drag-drop, and SSR. Features a cinematic launch sequence, career trajectory map, and interactive skill diagnostics.',
    tech: ['Angular 21', 'TypeScript', 'CDK', 'Chart.js', 'Tailwind CSS', 'SSR'],
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

  protected readonly projects = signal<Project[]>(PROJECTS);
  protected readonly selectedProject = signal<Project | null>(null);
  protected readonly activeFilter = signal<string>('ALL');
  protected readonly ejecting = signal<string | null>(null);

  protected readonly filters = ['ALL', 'MES', 'FINTECH', 'SAAS', 'CONSULTANCY', 'PORTFOLIO'];

  ngOnInit(): void {
    this.missionState.visitSection('payload-bay');
    this.loadGithubData();
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

  protected ejectProject(project: Project, event: Event): void {
    event.stopPropagation();
    this.ejecting.set(project.id);
    setTimeout(() => {
      this.ejecting.set(null);
    }, 600);
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
    // Stub — in production fetch from GitHub API
    this.http
      .get('https://api.github.com/users/Jaco-van-Stryp/repos')
      .pipe(catchError(() => of([])))
      .subscribe();
  }
}
