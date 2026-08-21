import { Component, computed, input, output } from '@angular/core';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

@Component({
  selector: 'game-scheduler-modal',
  standalone: true,
  templateUrl: './modal.html',
})
export class ModalComponent {
  readonly open = input.required<boolean>();
  readonly size = input<ModalSize>('md');
  readonly closeOnBackdropClick = input(true);
  readonly closed = output<void>();

  protected readonly sizeClasses = computed(() => {
    const sizes: Record<ModalSize, string> = {
      sm: 'w-full max-w-sm',
      md: 'w-full max-w-md',
      lg: 'w-full max-w-2xl',
      xl: 'w-full max-w-4xl',
      full: 'h-full w-full max-w-none rounded-none',
    };

    return sizes[this.size()];
  });

  close(): void {
    this.closed.emit();
  }

  onBackdropClick(): void {
    if (this.closeOnBackdropClick()) {
      this.close();
    }
  }
}
