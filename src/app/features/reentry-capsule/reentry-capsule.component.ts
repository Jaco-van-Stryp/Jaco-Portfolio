import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { MissionStateService } from '../../shared/services/mission-state.service';

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
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './reentry-capsule.component.html',
  styleUrl: './reentry-capsule.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReentryCapsuleComponent implements OnInit {
  private readonly missionState = inject(MissionStateService);
  private readonly platformId = inject(PLATFORM_ID);

  protected readonly submitted = signal(false);
  protected readonly submitting = signal(false);
  protected readonly confetti = signal<ConfettiPiece[]>([]);
  protected readonly splashdown = signal(false);

  protected readonly contactForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    subject: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required, Validators.minLength(10)]),
  });

  protected readonly socialLinks = [
    {
      label: 'LinkedIn',
      handle: 'jacovanstryp',
      icon: 'in',
      url: 'https://www.linkedin.com/in/jacovanstryp',
      color: '#0077b5',
    },
    {
      label: 'GitHub',
      handle: 'Jaco-van-Stryp',
      icon: '⌥',
      url: 'https://github.com/Jaco-van-Stryp/',
      color: '#f0f6fc',
    },
    {
      label: 'X / Twitter',
      handle: '@jvanstryp',
      icon: '𝕏',
      url: 'https://x.com/jvanstryp',
      color: '#e7e7e7',
    },
    {
      label: 'Email',
      handle: 'jacovanstryp@gmail.com',
      icon: '✉',
      url: 'mailto:jacovanstryp@gmail.com',
      color: '#ea4335',
    },
  ];

  ngOnInit(): void {
    this.missionState.visitSection('reentry');
  }

  protected getControl(name: string): FormControl {
    return this.contactForm.get(name) as FormControl;
  }

  protected isInvalid(name: string): boolean {
    const control = this.getControl(name);
    return control.invalid && control.touched;
  }

  protected getError(name: string): string {
    const control = this.getControl(name);
    if (control.hasError('required')) return 'This field is required';
    if (control.hasError('email')) return 'Please enter a valid email address';
    if (control.hasError('minlength')) {
      const min = control.errors?.['minlength']?.requiredLength;
      return `Minimum ${min} characters required`;
    }
    return '';
  }

  protected submitForm(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.submitting.set(true);

    // Simulate async submission (integrate EmailJS here in production)
    setTimeout(() => {
      this.submitting.set(false);
      this.submitted.set(true);
      this.splashdown.set(true);
      this.launchConfetti();
      this.missionState.visitSection('reentry-complete');
    }, 1500);
  }

  protected resetForm(): void {
    this.submitted.set(false);
    this.splashdown.set(false);
    this.confetti.set([]);
    this.contactForm.reset();
  }

  private launchConfetti(): void {
    if (!isPlatformBrowser(this.platformId)) return;
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
