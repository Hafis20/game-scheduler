import {
  Component,
  computed,
  ElementRef,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';

export interface DropdownOption {
  label: string;
  value: string;
  disabled?: boolean;
}

@Component({
  selector: 'game-scheduler-dropdown',
  templateUrl: './dropdown.html',
  host: {
    '(document:click)': 'onDocumentClick($event)',
  },
})
export class Dropdown implements FormValueControl<string> {
  private readonly hostElement = inject(ElementRef<HTMLElement>);

  readonly id = input.required<string>();
  readonly label = input<string>();
  readonly placeholder = input('Select an option');
  readonly options = input<readonly DropdownOption[]>([]);
  readonly disabled = input(false);
  readonly required = input(false);
  readonly invalid = input(false);
  readonly value = model.required<string>();
  readonly touch = output<void>();

  protected readonly isOpen = signal(false);
  protected readonly selectedOption = computed(() =>
    this.options().find((option) => option.value === this.value())
  );
  protected readonly listboxId = computed(() => `${this.id()}-options`);

  protected toggleDropdown(): void {
    if (!this.disabled()) {
      this.isOpen.update((open) => !open);
    }
  }

  protected selectOption(option: DropdownOption): void {
    if (option.disabled) {
      return;
    }

    this.value.set(option.value);
    this.isOpen.set(false);
  }

  protected onTriggerKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.isOpen.set(false);
      return;
    }

    if (event.key === 'ArrowDown' && !this.disabled()) {
      event.preventDefault();
      this.isOpen.set(true);
    }
  }

  protected optionClasses(option: DropdownOption): string {
    const stateClasses =
      option.value === this.value()
        ? 'bg-[#eaffdf] text-gray-950'
        : 'bg-white text-gray-700 hover:bg-gray-100';
    const disabledClasses = option.disabled
      ? 'cursor-not-allowed opacity-45'
      : 'cursor-pointer';

    return `flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left text-sm font-semibold transition ${stateClasses} ${disabledClasses}`;
  }

  protected onDocumentClick(event: MouseEvent): void {
    if (!this.hostElement.nativeElement.contains(event.target as Node)) {
      this.isOpen.set(false);
    }
  }
}
