import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutCPComponent } from './layout-cp.component';

describe('LayoutCPComponent', () => {
  let component: LayoutCPComponent;
  let fixture: ComponentFixture<LayoutCPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutCPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutCPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
