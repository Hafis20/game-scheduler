import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { AuthActions } from '@game-scheduler/auth/data-access';
import { Store } from '@ngrx/store';
import { LoginComponent } from './login';

describe('LoginComponent', () => {
  const dispatch = vi.fn();
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    dispatch.mockReset();
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: Store, useValue: { dispatch } },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParamMap: convertToParamMap({
                returnUrl: '/join/7KQ9MX2PDA',
              }),
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should preserve the invite URL during Google sign in', () => {
    component.signIn();

    expect(dispatch).toHaveBeenCalledWith(
      AuthActions.signInWithGoogle({ returnUrl: '/join/7KQ9MX2PDA' })
    );
  });
});
