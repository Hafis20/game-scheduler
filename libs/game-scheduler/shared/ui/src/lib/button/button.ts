import { Component, input } from '@angular/core';
@Component({
  selector: 'game-scheduler-button',
  templateUrl: './button.html',
  host: { class: 'block' },
})
export class ButtonComponent {
  readonly label = input.required<string>();
}
