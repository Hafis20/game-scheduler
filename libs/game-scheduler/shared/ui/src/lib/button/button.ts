import { Component, computed, input } from '@angular/core';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'black'
  | 'warning';

export type ButtonType = 'submit' | 'button';
@Component({
  selector: 'game-scheduler-button',
  templateUrl: './button.html',
})
export class ButtonComponent {
  readonly label = input.required<string>();
  readonly buttonType = input<ButtonType>('button');
  readonly disabled = input(false);

  readonly variant = input<ButtonVariant>('primary');

  protected readonly variantClasses = computed(() => {
    const variants: Record<ButtonVariant, string> = {
      primary: 'bg-[#7cff4f] text-black hover:bg-[#6bea3e]',

      secondary:
        'bg-transparent text-white border border-white hover:bg-white hover:text-black',

      danger: 'bg-red-600 text-white hover:bg-red-700',

      black: 'bg-black text-white hover:bg-black/80',

      warning: 'bg-yellow-400 text-black hover:bg-yellow-500',
    };

    return variants[this.variant()];
  });
}
