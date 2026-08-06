import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LandingFacade {
  readonly heroTitle = signal('Its me appu');
}
