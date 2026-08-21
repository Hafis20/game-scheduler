import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Dropdown } from './dropdown';

describe('Dropdown', () => {
  let component: Dropdown;
  let fixture: ComponentFixture<Dropdown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dropdown],
    }).compileComponents();

    fixture = TestBed.createComponent(Dropdown);
    fixture.componentRef.setInput('id', 'game-select');
    fixture.componentRef.setInput('value', '');
    fixture.componentRef.setInput('options', [
      { label: 'Football', value: 'football' },
      { label: 'Chess', value: 'chess' },
    ]);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update its value when an option is selected', () => {
    const valueChange = vi.fn();
    component.valueChange.subscribe((value) => {
      valueChange(value);
      fixture.componentRef.setInput('value', value);
    });

    const trigger = fixture.nativeElement.querySelector(
      '[role="combobox"]'
    ) as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();

    const chessOption = Array.from<HTMLButtonElement>(
      fixture.nativeElement.querySelectorAll('[role="option"]')
    ).find((option) => option.textContent?.includes('Chess'));
    chessOption?.click();
    fixture.detectChanges();

    expect(valueChange).toHaveBeenCalledWith('chess');
    expect(trigger.textContent).toContain('Chess');
    expect(fixture.nativeElement.querySelector('[role="listbox"]')).toBeNull();
  });
});
