import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Input } from '@game-scheduler/shared/ui';

@Component({
  selector: 'lib-tournament-join',
  imports: [Input],
  templateUrl: './tournament-join.html',
})
export class TournamentJoinComponent {
  private readonly route = inject(ActivatedRoute);

  protected readonly token = signal('');

  constructor() {
    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe((parameters) => {
      this.token.set(parameters.get('token') ?? '');
    });
  }
}
