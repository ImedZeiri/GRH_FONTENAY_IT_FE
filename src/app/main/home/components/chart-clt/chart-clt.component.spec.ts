import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartCLTComponent } from './chart-clt.component';

describe('ChartCLTComponent', () => {
  let component: ChartCLTComponent;
  let fixture: ComponentFixture<ChartCLTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartCLTComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartCLTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
