import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartTask1Component } from './chart-task1.component';

describe('ChartTask1Component', () => {
  let component: ChartTask1Component;
  let fixture: ComponentFixture<ChartTask1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartTask1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartTask1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
