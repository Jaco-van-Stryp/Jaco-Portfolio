import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { MissionStateService } from '../../shared/services/mission-state.service';
import { SeoService } from '../../shared/services/seo.service';
import { PROJECTS } from '../payload-bay/payload-bay.component';

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
  display?: string;
}

@Component({
  selector: 'app-mission-control',
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './mission-control.component.html',
  styleUrl: './mission-control.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MissionControlComponent implements OnInit {
  private readonly missionState = inject(MissionStateService);
  private readonly seoService = inject(SeoService);

  protected readonly activeLogId = signal<string | null>(null);
  protected readonly photoLightbox = signal(false);
  protected readonly animatedValues = signal<Record<string, number>>({});

  private readonly yearsExperience = new Date().getFullYear() - 2019;

  protected readonly gauges: Gauge[] = [
    {
      label: 'EXPERIENCE',
      value: this.yearsExperience,
      max: this.yearsExperience,
      unit: 'YRS',
      color: '#00d4ff',
      display: `${this.yearsExperience}+`,
    },
    {
      label: 'MAJOR PROJECTS',
      value: PROJECTS.length,
      max: PROJECTS.length,
      unit: 'TOTAL',
      color: '#dc2626',
      display: `${PROJECTS.length}`,
    },
    {
      label: 'GLOBAL REACH',
      value: 15,
      max: 15,
      unit: 'COUNTRIES',
      color: '#8b5cf6',
      display: '15+',
    },
    { label: 'TOP GRADUATE', value: 1, max: 1, unit: 'GRADE', color: '#fbbf24', display: 'A+' },
  ];

  protected readonly captainsLog: LogEntry[] = [
    {
      date: 'JAN 2025 - PRESENT',
      title: 'Software Engineer II',
      org: 'Rocket Lab',
      orgColor: '#dc2626',
      icon: '🚀',
      description:
        'I build the software that builds Rocket Lab rockets. Working on the manufacturing execution system for Electron and Neutron that production teams depend on daily. Involved in architecture decisions, code reviews, sprint planning, and hiring. Built an AI tool that turns meeting recordings into recommended Jira tickets.',
      tags: ['Angular', 'C#/.NET', 'PostgreSQL', 'SQL Server', 'Docker', 'Kubernetes', 'AWS'],
    },
    {
      date: 'AUG 2022 - JAN 2025',
      title: 'Software Developer | Technical Team Lead',
      org: 'Sybrin',
      orgColor: '#3b82f6',
      icon: '🏦',
      description:
        'I kept 30+ large banks running across Africa - automatically. Built Vitals: an automated recovery system maintaining near-100% uptime for banking operations across 30+ institutions in 14 countries. Led and mentored the development team. Won Best Innovator and Best Team Leader in 2023.',
      tags: ['C#/.NET', 'Angular', 'React', 'SQL Server', 'Azure', 'Team Leadership'],
    },
    {
      date: 'AUG 2021 - AUG 2022',
      title: 'Associate Full Stack Developer',
      org: 'Sybrin',
      orgColor: '#3b82f6',
      icon: '💻',
      description:
        'Identified and automated repetitive operational tasks, building tools that streamlined workflows and reduced manual intervention. Focused on making systems more reliable and easier to maintain.',
      tags: ['C#/.NET', 'Angular', 'SQL Server'],
    },
    {
      date: 'JAN 2021 - AUG 2021',
      title: 'Graduate Software Developer',
      org: 'Sybrin',
      orgColor: '#3b82f6',
      icon: '🌱',
      description:
        'Developed and maintained banking software deployed across 14 African countries. Gained deep experience in application support and user-focused solution design.',
      tags: ['C#/.NET', 'Angular', 'SQL Server', 'Azure'],
    },
    {
      date: 'MAR 2019 - MAR 2022',
      title: 'Full Stack Web Developer',
      org: 'Jaxify Software',
      orgColor: '#10b981',
      icon: '⚡',
      description:
        'I founded a software consultancy and built solutions for clients from scratch. Managed a team through full project lifecycles: requirements, design, development, hosting, and client communication.',
      tags: ['C#/.NET', 'Angular', 'React', 'PostgreSQL', 'Azure'],
    },
    {
      date: 'JAN 2019 - DEC 2021',
      title: 'Diploma in Information Technology',
      org: 'Belgium Campus',
      orgColor: '#f59e0b',
      icon: '🎓',
      description:
        'Graduated Summa Cum Laude with an 86.4% final mark - awarded Top #1 Student in IT & Computer Application Technology.',
      tags: ['NQF Level 6', 'A+ / Summa Cum Laude', '86.4%'],
    },
    {
      date: 'JAN 2014 - DEC 2018',
      title: 'National Senior Certificate',
      org: 'Eduplex High School',
      orgColor: '#6b7280',
      icon: '📚',
      description:
        "Built the school's electronic Smart Voting System independently in grade 10 - replacing weeks of paper ballot counting with instant automated results, used school-wide for years. Graduated with a National Senior Certificate and was awarded Ambassador of the Year.",
      tags: ['National Senior Certificate', 'Ambassador of the Year', 'Java', 'SQL Server'],
    },
  ];

  protected readonly honours = [
    { icon: '🥇', title: 'Top #1 University Student', sub: 'Belgium Campus' },
    { icon: '🏆', title: 'Summa Cum Laude', sub: 'Belgium Campus · 86.4% Final Mark' },
    { icon: '🌟', title: 'Ambassador of the Year', sub: 'Eduplex High School' },
  ];

  protected readonly pilotData = [
    { icon: '🇳🇿', label: 'BASED', value: 'Auckland, New Zealand' },
    { icon: '🌐', label: 'LANGUAGES', value: 'English · Afrikaans' },
    { icon: '🕐', label: 'TIMEZONE', value: 'NZST · UTC+12/13' },
    { icon: '🚀', label: 'PASSION', value: 'Aerospace & Software' },
    { icon: '💡', label: 'INTERESTS', value: 'Rocketry · Sci-Fi · Building' },
  ];

  ngOnInit(): void {
    this.missionState.visitSection('about');
    this.seoService.setPageMeta({
      title: 'About | Jaco van Stryp',
      description:
        'About Jaco van Stryp — background, career timeline, and personal mission as a software engineer at Rocket Lab.',
      url: 'https://jacovanstryp.com/about',
    });
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
