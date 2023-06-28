import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartTask2Component } from './chart-task2.component';

describe('ChartTask2Component', () => {
  let component: ChartTask2Component;
  let fixture: ComponentFixture<ChartTask2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartTask2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartTask2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
