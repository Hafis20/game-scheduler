import { Component, input, model } from '@angular/core';

@Component({
  selector: 'game-scheduler-input',
  imports: [],
  templateUrl: './input.html',
})
export class Input {
  label = input<string>();
  readonly id = input.required<string>();
  value = model('');
}
