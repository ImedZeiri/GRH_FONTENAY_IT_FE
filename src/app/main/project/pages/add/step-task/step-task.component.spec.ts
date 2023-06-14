import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepTaskComponent } from './step-task.component';

describe('StepTaskComponent', () => {
  let component: StepTaskComponent;
  let fixture: ComponentFixture<StepTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
