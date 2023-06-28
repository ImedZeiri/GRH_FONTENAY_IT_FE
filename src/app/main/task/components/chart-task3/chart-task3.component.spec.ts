import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartTask3Component } from './chart-task3.component';

describe('ChartTask3Component', () => {
  let component: ChartTask3Component;
  let fixture: ComponentFixture<ChartTask3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartTask3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartTask3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
