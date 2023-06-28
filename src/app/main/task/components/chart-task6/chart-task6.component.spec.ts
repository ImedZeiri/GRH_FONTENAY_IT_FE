import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartTask6Component } from './chart-task6.component';

describe('ChartTask6Component', () => {
  let component: ChartTask6Component;
  let fixture: ComponentFixture<ChartTask6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartTask6Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartTask6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
