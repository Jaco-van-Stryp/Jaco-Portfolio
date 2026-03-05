import {
  Component,
  ChangeDetectionStrategy,
  PLATFORM_ID,
  inject,
  signal,
  OnInit,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  delay: number;
  duration: number;
}

@Component({
  selector: 'app-star-field',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="star-field" aria-hidden="true">
      @for (star of stars(); track star.id) {
        <div
          class="star"
          [style.left.%]="star.x"
          [style.top.%]="star.y"
          [style.width.px]="star.size"
          [style.height.px]="star.size"
          [style.opacity]="star.opacity"
          [style.animation-delay.s]="star.delay"
          [style.animation-duration.s]="star.duration"
        ></div>
      }
      <div class="nebula nebula-1"></div>
      <div class="nebula nebula-2"></div>
      <div class="nebula nebula-3"></div>
    </div>
  `,
  styles: [
    `
      .star-field {
        position: fixed;
        inset: 0;
        pointer-events: none;
        z-index: 0;
        overflow: hidden;
      }
      .star {
        position: absolute;
        border-radius: 50%;
        background: white;
        animation: twinkle var(--duration, 3s) ease-in-out infinite;
      }
      .nebula {
        position: absolute;
        border-radius: 50%;
        filter: blur(80px);
        pointer-events: none;
      }
      .nebula-1 {
        width: 700px;
        height: 500px;
        top: -150px;
        left: -100px;
        background: radial-gradient(ellipse, rgba(0, 80, 180, 0.18) 0%, transparent 70%);
      }
      .nebula-2 {
        width: 900px;
        height: 700px;
        top: 25%;
        right: -250px;
        background: radial-gradient(ellipse, rgba(100, 30, 180, 0.14) 0%, transparent 70%);
      }
      .nebula-3 {
        width: 600px;
        height: 600px;
        bottom: -150px;
        left: 25%;
        background: radial-gradient(ellipse, rgba(0, 160, 180, 0.1) 0%, transparent 70%);
      }
    `,
  ],
})
export class StarFieldComponent implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);
  readonly stars = signal<Star[]>([]);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.generateStars();
    }
  }

  private generateStars(): void {
    const stars = Array.from({ length: 220 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.4,
      opacity: Math.random() * 0.65 + 0.25,
      delay: Math.random() * 7,
      duration: Math.random() * 4 + 2,
    }));
    this.stars.set(stars);
  }
}
