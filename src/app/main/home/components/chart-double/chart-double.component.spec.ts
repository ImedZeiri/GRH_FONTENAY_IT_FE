import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartDoubleComponent } from './chart-double.component';

describe('ChartDoubleComponent', () => {
  let component: ChartDoubleComponent;
  let fixture: ComponentFixture<ChartDoubleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartDoubleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartDoubleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
