import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  LucideArrowDown,
  LucideArrowRight,
  LucideCalendarDays,
  LucidePlus,
  LucideTrophy,
} from '@lucide/angular';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'black'
  | 'warning'
  | 'ghost';

export type ButtonType = 'submit' | 'button';
export type ButtonIcon =
  | 'arrow-right'
  | 'arrow-down'
  | 'calendar'
  | 'plus'
  | 'trophy';
export type ButtonSize = 'medium' | 'large';

@Component({
  selector: 'game-scheduler-button',
  imports: [
    NgTemplateOutlet,
    RouterLink,
    LucideArrowDown,
    LucideArrowRight,
    LucideCalendarDays,
    LucidePlus,
    LucideTrophy,
  ],
  templateUrl: './button.html',
  host: { class: 'inline-flex' },
})
export class ButtonComponent {
  readonly label = input.required<string>();
  readonly buttonType = input<ButtonType>('button');
  readonly disabled = input(false);
  readonly variant = input<ButtonVariant>('primary');
  readonly href = input<string | null>(null);
  readonly routerLink = input<string | readonly unknown[] | null>(null);
  readonly icon = input<ButtonIcon | null>(null);
  readonly size = input<ButtonSize>('medium');
  readonly fullWidth = input(false);

  protected readonly buttonClasses = computed(() => {
    const variants: Record<ButtonVariant, string> = {
      primary: 'border-green-400 bg-[#7cff4f] text-black hover:bg-[#6bea3e]',

      secondary:
        'border-white bg-transparent text-white hover:bg-white hover:text-black',

      danger: 'border-red-600 bg-red-600 text-white hover:bg-red-700',

      black: 'border-black bg-black text-white hover:bg-black/80',

      warning: 'border-yellow-400 bg-yellow-400 text-black hover:bg-yellow-500',

      ghost:
        'border-transparent bg-transparent text-gray-600 hover:bg-gray-100 hover:text-black',
    };

    const sizes: Record<ButtonSize, string> = {
      medium: 'px-5 py-2.5',
      large: 'min-h-12 px-6 py-3',
    };

    return [
      'inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-45',
      variants[this.variant()],
      sizes[this.size()],
      this.fullWidth() ? 'w-full' : '',
    ].join(' ');
  });
}
