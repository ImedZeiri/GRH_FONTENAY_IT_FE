import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartTask4Component } from './chart-task4.component';

describe('ChartTask4Component', () => {
  let component: ChartTask4Component;
  let fixture: ComponentFixture<ChartTask4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartTask4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartTask4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
