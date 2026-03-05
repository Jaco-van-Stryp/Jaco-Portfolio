import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  computed,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MissionStateService } from '../../shared/services/mission-state.service';

interface LogEntry {
  date: string;
  title: string;
  org: string;
  orgColor: string;
  description: string;
  tags: string[];
  icon: string;
}

interface Gauge {
  label: string;
  value: number;
  max: number;
  unit: string;
  color: string;
}

@Component({
  selector: 'app-mission-control',
  imports: [RouterLink],
  templateUrl: './mission-control.component.html',
  styleUrl: './mission-control.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MissionControlComponent implements OnInit {
  private readonly missionState = inject(MissionStateService);

  protected readonly activeLogId = signal<string | null>(null);
  protected readonly animatedValues = signal<Record<string, number>>({});

  protected readonly gauges: Gauge[] = [
    { label: 'EXPERIENCE', value: 5, max: 10, unit: 'YRS', color: '#00d4ff' },
    { label: 'GPA', value: 4.0, max: 4.0, unit: '/4.0', color: '#10b981' },
    { label: 'INSTITUTIONS', value: 30, max: 50, unit: '+', color: '#8b5cf6' },
    { label: 'COUNTRIES', value: 10, max: 15, unit: '', color: '#fbbf24' },
  ];

  protected readonly captainsLog: LogEntry[] = [
    {
      date: 'JAN 2025 — PRESENT',
      title: 'Software Engineer II',
      org: 'Rocket Lab',
      orgColor: '#dc2626',
      icon: '🚀',
      description:
        'Building manufacturing execution systems used by production teams to assemble Electron and Neutron rockets. Working on operation management, routing systems, and UI components that streamline manufacturing workflows.',
      tags: ['Angular', 'C#/.NET', 'PostgreSQL', 'Docker', 'Kubernetes', 'AWS'],
    },
    {
      date: 'AUG 2022 — JAN 2025',
      title: 'Software Developer | Technical Team Lead',
      org: 'Sybrin',
      orgColor: '#3b82f6',
      icon: '🏦',
      description:
        'Led a team optimizing production software for banking systems across multiple African countries. Built Vitals — an automated recovery solution maintaining near-100% uptime for 30+ banking institutions across 10 countries. Mentored developers on code quality and best practices.',
      tags: ['C#', 'Angular', 'React', 'SQL Server', 'Azure', 'Team Leadership'],
    },
    {
      date: 'AUG 2021 — AUG 2022',
      title: 'Associate Full Stack Developer',
      org: 'Sybrin',
      orgColor: '#3b82f6',
      icon: '💻',
      description:
        'Identified and automated repetitive operational tasks, building tools that streamlined workflows and reduced manual intervention. Focused on making systems more reliable and easier to maintain.',
      tags: ['C#', 'ASP.NET', 'Angular', 'SQL Server'],
    },
    {
      date: 'JAN 2021 — AUG 2021',
      title: 'Graduate Software Developer',
      org: 'Sybrin',
      orgColor: '#3b82f6',
      icon: '🌱',
      description:
        'Developed and maintained banking software deployed across 10 African countries. Gained deep experience in application support and user-focused solution design.',
      tags: ['C#', 'ASP.NET', 'Angular', 'SQL Server', 'Azure'],
    },
    {
      date: 'MAR 2019 — MAR 2022',
      title: 'Full Stack Web Developer',
      org: 'Jaxify Software',
      orgColor: '#10b981',
      icon: '⚡',
      description:
        'Founded and operated a software development consultancy, working directly with clients on web applications. Handled full project lifecycle from requirements gathering through deployment while managing client relationships.',
      tags: ['C#', 'ASP.NET', 'Angular', 'React', 'SQL', 'Azure'],
    },
    {
      date: 'JAN 2019 — DEC 2021',
      title: 'Diploma in Information Technology',
      org: 'Belgium Campus',
      orgColor: '#f59e0b',
      icon: '🎓',
      description:
        'Graduated Summa Cum Laude (GPA: 4.0/4.0) with 86.4% final mark. Awarded Top #1 Student in IT & Computer Application Technology. Named Ambassador of the Year.',
      tags: ['NQF Level 6', 'Summa Cum Laude', '4.0 GPA', 'Ambassador of the Year'],
    },
  ];

  protected readonly honours = [
    { icon: '🥇', title: 'Top #1 Student', sub: 'Information Technology & CAT' },
    { icon: '🏆', title: 'Summa Cum Laude', sub: 'GPA 4.0/4.0 — 86.4%' },
    { icon: '🌟', title: 'Ambassador of the Year', sub: 'Belgium Campus' },
  ];

  readonly earnedBadges = this.missionState.earnedBadges;

  ngOnInit(): void {
    this.missionState.visitSection('mission-control');
  }

  protected getGaugePercent(gauge: Gauge): number {
    return (gauge.value / gauge.max) * 100;
  }

  protected getArcPath(percent: number): string {
    const r = 38;
    const cx = 50;
    const cy = 50;
    const startAngle = -210;
    const endAngle = startAngle + (240 * percent) / 100;
    const toRad = (d: number) => (d * Math.PI) / 180;
    const x1 = cx + r * Math.cos(toRad(startAngle));
    const y1 = cy + r * Math.sin(toRad(startAngle));
    const x2 = cx + r * Math.cos(toRad(endAngle));
    const y2 = cy + r * Math.sin(toRad(endAngle));
    const large = endAngle - startAngle > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
  }

  protected toggleLog(id: string): void {
    this.activeLogId.update((current) => (current === id ? null : id));
  }

  protected isLogActive(id: string): boolean {
    return this.activeLogId() === id;
  }
}
