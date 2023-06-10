import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepProjectComponent } from './step-project.component';

describe('StepProjectComponent', () => {
  let component: StepProjectComponent;
  let fixture: ComponentFixture<StepProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
