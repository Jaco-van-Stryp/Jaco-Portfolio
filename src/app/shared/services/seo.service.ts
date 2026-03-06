import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

interface PageMeta {
  title: string;
  description: string;
  url: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);

  setPageMeta({ title, description, url }: PageMeta): void {
    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: url });
  }
}
