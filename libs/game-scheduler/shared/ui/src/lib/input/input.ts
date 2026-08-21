import { Component, input, model, output } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';

export type InputType = 'text' | 'number' | 'date';

@Component({
  selector: 'game-scheduler-input',
  imports: [],
  templateUrl: './input.html',
})
export class Input implements FormValueControl<string> {
  readonly id = input.required<string>();
  readonly label = input<string>();
  readonly type = input<InputType>('text');
  readonly placeholder = input('');
  readonly min = input<string>();
  readonly max = input<string>();
  readonly disabled = input(false);
  readonly required = input(false);
  readonly invalid = input(false);
  readonly value = model.required<string>();
  readonly touch = output<void>();

  protected onValueChange(event: Event): void {
    this.value.set((event.target as HTMLInputElement).value);
  }
}
