import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepHireComponent } from './step-hire.component';

describe('StepHireComponent', () => {
  let component: StepHireComponent;
  let fixture: ComponentFixture<StepHireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepHireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepHireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
