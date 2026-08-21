import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoomOverview } from './room-overview';

describe('RoomOverview', () => {
  let component: RoomOverview;
  let fixture: ComponentFixture<RoomOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomOverview],
    }).compileComponents();

    fixture = TestBed.createComponent(RoomOverview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
