import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartTask5Component } from './chart-task5.component';

describe('ChartTask5Component', () => {
  let component: ChartTask5Component;
  let fixture: ComponentFixture<ChartTask5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartTask5Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartTask5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
