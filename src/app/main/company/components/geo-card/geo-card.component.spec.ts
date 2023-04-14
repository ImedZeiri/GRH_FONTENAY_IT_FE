import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoCardComponent } from './geo-card.component';

describe('GeoCardComponent', () => {
  let component: GeoCardComponent;
  let fixture: ComponentFixture<GeoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeoCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
