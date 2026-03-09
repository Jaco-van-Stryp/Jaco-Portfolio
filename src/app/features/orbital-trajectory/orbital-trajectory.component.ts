import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MissionStateService } from '../../shared/services/mission-state.service';
import { SeoService } from '../../shared/services/seo.service';

interface TrajectoryNode {
  id: string;
  year: string;
  period: string;
  title: string;
  company: string;
  companyColor: string;
  location: string;
  type: 'fulltime' | 'founded' | 'education';
  highlights: string[];
  tech: string[];
  x: number;
  y: number;
  icon: string;
}

@Component({
  selector: 'app-orbital-trajectory',
  imports: [RouterLink],
  templateUrl: './orbital-trajectory.component.html',
  styleUrl: './orbital-trajectory.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrbitalTrajectoryComponent implements OnInit {
  private readonly missionState = inject(MissionStateService);
  private readonly seoService = inject(SeoService);

  protected readonly activeNode = signal<string | null>(null);

  protected readonly nodes: TrajectoryNode[] = [
    {
      id: 'eduplex',
      year: '2018',
      period: '2014 - 2018',
      title: 'National Senior Certificate',
      company: 'Eduplex High School',
      companyColor: '#6b7280',
      location: 'Pretoria, South Africa',
      type: 'education',
      icon: '📚',
      highlights: [
        "Built the school's electronic voting system independently in grade 10",
        'Replaced weeks of paper ballot counting with instant automated results - used school-wide for years',
        'Awarded Ambassador of the Year',
        'Completed National Senior Certificate',
      ],
      tech: ['Java', 'SQL Server', 'Microsoft Office'],
      x: 60,
      y: 280,
    },
    {
      id: 'belgium',
      year: '2019',
      period: 'JAN 2019 - DEC 2021',
      title: 'Diploma in Information Technology',
      company: 'Belgium Campus',
      companyColor: '#f59e0b',
      location: 'Pretoria, South Africa',
      type: 'education',
      icon: '🎓',
      highlights: [
        'Graduated A+ (Summa Cum Laude, GPA: 4.0/4.0, 86.4%)',
        'Top #1 Student in IT & Computer Application Technology',
        'Ambassador of the Year',
        'NQF Level 6 qualification',
      ],
      tech: ['C#', 'Java', 'SQL', 'JavaScript'],
      x: 160,
      y: 220,
    },
    {
      id: 'jaxify',
      year: '2019',
      period: 'MAR 2019 - MAR 2022',
      title: 'Full Stack Web Developer',
      company: 'Jaxify Software',
      companyColor: '#10b981',
      location: 'Pretoria, South Africa',
      type: 'founded',
      icon: '⚡',
      highlights: [
        'Founded a software consultancy and built solutions from scratch',
        'Built end-to-end web applications for multiple clients',
        'Managed a team through full project lifecycles',
        'Requirements, design, development, hosting, and client communication',
      ],
      tech: ['C#/.NET', 'Angular', 'React', 'PostgreSQL', 'Azure'],
      x: 280,
      y: 160,
    },
    {
      id: 'sybrin-grad',
      year: '2021',
      period: 'JAN 2021 - AUG 2021',
      title: 'Graduate Software Developer',
      company: 'Sybrin',
      companyColor: '#3b82f6',
      location: 'Johannesburg, South Africa',
      type: 'fulltime',
      icon: '🌱',
      highlights: [
        'Developed banking software deployed across 14 African countries',
        'Gained deep experience in application support',
        'Focused on user-driven solution design',
      ],
      tech: ['C#/.NET', 'Angular', 'SQL Server', 'Azure'],
      x: 380,
      y: 120,
    },
    {
      id: 'sybrin-assoc',
      year: '2022',
      period: 'AUG 2021 - AUG 2022',
      title: 'Associate Full Stack Developer',
      company: 'Sybrin',
      companyColor: '#3b82f6',
      location: 'Johannesburg, South Africa',
      type: 'fulltime',
      icon: '💡',
      highlights: [
        'Automated repetitive operational tasks at scale',
        'Built workflow streamlining tools used by thousands daily',
        'Improved system reliability and maintainability',
      ],
      tech: ['C#/.NET', 'Angular', 'React', 'SQL Server'],
      x: 490,
      y: 100,
    },
    {
      id: 'sybrin-lead',
      year: '2023',
      period: 'AUG 2022 - JAN 2025',
      title: 'Software Developer | Technical Team Lead',
      company: 'Sybrin',
      companyColor: '#3b82f6',
      location: 'Johannesburg, South Africa',
      type: 'fulltime',
      icon: '🏦',
      highlights: [
        'Built Vitals - kept 30+ banks running across Africa, automatically',
        'Near-100% uptime across 14 African countries',
        'Led and mentored a development team',
        'Resolved systemic issues in legacy software',
        'Developed automation tools used by thousands daily',
      ],
      tech: ['C#/.NET', 'Angular', 'React', 'SQL Server', 'Azure', 'Team Leadership'],
      x: 620,
      y: 120,
    },
    {
      id: 'rocketlab',
      year: '2025',
      period: 'JAN 2025 - PRESENT',
      title: 'Software Engineer II',
      company: 'Rocket Lab',
      companyColor: '#dc2626',
      location: 'Auckland, New Zealand',
      type: 'fulltime',
      icon: '🚀',
      highlights: [
        'Building MES for Electron and Neutron rocket programs',
        'Production teams depend on this software daily',
        'Architecture decisions, code reviews, user stories, and sprint planning',
        'Built an AI tool that turns meeting recordings into recommended Jira tickets',
        'Involved in hiring and technical interviews for new software engineers',
        'Relocated from South Africa to New Zealand',
      ],
      tech: ['Angular', 'C#/.NET', 'PostgreSQL', 'SQL Server', 'Docker', 'Kubernetes', 'AWS'],
      x: 760,
      y: 160,
    },
  ];

  ngOnInit(): void {
    this.missionState.visitSection('experience');
    this.seoService.setPageMeta({
      title: 'Experience | Jaco van Stryp',
      description:
        'Career experience of Jaco van Stryp: Rocket Lab, Sybrin, and Jaxify, with a focus on Angular, C#/.NET, and manufacturing systems.',
      url: 'https://jacovanstryp.com/experience',
    });
  }

  protected selectNode(id: string): void {
    this.activeNode.update((current) => (current === id ? null : id));
  }

  protected getActiveNode(): TrajectoryNode | null {
    const id = this.activeNode();
    return id ? (this.nodes.find((n) => n.id === id) ?? null) : null;
  }

  protected buildPathD(): string {
    if (this.nodes.length === 0) return '';
    const [first, ...rest] = this.nodes;
    let d = `M ${first.x} ${first.y}`;
    for (let i = 0; i < rest.length; i++) {
      const prev = this.nodes[i];
      const curr = rest[i];
      const cx = (prev.x + curr.x) / 2;
      d += ` C ${cx} ${prev.y}, ${cx} ${curr.y}, ${curr.x} ${curr.y}`;
    }
    return d;
  }
}
