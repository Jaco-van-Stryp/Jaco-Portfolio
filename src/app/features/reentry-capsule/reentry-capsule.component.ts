import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { MissionStateService } from '../../shared/services/mission-state.service';
import { SeoService } from '../../shared/services/seo.service';

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
}

const CONFETTI_COLORS = ['#00d4ff', '#ff6b35', '#8b5cf6', '#10b981', '#fbbf24', '#f472b6'];

@Component({
  selector: 'app-reentry-capsule',
  imports: [RouterLink],
  templateUrl: './reentry-capsule.component.html',
  styleUrl: './reentry-capsule.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReentryCapsuleComponent implements OnInit {
  private readonly missionState = inject(MissionStateService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly seoService = inject(SeoService);

  protected readonly confetti = signal<ConfettiPiece[]>([]);
  protected readonly copied = signal(false);

  protected readonly channels = [
    {
      label: 'LINKEDIN',
      handle: 'jacovanstryp',
      icon: 'in',
      url: 'https://www.linkedin.com/in/jacovanstryp',
      color: '#0077b5',
      cta: 'Connect',
      description: 'Professional profile & career history',
    },
    {
      label: 'GITHUB',
      handle: 'Jaco-van-Stryp',
      icon: '⌥',
      url: 'https://github.com/Jaco-van-Stryp/',
      color: '#f0f6fc',
      cta: 'View Code',
      description: 'Open source projects & contributions',
    },
    {
      label: 'EMAIL',
      handle: 'jacovanstryp@gmail.com',
      icon: '✉',
      url: 'mailto:jacovanstryp@gmail.com',
      color: '#ea4335',
      cta: 'Send Email',
      description: 'Direct line — usually reply same day',
    },
  ];

  protected readonly missionParams = [
    { icon: '🚀', text: 'Currently at Rocket Lab, Auckland' },
    { icon: '⏰', text: 'Response time: usually same day' },
    { icon: '🌐', text: 'Open to remote & on-site roles' },
    { icon: '🛡️', text: 'Open to NZ opportunities' },
  ];

  ngOnInit(): void {
    this.missionState.visitSection('reentry');
    this.seoService.setPageMeta({
      title: 'Re-Entry Capsule | Jaco van Stryp',
      description:
        'Contact Jaco van Stryp — get in touch via LinkedIn, GitHub, or email for opportunities, collaborations, or to say hi.',
      url: 'https://jacovanstryp.com/reentry',
    });
  }

  protected copyEmail(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    navigator.clipboard.writeText('jacovanstryp@gmail.com').then(() => {
      this.copied.set(true);
      this.launchConfetti();
      setTimeout(() => this.copied.set(false), 2500);
    });
  }

  private launchConfetti(): void {
    const pieces = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      delay: Math.random() * 1.5,
      duration: Math.random() * 2 + 2,
      size: Math.random() * 10 + 6,
      rotation: Math.random() * 360,
    }));
    this.confetti.set(pieces);
    setTimeout(() => this.confetti.set([]), 6000);
  }
}
