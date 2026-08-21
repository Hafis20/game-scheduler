import { Component, input, output } from '@angular/core';

export type InputType = 'text' | 'number' | 'date';

@Component({
  selector: 'game-scheduler-input',
  imports: [],
  templateUrl: './input.html',
})
export class Input {
  readonly id = input.required<string>();
  readonly label = input<string>();
  readonly type = input<InputType>('text');
  readonly placeholder = input('');
  readonly min = input<string>();
  readonly max = input<string>();
  readonly disabled = input(false);
  readonly required = input(false);
  readonly value = input('');
  readonly valueChange = output<string>();

  protected onValueChange(event: Event): void {
    this.valueChange.emit((event.target as HTMLInputElement).value);
  }
}
